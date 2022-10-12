import { APIMethod } from "../api";
import { DeviceInfoItem } from "./device-info-item";
import { DeviceItem } from "./device-item";
import { Home } from "./home-result";
import { IndependentDevice } from "./independent-device-item";
import { RoomItem } from "./room-item";

type IndependentDeviceList = {
  deviceInfoList: IndependentDevice[];
};

type DeviceList = {
  deviceList: DeviceItem[];
};

type HomeList = {
  homeList: Home[];
};

type RoomList = {
  roomList: RoomItem[];
};

// selectDevice2020
export interface DeviceAPIMethod extends APIMethod {
  parameters: {
    deviceId: string;
  };
  resultType: DeviceInfoItem;
}

// getIndependentDevices2020
export interface IndependentDeviceAPIMethod extends APIMethod {
  parameters: {
    homeId: string;
  };
  resultType: IndependentDeviceList;
}

// selectDevicebyRoom2020
export interface DeviceByRoomAPIMethod extends APIMethod {
  parameters: {
    roomId: string;
  };
  resultType: DeviceList;
}

// selectHomeList
export interface HomeListAPIMethod extends APIMethod {
  parameters: null;
  resultType: HomeList;
}

// selectRoombyHome2020
export interface RoomByHomeAPIMethod extends APIMethod {
  parameters: {
    homeId: string;
  };
  resultType: RoomList;
}
