import { APIMethod } from "../api";

export type House = {
    id: string;
    name: string;
    postalCode: string;
    timezone: string;
    ownerId: string;
    mode: string;
    vacationStartDate: number;
    vacationEndDate: number;
    vacationTemperature: number;
    vacationModeType: string;
    isVacationModeActive: boolean;
    overrideModeType: string;
    overrideEndDate: number;
    createdAt: string;
};

export type Permissions = {
    maxTemperature: number;
    changeTemperature: boolean;
    renameDevices: boolean;
    renameHouse: boolean;
    updateHousePostalCode: boolean;
    updateHouseTimezone: boolean;
    renameRooms: boolean;
    managePrograms: boolean;
    manageVacationMode: boolean;
    overrideWeeklyProgram: boolean;
    deleteHouse: boolean;
    deleteRoom: boolean;
    createRoom: boolean;
    addDevices: boolean;
    deleteDevices: boolean;
    moveDevices: boolean;
};

export type SharedHouse = {
    house: House;
    permissions: Permissions;
}

export type HouseResponse = {
    ownHouses: House[];
    sharedHouses: SharedHouse[];
}

export interface HouseAPIMethod extends APIMethod {
    parameters: null
    resultType: HouseResponse;
  }
  
  