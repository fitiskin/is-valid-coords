import { RequireExactlyOne } from "type-fest";

export type Coordinate = number | string;

export type CoordinatePart = Coordinate | undefined;

export type CoorinatesArray = Readonly<[CoordinatePart, CoordinatePart]>;

export type CoorinatesString = string;

export type CoordinateLatitudeKeys = "latitude" | "lat";

export type CoordinateLongitudeKeys = "longitude" | "lng" | "lon" | "long";

export type CoorinatesObjectLatitude = {
  lat?: CoordinatePart;
  latitude?: CoordinatePart;
};

export type CoorinatesObjectLongitude = {
  lng?: CoordinatePart;
  lon?: CoordinatePart;
  long?: CoordinatePart;
  longitude?: CoordinatePart;
};

export type CoorinatesObject = RequireExactlyOne<CoorinatesObjectLatitude> &
  RequireExactlyOne<CoorinatesObjectLongitude> & {
    [key: string]: unknown;
  };
