import { MillCredential } from "./client";
import fetch from "node-fetch";
import { type Agent } from "https";

interface Token {
  idToken: string;
  refreshToken: string;
  expireTime: number;
  refreshExpireTime: number;
}

interface TokenPayload {
  sub: string;
  type: 'id',
  iat: number;
  exp: number;
}

type AuthenticatorStatus =
  | {
      type: "initial";
    }
  | {
      type: "authenticating";
      result: Promise<Token>;
    }
  | {
      type: "authenticated";
      accessToken: Token;
    }
  | {
      type: "failed";
      error: unknown;
    };

export class Authenticator {
  private status: AuthenticatorStatus = { type: "initial" };

  constructor(
    private credentials: MillCredential,
    private apiURL: string,
    private agent?: Agent
  ) {}

  async authenticate() {
    let accessToken = await this.retrieveAccessToken();
    return [["Authorization", `Bearer ${accessToken.idToken}`]];
  }

  private async retrieveAccessToken(): Promise<Token> {
    switch (this.status.type) {
      case "authenticating":
        return await this.status.result;
      case "authenticated":
        if (Date.now() < this.status.accessToken.expireTime) {
          return this.status.accessToken;
        }
    }
    let result = this.refresh();
    this.status = { type: "authenticating", result };
    try {
      let accessToken = await result;
      this.status = { type: "authenticated", accessToken };
      return accessToken;
    } catch (error) {
      this.status = { type: "failed", error };
      return Promise.reject(error);
    }
  }

  private async refresh(): Promise<Token> {
    let response = await fetch(`${this.apiURL}/customer/auth/sign-in
    `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: this.credentials.username,
        password: this.credentials.password
      }),
      agent: this.agent,
    });
    
    let payload = (await response.json()) as {idToken: string, refreshToken: string};
      try {
        let parts = payload.idToken.split(".");
        let decoded = JSON.parse(Buffer.from(parts[1], "base64").toString()) as TokenPayload;
        return {
          ...payload,
            expireTime: Date.now() + decoded.exp - decoded.iat,
            refreshExpireTime: Date.now() + decoded.exp - decoded.iat,
        }
      } catch (error) {
        return Promise.reject(error);
      }
  }
}
