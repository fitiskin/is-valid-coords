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
  describe("Correctly checks coordinates", function () {
    test("Should handle regular coordinates", () => {
      const latitude = 55.7558;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });

    test("Must handle zero value", () => {
      const latitude = 0;
      const longitude = 0;

      expect(getValidCoords(latitude, longitude)).toEqual([0, 0]);
    });

    test("Must not handle latitude beyond the max limit", () => {
      const latitude = LATITUDE_MAX + 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Must not handle latitude beyond the minimum limit", () => {
      const latitude = LATITUDE_MIN - 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Must not handle longitude beyond the maximum limit", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MAX + 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Must not handle longitude beyond the minimum limit", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MIN - 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Must handle marginal positive values", () => {
      const latitude = LATITUDE_MAX;
      const longitude = LONGITUDE_MAX;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });

    test("Must handle boundary negative values", () => {
      const latitude = -LATITUDE_MIN;
      const longitude = -LONGITUDE_MIN;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude,
      ]);
    });
  });

  describe("Handles arguments correctly", function () {
    test("Should return false if no arguments are passed", function () {
      expect(getValidCoords(undefined)).toBe(null);
    });

    test("Should return false on falsy arguments", function () {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      expect(getValidCoords(null as any)).toBe(null);
      expect(getValidCoords(null as any, null as any)).toBe(null);
      expect(getValidCoords(55.7558, null as any)).toBe(null);
      expect(getValidCoords(null as any, 37.6173)).toBe(null);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });

    test("Should treat strings as coordinates", function () {
      expect(getValidCoords("55.7558", "37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("0", "0")).toEqual([0, 0]);
    });

    test("Must treat strings with spaces as coordinates", function () {
      expect(getValidCoords(" 55.7558", "37.6173  ")).toEqual([
        55.7558, 37.6173,
      ]);
    });

    test("Must treat string as coordinates", function () {
      expect(getValidCoords("55.7558, 37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("55.7558,37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords(" 55.7558, 37.6173  ")).toEqual([55.7558, 37.6173]);
    });

    test("When processing a string, it only accepts valid values", function () {
      expect(getValidCoords("55.7558")).toBe(null);
      expect(getValidCoords("")).toBe(null);
      expect(getValidCoords("test,test")).toBe(null);
    });

    test("Should handle a suitable array of numbers", function () {
      expect(getValidCoords([55.7558, 37.6173])).toEqual([55.7558, 37.6173]);
      expect(getValidCoords([0, 0])).toEqual([0, 0]);
    });

    test("Should handle a suitable array of strings", function () {
      expect(getValidCoords(["55.7558", "37.6173"])).toEqual([
        55.7558, 37.6173,
      ]);
    });

    describe("Correctly handles objects with matching keys", function () {
      test("Must handle latitude, longitude keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            latitude,
            longitude,
          })
        ).toEqual([latitude, longitude]);
      });

      test("Should handle lat, lng keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lng: longitude,
          })
        ).toEqual([latitude, longitude]);
      });

      test("Must handle lat, lon keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lon: longitude,
          })
        ).toEqual([latitude, longitude]);
      });

      test("Should handle lat, long keys", function () {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            long: longitude,
          })
        ).toEqual([latitude, longitude]);
      });

      test("Should correctly handle null", function () {
        expect(
          getValidCoords({
            lat: 0,
            lng: 0,
          })
        ).toEqual([0, 0]);
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
    test("Doesn't change the passed array", function () {
      const input: CoordinatesArray = ["55.7558", "37.6173"];

      getValidCoords(input);

      expect(input).toEqual(["55.7558", "37.6173"]);
    });

    test("Does not change the passed object", function () {
      const input: CoordinatesObject = { lat: "55.7558", lng: "37.6173" };

      getValidCoords(input);

      expect(input).toEqual({ lat: "55.7558", lng: "37.6173" });
    });
  });
});
