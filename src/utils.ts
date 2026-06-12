import { CoordinatesObject } from "./types";

export function normalizeCoordinatesPart(value: unknown): number | null {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  value = value.trim();

  if (value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export function isCoordinatesObject(
  value: unknown,
): value is CoordinatesObject {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "lat" in value ||
    "latitude" in value ||
    "lng" in value ||
    "lon" in value ||
    "long" in value ||
    "longitude" in value
  );
}
