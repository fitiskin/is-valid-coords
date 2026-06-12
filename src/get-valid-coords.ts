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
import { isCoordinatesObject, normalizeCoordinatesPart } from "./utils";

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
  else if (isCoordinatesObject(param1)) {
    param2 = param1.longitude ?? param1.lng ?? param1.lon ?? param1.long;
    param1 = param1.latitude ?? param1.lat;
  }

  const latitude = normalizeCoordinatesPart(param1);
  const longitude = normalizeCoordinatesPart(param2);

  if (
    latitude == null ||
    longitude == null ||
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
