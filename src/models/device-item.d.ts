type integer = number;

export type DeviceItem = {
  // ($double) Ambient temperature
  ambientTemp: number;
  // ($int64) 0 Not Control Device Individually 1 Control Device Individually
  controlDeviceIndividually: integer;
  // ($int64) Control Device Individually by 0：app 1：openapi 2：tibber
  controlDeviceIndividuallySource: integer;
  // ($int64) Socket：Cooling mode show 0 Off，1 On
  coolingStatus: integer;
  // ($double) Power consumption for current month kwh
  currentMonthKwh: number;
  // ($int64) deviceId
  deviceId: integer;
  // string    deviceName
  deviceName: string;
  // ($int64) eCO2
  eco2: integer;
  // ($int64) Socket：Temperature Sensor show 0 Off 1 On
  fanAndLevelAndTempSensor: integer;
  // ($int64) —Panel Gen 1：N/A —New Panel Heater：N/A —Oil Heater：Level (0 Low 1 Medium 2 High) —Convection Heater：Fan status 0 Off 1 On —Socket：Temperature Sensor status 0 No 1 Yes
  fanStatus: integer;
  // ($int64) Heating status: 0 No 1 Yes
  heatingStatus: integer;
  // ($double) Humidity
  humidity: number;
  // string    mac
  mac: string;
  // ($int64) Temperature control permission Max temperature limit（0: no limit）
  maxTemperaturePermission: integer;
  // string    Next task description
  nextTaskDescription: string;
  // string    Time for next task ‘3:45’
  nextTaskTime: string;
  // ($int64) Online status: 0 online 1 offline
  onlineStatus: integer;
  // ($int64) Device 863/5316/5333: power kw
  power: integer;
  // ($int64) Switch status: 0 No 1 Yes
  powerStatus: integer;
  // ($double) About Sense Air-Power percentage 75.2
  senseAirBatteryPercentage: number;
  // ($int64) About Sense Air-sensor calibration countdown status: 0 Not in calibration countdown status 1 All in calibration countdown status 2 Only TVOC and eCO2 in calibration countdown status
  senseAirCalibrationStatus: integer;
  // ($int64) About Sense Air- Charging status: 0 Not charging 1 Charging
  senseAirCharging: integer;
  // string    About Sense Air-eCO2 when charging(eco2Status==2)
  senseAirChargingEco2: string;
  // string    About Sense Air-Humidity when charging(humidityStatus==2)
  senseAirChargingHumidity: string;
  // string    About Sense Air-Temperature when charging(tempStatus==2)
  senseAirChargingTemp: string;
  // string    About Sense Air-TVOC when charging(tvocStatus==2)
  senseAirChargingTvoc: string;
  // ($int64) About Sense Air-eCO2 round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirEco2Color: integer;
  // string    About Sense Air-eCO2 countdown max time’72:00’
  senseAirEco2CountdownMaxTime: string;
  // string    About Sense Air-eCO2 countdown remaining time(‘00:10’)(eco2Status==3)
  senseAirEco2CountdownRemainingTime: string;
  // ($int64) About Sense Air-eCO2 status: 1 Normal 2 Charging 3 Countdow
  senseAirEco2Status: integer;
  // ($int64) About Sense Air-Humidity round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirHumidityColor: integer;
  // string    About Sense Air-Humidity countdown max time’00:15’
  senseAirHumidityCountdownMaxTime: string;
  // string    About Sense Air-Humidity countdown remaining time(‘00:10’)(humidityStatus==3)
  senseAirHumidityCountdownRemainingTime: string;
  // ($int64) About Sense Air-Humidity status: 1 Normal 2 Charging 3 Countdown
  senseAirHumidityStatus: integer;
  // ($int64) About Sense Air-TVOC max value
  senseAirMaxTvoc: integer;
  // ($int64) About Sense Air-Timestamp of the latest report millisecond
  senseAirReportTime: integer;
  // ($int64) About Sense Air-Temperature round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirTempColor: integer;
  // string    About Sense Air-Temperature countdown max time’00:15’
  senseAirTempCountdownMaxTime: string;
  // string    About Sense Air-Temperature countdown remaining time(‘00:10’)(tempStatus==3)
  senseAirTempCountdownRemainingTime: string;
  // ($int64) About Sense Air-Temperature status: 1 Normal 2 Charging 3 Countdown
  senseAirTempStatus: integer;
  // ($int64) About Sense Air-TVOC round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirTvocColor: integer;
  // string    About Sense Air-TVOC countdown max time’72:00’
  senseAirTvocCountdownMaxTime: string;
  // string    About Sense Air-TVOC countdown remaining time(‘00:10’)(tvocStatus==3)
  senseAirTvocCountdownRemainingTime: string;
  // ($int64) About Sense Air-TVOC status: 1 Normal 2 Charging 3 Countdown
  senseAirTvocStatus: integer;
  // ($int64) 863: Panel Gen 1, 5316: New Panel Heater, 5317: Oil Heater, 5332: Convection Heater 5333: Socket, 6933:Sense Air
  subDomain: integer;
  // ($int64) Control Device Individually Target temperature
  targetTempOfControlDeviceIndividually: integer;
  // ($int64) Temperature control permission 0: Can control temperature 1：Cannot control temperature
  temperatureControlPermission: integer;
  // ($int64) TVOC
  tvoc: integer;
  // ($int64) Open Window status: 0 Close 1 Open
  windowsStatus: integer;
};
