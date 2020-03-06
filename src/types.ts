import { RequireExactlyOne } from "type-fest";

export type Coordinates = [number, number];

export type CoordinatesPart = number | string | undefined;

export type CoordinatesArray = Readonly<[CoordinatesPart, CoordinatesPart]>;

export type CoordinatesString = string;

export type CoordinatesObjectLatitude = {
  lat?: CoordinatesPart;
  latitude?: CoordinatesPart;
};

export type CoordinatesObjectLongitude = {
  lng?: CoordinatesPart;
  lon?: CoordinatesPart;
  long?: CoordinatesPart;
  longitude?: CoordinatesPart;
};

export type CoordinatesObject = RequireExactlyOne<CoordinatesObjectLatitude> &
  RequireExactlyOne<CoordinatesObjectLongitude> & {
    [key: string]: unknown;
  };
