import { Result } from "./result";

type HomeList = {
  homeList: Home[];
};

export type Home = {
  homeName: string;
  isHoliday: boolean;
  holidayStartTime: number;
  timeZone: string;
  modeMinute: number;
  modeStartTime: number;
  holidayTemp: number;
  modeHour: number;
  currentMode: number;
  holidayEndTime: number;
  homeType: string;
  homeId: number;
  programId: number;
};

/** Result of a selectHomeList operation. */
export type HomeListResult = Result<HomeList>;
