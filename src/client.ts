import { Authenticator } from "./authenticator";
import { Agent } from "https";
import { Headers, RequestInit } from "node-fetch";
import { APIMethod, execute } from "./api";
import { HouseAPIMethod, HouseResponse } from "./models/house";
import { DevicesForHouseAPIMethod, DevicesForHouseResponse, IndependentDevicesForHouseAPIMethod, IndependentDevicesForHouseResponse } from "./models/device";

const apiUrl = "https://api.millnorwaycloud.com";

export type MillCredential = {
  username: string;
  password: string;
};


type Options = {
  timeout: number;
};

export class MillheatAPI {
  declare authenticator: Authenticator;
  declare credential: MillCredential;

  options: Options;
  agent = new Agent({ keepAlive: true });

  constructor(credential: MillCredential, options: Partial<Options> = {}) {
    this.options = {
      timeout: 30000,
      ...options,
    };
    this.credential = credential;
    this.authenticator = new Authenticator(credential, apiUrl, this.agent);
  }

  private async api<T extends APIMethod>(
    input: string,
    init: RequestInit,
    request: T["parameters"]
  ) {
    let headers = new Headers(init ? init.headers : undefined);
    let authenticationHeaders = await this.authenticator.authenticate();
    for (let [key, value] of authenticationHeaders) {
      headers.append(key, value);
    }

    let requestInit = {
      ...init,
      agent: this.agent,
      headers: headers,
    };

    return execute(input, requestInit, request, this.options.timeout);
  }

  async getHouses(): Promise<HouseResponse> {
    let response = await this.api<HouseAPIMethod>(
      `${apiUrl}/houses`,
      {},
      null
    );
    return response;
  }
  async getDevicesForHouse(houseId:string): Promise<DevicesForHouseResponse[]> {
    let response = await this.api<DevicesForHouseAPIMethod>(
      `${apiUrl}/houses/${houseId}/devices`,
      {},
      null
    );
    return response;
  }
  async getIndependentDevicesForHouse(houseId:string): Promise<IndependentDevicesForHouseResponse> {
    let response = await this.api<IndependentDevicesForHouseAPIMethod>(
      `${apiUrl}/houses/${houseId}/devices/independent`,
      {},
      null
    );
    return response;
  }
}