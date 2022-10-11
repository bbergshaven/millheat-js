type integer = number;

export type DeviceInfoItem = {
  // number($double)Ambient temperature
  ambientTemp: number;
  // integer($int64) Socket：Cooling mode show 0 Off，1 On
  coolingStatus: integer;
  // number($double)Power consumption for current month kwh
  currentMonthKwh: number;
  // integer($int64) deviceId
  deviceId: integer;
  // string deviceName
  deviceName: string;
  // integer($int64) eCO2
  eco2: integer;
  // integer($int64) —Panel Gen 1：N/A —New Panel Heater：N/A —Oil Heater：Level (0 Low 1 Medium 2 High) —Convection Heater：Fan status 0 Off 1 On —Socket：Temperature Sensor status 0 No 1 Yes
  fanAndLevelAndTempSensor: integer;
  // integer($int64) Heating status: 0 No 1 Yes
  heatStatus: integer;
  // number($double) Humidity
  humidity: number;
  // boolean
  independent: boolean;
  // integer($int64) Independent mode switch: 0 No 1 Yes
  independentSwitch: integer;
  // integer($int64) Independent mode temperature
  independentTemp: integer;
  // string Independent mode Next task description
  nextTaskDescription: string;
  // string Independent mode Time for next task: ‘3:45’
  nextTaskTimeForIndependent: string;
  // integer($int64) device is online or not: 0 No 1 Yes
  onlineStatus: integer;
  // integer($int64) Switch status: 0 No 1 Yes
  powerStatus: integer;
  // integer($int64) 863: Panel Gen 1 5316: New Panel Heater 5317: Oil Heater 5332: Convection Heater 5333: Socket 6933: Sense Air
  subDomain: integer;
  // integer($int64) Socket：Temperature Sensor show 0 Off 1 On
  tempSensor: integer;
  // integer($int64) TVOC
  tvoc: integer;
  // integer($int64) Open Window status: 0 Close 1 Open
  windowsStatus: integer;
};
