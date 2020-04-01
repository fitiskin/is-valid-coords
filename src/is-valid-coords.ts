import {
  CoordinatesPart,
  CoordinatesArray,
  CoordinatesString,
  CoordinatesObject,
} from "./types";
import getValidCoords from "./get-valid-coords";

function isValidCoords(
  coords: CoordinatesArray | CoordinatesObject | CoordinatesString
): boolean;

function isValidCoords(
  latitude: CoordinatesPart,
  longitude: CoordinatesPart
): boolean;

function isValidCoords(...args: Parameters<typeof getValidCoords>): boolean {
  return Boolean(getValidCoords(...args));
}

export default isValidCoords;
