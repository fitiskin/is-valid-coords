# isValidCoords

<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/is-valid-coords">
    <img alt="" src="https://badgen.net/npm/v/is-valid-coords">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=is-valid-coords">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/is-valid-coords">
  </a>
  <a aria-label="License" href="https://github.com/fitiskin/is-valid-coords/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/is-valid-coords">
  </a>
</p>

Tiny dependency-free utility to provide coordinates validation written in TypeScript.

## Install

**npm**

```sh
npm install --save is-valid-coords
```

**yarn**

```sh
yarn add is-valid-coords
```

## Usage

### isValidCoords

```javascript
import isValidCoords from "is-valid-coords";

const latitude = 55.7558;
const longitude = 37.6173;

// true
isValidCoords(latitude, longitude);
isValidCoords(0, 0);

// false
isValidCoords(null);
isValidCoords();
```

### getValidCoords

```javascript
import { getValidCoords } from "is-valid-coords";

// [latitude, longitude]
const coords1 = getValidCoords(55.7558, 37.6173);

// null
const coords2 = getValidCoords(100, 500);
```

## Variants

```javascript
// two arguments
isValidCoords(55.7558, 37.6173);

// array
isValidCoords([55.7558, 37.6173]);

// string
isValidCoords("55.7558, 37.6173");

// plain object with keys:
// - latitude, lat
// - longitude, lng, lon, long
isValidCoords({
  latitude: 55.7558,
  longitude: 37.6173,
});
```
