import { RequireExactlyOne } from "type-fest";

export type Coordinate = number | string;

export type CoordinatePart = Coordinate | undefined;

export type CoorinatesArray = Readonly<[Coordinate, Coordinate]>;

export type CoorinatesString = string;

export type CoordinateLatitudeKeys = "latitude" | "lat";

export type CoordinateLongitudeKeys = "longitude" | "lng" | "lon" | "long";

export type CoorinatesObjectLatitude = {
  lat?: Coordinate;
  latitude?: Coordinate;
};

export type CoorinatesObjectLongitude = {
  lng?: Coordinate;
  lon?: Coordinate;
  long?: Coordinate;
  longitude?: Coordinate;
};

export type CoorinatesObject = RequireExactlyOne<CoorinatesObjectLatitude> &
  RequireExactlyOne<CoorinatesObjectLongitude> & {
    [key: string]: unknown;
  };
