export type Metric = {
    deviceId: string;
    time: number;
    temperature: number;
    humidity: number;
    temperatureAmbient: number;
    currentPower: number;
    controlSignal: number;
    currentOperationMode: number;
    energyUsage: number;
    timeSinceHeaterStartup: number;
    openWindowsStatus: number;
    currentTemperatureTypeInWeeklyProgram: number;
    heaterFlag: number;
    powerStatus: number;
  }