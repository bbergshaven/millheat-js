type integer = number;

export type IndependentDevice = {
  // 	number($double) Ambient temperature
  ambientTemperature: number;
  // 	integer($int64) Control Device Individually: 0 No 1 Yes
  controlDeviceIndividually: integer;
  // 	integer($int64) Socket：Cooling mode show 0 Off，1 On
  coolingStatus: integer;
  // 	number($double) Power consumption for current month kwh
  currentMonthKwh: number;
  // 	integer($int64) deviceId
  deviceId: integer;
  // 	string deviceName
  deviceName: string;
  // 	integer($int64) Device type: 1heater 2socket 3sensor
  deviceType: integer;
  // 	integer($int64) eCO2
  eco2: integer;
  // 	integer($int64) —Panel Gen 1：N/A —New Panel Heater：N/A —Oil Heater：Level (0 Low 1 Medium 2 High) —Convection Heater：Fan status 0 Off 1 On —Socket：Temperature Sensor status 0 No 1 Yes
  fanAndLevelAndTempSensor: integer;
  // 	integer($int64) Heating status: 0 No 1 Yes
  heatingStatus: integer;
  // 	integer($int64) Vacation mode temperature
  holidayTemp: integer;
  // 	number($double) Humidity
  humidity: number;
  // 	integer($int64) Vacation mode switch: 0 No 1 Yes
  isHoliday: integer;
  // 	integer($int64) Manually Control: 0 No 1 Yes
  isManualControl: integer;
  // 	string Next task description
  nextTaskDescription: string;
  // 	string Time for next task: ‘3:45’
  nextTaskTime: string;
  // 	integer($int64) Online status: 0 online 1 offline
  onlineStatus: integer;
  // 	integer($int64) Open Window status: 0 Close 1 Open
  openWindow: integer;
  // 	integer($int64) Switch status: 0 Off 1 On
  powerStatus: integer;
  // 	integer($int64) roomId
  roomId: integer;
  // 	number($double) About Sense Air-Power percentage 75.2
  senseAirBatteryPercentage: number;
  // 	integer($int64) About Sense Air-sensor calibration countdown status: 0 Not in calibration countdown status 1 All in calibration countdown status 2 Only TVOC and eCO2 in calibration countdown status
  senseAirCalibrationStatus: integer;
  // 	integer($int64) About Sense Air- Charging status: 0 Not charging 1 Charging
  senseAirCharging: integer;
  // 	string About Sense Air-eCO2 when charging(‘’)(eco2Status==2)
  senseAirChargingEco2: string;
  // 	string About Sense Air-Humidity when charging(‘’)(humidityStatus==2)
  senseAirChargingHumidity: string;
  // 	string About Sense Air-Temperature when charging(‘’)(tempStatus==2)
  senseAirChargingTemp: string;
  // 	string About Sense Air-TVOC when charging(‘’)(tvocStatus==2)
  senseAirChargingTvoc: string;
  // 	integer($int64) About Sense Air-eCO2 round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirEco2Color: integer;
  // 	string About Sense Air-eCO2 countdown max time’72:00’
  senseAirEco2CountdownMaxTime: string;
  // 	string About Sense Air-eCO2 countdown remaining time(‘00:10’)(eco2Status==3)
  senseAirEco2CountdownRemainingTime: string;
  // 	integer($int64) About Sense Air-eCO2 status: 1 Normal 2 Charging 3 Countdown
  senseAirEco2Status: integer;
  // 	integer($int64) About Sense Air-Humidity round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirHumidityColor: integer;
  // 	string About Sense Air-Humidity countdown max time’00:15’
  senseAirHumidityCountdownMaxTime: string;
  // 	string About Sense Air-Humidity countdown remaining time(‘00:10’)(humidityStatus==3)
  senseAirHumidityCountdownRemainingTime: string;
  // 	integer($int64) About Sense Air-Humidity status: 1 Normal 2 Charging 3 Countdown
  senseAirHumidityStatus: integer;
  // 	integer($int64) About Sense Air-TVOC max value
  senseAirMaxTvoc: integer;
  // 	integer($int64) About Sense Air-Timestamp of the latest report millisecond
  senseAirReportTime: integer;
  // 	integer($int64) About Sense Air-Temperature round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirTempColor: integer;
  // 	string About Sense Air-Temperature countdown max time’00:15’
  senseAirTempCountdownMaxTime: string;
  // 	string About Sense Air-Temperature countdown remaining time(‘00:10’)(tempStatus==3)
  senseAirTempCountdownRemainingTime: string;
  // 	integer($int64) About Sense Air-Temperature status: 1 Normal 2 Charging 3 Countdown
  senseAirTempStatus: integer;
  // 	integer($int64) About Sense Air-TVOC round progress bar color 1 red 2 yellow 3 green 4 blue
  senseAirTvocColor: integer;
  // 	string About Sense Air-TVOC countdown max time’72:00’
  senseAirTvocCountdownMaxTime: string;
  // 	string About Sense Air-TVOC countdown remaining time(‘00:10’)(tvocStatus==3)
  senseAirTvocCountdownRemainingTime: string;
  // 	integer($int64) About Sense Air-TVOC status: 1 Normal 2 Charging 3 Countdown
  senseAirTvocStatus: integer;
  // 	integer($int64) 863: Panel Gen 1 5316: New Panel Heater 5317: Oil Heater 5332: Convection Heater 5333: Socket 6933: Sense Air
  subDomainId: integer;
  // 	integer($int64) Socket：Temperature Sensor show 0 Off 1 On
  tempSensor: integer;
  // 	integer($int64) TVOC
  tvoc: integer;
};
