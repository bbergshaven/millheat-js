type integer = number;

export type RoomItem = {
  // number($double) Away temperature
  awayTemp: number;
  // integer($int64) Temperature control permission 0: Can control temperature 1：Cannot control temperature
  changeTemperaturePermission: integer;
  // number($double) Comfort temperature
  comfortTemp: number;
  // string Control Device Individually by: 3 numbers that separated by’,’, 1st：app，2nd：openapi，3rd：tibber
  controlDeviceIndividuallySource: string;
  // integer($int64) Room current mode 0：Program,1:comfort,2:sleep,3:away,4:holiday,5:off
  currentMode: integer;
  // number($double) Power consumption for current month kwh
  currentMonthKwh: number;
  // integer($int64) eCO2
  eco2: integer;
  // integer($int64) Room heating status: 0 No 1 Yes
  heatStatus: integer;
  // integer($int64) Vacation mode end time stamp(second)
  holidayEndTime: integer;
  // number($double) Vacation mode temperature
  holidayTemp: number;
  // integer($int64) When in Vacation mode，target temperature type 0: use holiday temperature 1：use away temperature（Advanced vacation mode status 0：Off 1：On）
  holidayTempType: integer;
  // number($double) Humidity
  humidity: number;
  // integer($int64) Control Device Individually device number
  independentCount: integer;
  // string Control Device Individually device id, separated by’,’
  independentDeviceIds: string;
  // integer($int64) Temperature control permission Max temperature limit（0: no limit）
  maxTemperaturePermission: integer;
  // integer($int64) Room offline device number
  offLineDeviceNum: integer;
  // integer($int64) Room online device number
  onlineDeviceNum: integer;
  // integer($int64) Room online Sense Air number
  onlineSensorDeviceNum: integer;
  // integer($int64) Override status 0 Not continuous(or not Override mode) 1 Continuous
  overrideContinuous: integer;
  // integer($int64) Override continuous hours
  overrideContinuousHour: integer;
  // integer($int64) Override continuous minutes
  overrideContinuousMinute: integer;
  // integer($int64) Program current mode, when currentMode is 0，judge which temperature slider is active. 1:comfort,2:sleep,3:away,4:holiday,5:off
  programMode: integer;
  // integer($int64) Room has online device or not: 0 No 1 Yes
  roomDeviceOnline: integer;
  // integer($int64) roomId
  roomId: integer;
  // string roomName
  roomName: string;
  // string Program name
  roomProgram: string;
  // integer($int64) Program id
  roomProgramId: integer;
  // number($double) Ambient temperature
  roomTemp: number;
  // number($double) Sleep temperature
  sleepTemp: number;
  // integer($int64) Device total number
  totalDevice: integer;
  // integer($int64) TVOC
  tvoc: integer;
};
