import * as dotenv from "dotenv";
import { Client } from "millheat-js";

dotenv.config();
let client = new Client({
  access_key: process.env.MILL_ACCESS_KEY!,
  secret_token: process.env.MILL_SECRET_TOKEN!,
  username: process.env.MILL_USERNAME!,
  password: process.env.MILL_PASSWORD!,
});

let hl = await client.selectHomeList();
console.log("selectHomeList", hl.length);

let id = await client.getIndependentDevices2020("202210061411230016");
console.log("getIndependentDevices2020", id);

let id2 = await client.selectRoomByHome2020("201901270925160000");
console.log("selectRoomByHome2020", id2);

let device = await client.selectDevice2020("349272");
console.log("selectDevice2020", device);

let devices = await client.selectDeviceByRoom2020("202210061412449984");
console.log("selectDeviceByRoom2020", devices);
