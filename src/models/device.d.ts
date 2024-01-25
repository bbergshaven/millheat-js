import { APIMethod } from "src/api";
import { Metric } from "./metric";

export type Device = {
        deviceId: string;
        macAddress: string;
        deviceType: {
          childType: {
            id: string;
            name: string;
          },
          parentType: {
            id: string;
            name: string;
          }
        };
        isConnected: boolean;
        customName: string;
        houseId: string;
        roomId: string;
        isArchived: boolean;
        isEnabled: boolean;
        controlSource: string;
        createdAt: string;
        deviceSettings: unknown;
        lastMetrics: Metric,
        energyUsageForCurrentDay: number;
        sensorRooms: unknown[];
        houseName: string;
        permissions: {
          maxTemperature: number;
          changeTemperature: boolean;
        },
        nearestTimer: unknown;
        airPurifierDefaultSettings: unknown;
        airSensorAdditionalItems: unknown;
        socketTemperatureSensor: boolean;
}

export type IndependentDevicesForHouseResponse = {
    items: Device[];
}

export type DevicesForHouseResponse = {
    roomId: string;
    roomName: string;
    devices: Device[];
}

export interface DevicesForHouseAPIMethod extends APIMethod {
    parameters: null
    resultType: DevicesForHouseResponse[];
}

export interface IndependentDevicesForHouseAPIMethod extends APIMethod {
    parameters: null
    resultType: IndependentDevicesForHouseResponse;
}