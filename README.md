# Mill Open API Client for JavaScript

## Javacript library to ease the use of the Mill Open API

The library can only be used if you have been granted access to the API's via https://api.millheat.com/ and have an access_key and a secret_token in addition to a Mill heat user account.

## Install

```
npm install millheat-js
```

## Examples

```js
import { Client } from "millheat-js";

let client = new Client({
  access_key: "",
  secret_token: "",
  username: "",
  password: "",
});

// List all homes for the user account
let hl = await client.selectHomeList();
console.log("selectHomeList", hl);

// List all independent devices for the given homeId
let id = await client.getIndependentDevices2020("your-home-id");
console.log("getIndependentDevices2020", id);

// List all rooms for the given homeId
let id2 = await client.selectRoomByHome2020("your-home-id");
console.log("selectRoomByHome2020", id2);

// Get one device by deviceID
let device = await client.selectDevice2020("your-device-id");
console.log("selectDevice2020", device);

// List all devices for the given roomId
let devices = await client.selectDeviceByRoom2020("your-room-id");
console.log("selectDeviceByRoom2020", devices);
```
