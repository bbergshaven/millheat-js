import fetch from "node-fetch";
import { type Agent } from "https";

export interface AccessToken {
  expires_in: number;
  token_type: string;
  access_token: string;
  refresh_token: string;
  /// Date in local time, when the access token expires
  expiresAt: Date;
}

type AuthenticatorStatus =
  | {
      type: "initial";
    }
  | {
      type: "authenticating";
      result: Promise<AccessToken>;
    }
  | {
      type: "authenticated";
      accessToken: AccessToken;
    }
  | {
      type: "failed";
      error: unknown;
    };

export class ClientCredentialsAuthenticator {
  private status: AuthenticatorStatus = { type: "initial" };

  constructor(
    private client_id: string,
    private client_secret: string,
    private authenticationURL: string,
    private agent?: Agent
  ) {}

  async authenticate() {
    let accessToken = await this.retriveAccessToken();
    return [["Authorization", `Bearer ${accessToken}`]];
  }

  private async retriveAccessToken(): Promise<AccessToken> {
    switch (this.status.type) {
      case "authenticating":
        return await this.status.result;
      case "authenticated":
        if (new Date() < this.status.accessToken.expiresAt) {
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

  private async refresh() {
    let response = await fetch(this.authenticationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: this.client_id,
        client_secret: this.client_secret,
      }),
      agent: this.agent,
    });

    let payload = (await response.json()) as AccessToken;
    if (payload && payload.access_token && payload.expires_in) {
      payload.expiresAt = new Date(Date.now() + payload.expires_in * 1000);
    }
    return Promise.reject(new Error("Unknown payload"));
  }
}
