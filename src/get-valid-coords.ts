import {
  CoordinatesPart,
  CoordinatesArray,
  CoordinatesString,
  CoordinatesObject,
  Coordinates,
} from "./types";
import {
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX,
} from "./constants";

function getValidCoords(
  param1:
    | CoordinatesArray
    | CoordinatesObject
    | CoordinatesString
    | CoordinatesPart,
  param2?: CoordinatesPart,
): Coordinates | null {
  // 'lat, lng'
  if (typeof param1 === "string" && typeof param2 === "undefined") {
    [param1, param2] = param1.split(",");
  }

  // [lat, lng]
  else if (Array.isArray(param1)) {
    [param1, param2] = param1;
  }

  // { lat, lng }
  else if (typeof param1 === "object" && param1 !== null) {
    const parts = param1 as CoordinatesObject;

    param1 = parts.latitude ?? parts.lat;
    param2 = parts.longitude ?? parts.lng ?? parts.lon ?? parts.long;
  }

  if (
    (!param1 && typeof param1 !== "number") ||
    (!param2 && typeof param2 !== "number")
  ) {
    return null;
  }

  const latitude = Number(param1);
  const longitude = Number(param2);

  if (
    Number.isNaN(latitude) ||
    Number.isNaN(longitude) ||
    latitude < LATITUDE_MIN ||
    latitude > LATITUDE_MAX ||
    longitude < LONGITUDE_MIN ||
    longitude > LONGITUDE_MAX
  ) {
    return null;
  }

  return [latitude, longitude];
}

export default getValidCoords;
