import { Client } from "millheat-js";

let client = new Client({
  access_key: "74d6d912db524d4e813b2aee99947393",
  secret_token: "94f77a25b3434abd8a562919dc8ad1f5",
  username: "bbergshaven@gmail.com",
  password: "XrssmKDMssjQDWEfad2taPBB",
});

let hl = await client.selectHomeList();
console.log("selectHomeList", hl);

let id = await client.getIndependentDevices2020("202210061411230016");
console.log("getIndependentDevices2020", id);

let id2 = await client.selectRoomByHome2020("201901270925160000");
console.log("selectRoomByHome2020", id2);

let device = await client.selectDevice2020("349272");
console.log("selectDevice2020", device);

let devices = await client.selectDeviceByRoom2020("202210061412449984");
console.log("selectDeviceByRoom2020", devices);
