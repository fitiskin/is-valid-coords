import {
  CoordinatesPart,
  CoordinatesArray,
  CoordinatesString,
  CoordinatesObject
} from "./types";
import {
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX
} from "./constants";

function isValidCoords(
  latitude: CoordinatesPart,
  longitude: CoordinatesPart
): boolean;

function isValidCoords(
  coords: CoordinatesArray | CoordinatesString | CoordinatesObject
): boolean;

function isValidCoords(
  part1: CoordinatesPart | CoordinatesArray | CoordinatesObject,
  part2?: CoordinatesPart
): boolean {
  // 'lat, lng'
  if (typeof part1 === "string" && typeof part2 === "undefined") {
    [part1, part2] = part1.split(",");
  }

  // [lat, lng]
  else if (Array.isArray(part1)) {
    [part1, part2] = part1;
  }

  // { lat, lng }
  else if (typeof part1 === "object" && part1 !== null) {
    const parts = part1 as CoordinatesObject;

    part1 = parts.latitude ?? parts.lat;
    part2 = parts.longitude ?? parts.lng ?? parts.lon ?? parts.long;
  }

  if (
    (!part1 && typeof part1 !== "number") ||
    (!part2 && typeof part2 !== "number")
  ) {
    return false;
  }

  const latitude = Number(part1);
  const longitude = Number(part2);

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
