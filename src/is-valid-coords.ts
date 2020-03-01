import {
  Coordinate,
  CoordinatePart,
  CoorinatesArray,
  CoorinatesString,
  CoorinatesObject
} from "./types";

export const LATITUDE_MIN = -90;
export const LATITUDE_MAX = 90;
export const LONGITUDE_MIN = -180;
export const LONGITUDE_MAX = 180;

function isValidCoords(latitude: Coordinate, longitude: Coordinate): boolean;
function isValidCoords(coords: CoorinatesArray): boolean;
function isValidCoords(coords: CoorinatesString): boolean;
function isValidCoords(coords: CoorinatesObject): boolean;

function isValidCoords(
  param1: Coordinate | CoorinatesArray | CoorinatesObject,
  param2?: Coordinate
): boolean {
  // isValidCoords(`${lat},${lng}`)
  if (typeof param1 === "string" && typeof param2 === "undefined") {
    [param1 as CoordinatePart, param2 as CoordinatePart] = param1.split(",");
  }

  // isValidCoords([lat, lng])
  else if (Array.isArray(param1)) {
    [param1, param2] = param1;
  }

  // isValidCoords({ lat, lng })
  else if (typeof param1 === "object" && param1 !== null) {
    const parts = param1 as CoorinatesObject;

    param1 = parts.latitude ?? parts.lat;
    param2 = parts.longitude ?? parts.lng ?? parts.lon ?? parts.long;
  }

  const latitude: CoordinatePart = Number(param1);
  const longitude: CoordinatePart = Number(param2);

  return (
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude) &&
    latitude >= LATITUDE_MIN &&
    latitude <= LATITUDE_MAX &&
    longitude >= LONGITUDE_MIN &&
    longitude <= LONGITUDE_MAX
  );
}

export default isValidCoords;
