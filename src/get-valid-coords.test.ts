import { describe, test, expect } from "vitest";

import getValidCoords from "./get-valid-coords";
import {
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX,
} from "./constants";
import { CoordinatesArray, CoordinatesObject } from "./types";

describe("get-valid-coords", function () {
  describe("Coordinate validation", function () {
    test("Should handle regular coordinates", () => {
      const latitude = 55.7558;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });

    test("Should handle zero value", () => {
      const latitude = 0;
      const longitude = 0;

      expect(getValidCoords(latitude, longitude)).toEqual([0, 0]);
    });

    test("Should reject latitude above the maximum limit", () => {
      const latitude = LATITUDE_MAX + 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Should reject latitude below the minimum limit", () => {
      const latitude = LATITUDE_MIN - 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Should reject longitude above the maximum limit", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MAX + 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Should reject longitude below the minimum limit", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MIN - 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Should handle marginal positive values", () => {
      const latitude = LATITUDE_MAX;
      const longitude = LONGITUDE_MAX;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });

    test("Should handle boundary negative values", () => {
      const latitude = LATITUDE_MIN;
      const longitude = LONGITUDE_MIN;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });
  });

  describe("Argument handling", function () {
    test("Should return null if no arguments are passed", function () {
      expect(getValidCoords(undefined)).toBe(null);
    });

    test("Should return null for invalid arguments", function () {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      expect(getValidCoords(null as any)).toBe(null);
      expect(getValidCoords(null as any, null as any)).toBe(null);
      expect(getValidCoords(55.7558, null as any)).toBe(null);
      expect(getValidCoords(null as any, 37.6173)).toBe(null);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });

    test("Should parse coordinate strings", function () {
      expect(getValidCoords("55.7558", "37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("0", "0")).toEqual([0, 0]);
    });

    test("Should handle coordinate strings with surrounding whitespace", function () {
      expect(getValidCoords(" 55.7558", "37.6173  ")).toEqual([
        55.7558, 37.6173,
      ]);
    });

    test("Should parse coordinates from a comma-separated string", function () {
      expect(getValidCoords("55.7558, 37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("55.7558,37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords(" 55.7558, 37.6173  ")).toEqual([55.7558, 37.6173]);
    });

    test("Should reject invalid coordinate strings", function () {
      expect(getValidCoords("55.7558")).toBe(null);
      expect(getValidCoords("")).toBe(null);
      expect(getValidCoords(" , ")).toBe(null);
      expect(getValidCoords("test,test")).toBe(null);
    });

    test("Should handle a valid array of numbers", function () {
      expect(getValidCoords([55.7558, 37.6173])).toEqual([55.7558, 37.6173]);
      expect(getValidCoords([0, 0])).toEqual([0, 0]);
    });

    test("Should handle a valid array of strings", function () {
      expect(getValidCoords(["55.7558", "37.6173"])).toEqual([
        55.7558, 37.6173,
      ]);

      expect(getValidCoords([" ", " "])).toBe(null);
    });

    describe("Coordinate objects", function () {
      test("Should handle latitude, longitude keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            latitude,
            longitude,
          }),
        ).toEqual([latitude, longitude]);
      });

      test("Should handle lat, lng keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lng: longitude,
          }),
        ).toEqual([latitude, longitude]);
      });

      test("Should handle lat, lon keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lon: longitude,
          }),
        ).toEqual([latitude, longitude]);
      });

      test("Should handle lat, long keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            long: longitude,
          }),
        ).toEqual([latitude, longitude]);
      });

      test("Should handle object coordinates with zero values", function () {
        expect(
          getValidCoords({
            lat: 0,
            lng: 0,
          }),
        ).toEqual([0, 0]);

        expect(getValidCoords({ lat: " ", lng: " " })).toBe(null);
      });
    });

    test("Should handle mixed string/number values", function () {
      expect(getValidCoords("55.7558", 0)).toEqual([55.7558, 0]);
      expect(getValidCoords(0, "37.6173")).toEqual([0, 37.6173]);
      expect(getValidCoords(55.7558, "37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("55.7558", 37.6173)).toEqual([55.7558, 37.6173]);
    });
  });

  describe("Does not modify arguments", function () {
    test("Should not modify the input array", function () {
      const input: CoordinatesArray = ["55.7558", "37.6173"];

      getValidCoords(input);

      expect(input).toEqual(["55.7558", "37.6173"]);
    });

    test("Should not modify the input object", function () {
      const input: CoordinatesObject = { lat: "55.7558", lng: "37.6173" };

      getValidCoords(input);

      expect(input).toEqual({ lat: "55.7558", lng: "37.6173" });
    });
  });
});
