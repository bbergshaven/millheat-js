import { Client } from "millheat-js-api";

let client = new Client({
  access_key: "",
  secret_token: "",
  username: "",
  password: "",
});

let hl = await client.getHomeList("df233");

console.log(hl);
