# Mill Open API Client for JavaScript

## Javacript library to ease the use of the Mill Open API V2


## Install

```
npm install millheat-js
```

## Examples

```js
import { Client } from "millheat-js";

let client = new Client({
  username: "",
  password: "",
});


let hl = await client.getHouses();
console.log("selectHomeList", hl);

let i1 = await client.getDevicesForHouse("YOUR-HOUSE-ID");
console.log("getDevicesForHouse",  JSON.stringify(i1,null,2));

let i2 = await client.getIndependentDevicesForHouse("YOUR-HOUSE-ID")
console.log("getIndependentDevicesForHouse", JSON.stringify(i2,null,2));

```
