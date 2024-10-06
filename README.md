# isValidCoords

[![Workflow status](https://github.com/fitiskin/is-valid-coords/actions/workflows/ci.yml/badge.svg)](https://github.com/fitiskin/is-valid-coords/actions/workflows/ci.yml)
[![npm version](https://badgen.net/npm/v/is-valid-coords)](https://www.npmjs.com/package/is-valid-coords)
[![Package size](https://badgen.net/bundlephobia/minzip/is-valid-coords)](https://bundlephobia.com/result?p=is-valid-coords)
[![License](https://badgen.net/npm/license/is-valid-coords)](https://github.com/fitiskin/is-valid-coords/blob/main/LICENSE)

A small, dependency-free utility function for validating coordinates, written in TypeScript.

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

These two utilities could be helpful in situations where you receive coordinates from a third-party system without strict typing, and you prefer to validate them before passing them on or normalizing them into a specific format for further manipulation.

### isValidCoords

`isValidCoords` utility supports various input parameters and ensures that the latitude is a number between -90 and 90, and the longitude is a number between -180 and 180.

```javascript
import isValidCoords from "is-valid-coords";

// true
isValidCoords(55.7558, 37.6173);
isValidCoords([55.7558, 37.6173]);
isValidCoords("55.7558,37.6173");
isValidCoords({ lat: 55.7558, lng: 37.6173 });
isValidCoords({ lat: 55.7558, lon: 37.6173 });
isValidCoords({ lat: 55.7558, long: 37.6173 });
isValidCoords({ latitude: 55.7558, longitude: 37.6173 });

// false
isValidCoords();
isValidCoords(-100, 200);
isValidCoords([]);
isValidCoords('');
isValidCoords(null);
isValidCoords({});
```

### getValidCoords

`getValidCoords` accepts the same input parameters as `isValidCoords` and performs the same checks, but it returns an array with coordinates like `[latitude, longitude]` for valid input, and `null` for invalid input.

```javascript
import { getValidCoords } from "is-valid-coords";

const coords1 = getValidCoords("55.7558, 37.6173"); // [55.7558, 37.6173]
const coords2 = getValidCoords(100, 500); // null
```

## Variants

```javascript
// number arguments
isValidCoords(55.7558, 37.6173);

// array
isValidCoords([55.7558, 37.6173]);

// string
isValidCoords("55.7558,37.6173");

// object with properties:
// - latitude, lat
// - longitude, lng, lon, long
isValidCoords({
  latitude: 55.7558,
  longitude: 37.6173,
});
```
