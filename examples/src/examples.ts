import * as dotenv from "dotenv";
import { Client } from "../../src";

dotenv.config();
let client = new Client({
  username: process.env.MILL_USERNAME!,
  password: process.env.MILL_PASSWORD!,
});

let hl = await client.getHouses();
console.log("selectHomeList", hl);

let i1 = await client.getDevicesForHouse("213ff5d8-8039-4962-833d-00600493a1a6");
console.log("getDevicesForHouse",  JSON.stringify(i1,null,2));

let i2 = await client.getIndependentDevicesForHouse("213ff5d8-8039-4962-833d-00600493a1a6")
console.log("getIndependentDevicesForHouse", JSON.stringify(i2,null,2));

