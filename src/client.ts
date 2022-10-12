import { Authenticator } from "./authenticator";
import { Agent } from "https";
import { Headers, RequestInit } from "node-fetch";
import { Home } from "./models/home-result";
import { APIMethod, execute } from "./api";
import { IndependentDevice } from "./models/independent-device-item";
import { RoomItem } from "./models/room-item";
import {
  DeviceAPIMethod,
  DeviceByRoomAPIMethod,
  HomeListAPIMethod,
  IndependentDeviceAPIMethod,
  RoomByHomeAPIMethod,
} from "./models/methods";
import { DeviceItem } from "./models/device-item";
import { DeviceInfoItem } from "./models/device-info-item";

const apiUrl = "https://api.millheat.com";

export interface AccessToken {
  /// The parsed access token
  payload: MillheatAccessToken;
  /// The access token
  access_token: string;
  /// The refresh token
  refresh_token: string;
  /// Date in local time, when the access token expires
  expireTime: Date;
  /// Date in local time, when the refresh token expires
  refresh_expireTime: Date;
}

export type MillCredential = {
  access_key: string;
  secret_token: string;
  username: string;
  password: string;
};

interface MillheatAccessToken {
  username: string;
  uid: number;
  account: string;
  accountId: number;
  type: string;
  exp: number;
  nbf: number;
  iss: string;
}

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

  async selectDevice2020(deviceId: string): Promise<DeviceInfoItem> {
    let response = await this.api<DeviceAPIMethod>(
      `${apiUrl}/uds/selectDevice2020`,
      {},
      {
        deviceId,
      }
    );
    return response;
  }

  async getIndependentDevices2020(
    homeId: string
  ): Promise<IndependentDevice[]> {
    let response = await this.api<IndependentDeviceAPIMethod>(
      `${apiUrl}/uds/getIndependentDevices2020`,
      {},
      {
        homeId,
      }
    );
    return response.deviceInfoList;
  }

  async selectDeviceByRoom2020(roomId: string): Promise<DeviceItem[]> {
    let response = await this.api<DeviceByRoomAPIMethod>(
      `${apiUrl}/uds/selectDevicebyRoom2020`,
      {},
      {
        roomId,
      }
    );
    return response.deviceList;
  }

  async selectHomeList(): Promise<Home[]> {
    let response = await this.api<HomeListAPIMethod>(
      `${apiUrl}/uds/selectHomeList`,
      {},
      null
    );
    return response.homeList;
  }

  async selectRoomByHome2020(homeId: string): Promise<RoomItem[]> {
    let response = await this.api<RoomByHomeAPIMethod>(
      `${apiUrl}/uds/selectRoombyHome2020`,
      {},
      {
        homeId,
      }
    );
    return response.roomList;
  }
}
