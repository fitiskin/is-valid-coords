import getValidCoords from "./get-valid-coords";
import {
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX
} from "./constants";
import { CoordinatesArray, CoordinatesObject } from "./types";

describe("get-valid-coords", function() {
  describe("Корректно проверяет координаты", function() {
    test("Должен обрабатывать обычные координаты", () => {
      const latitude = 55.7558;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude
      ]);
    });

    test("Должен обрабатывать нулевую точку", () => {
      const latitude = 0;
      const longitude = 0;

      expect(getValidCoords(latitude, longitude)).toEqual([0, 0]);
    });

    test("Не должен обрабатывать широту за максимальным пределом", () => {
      const latitude = LATITUDE_MAX + 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Не должен обрабатывать широту за минимальным пределом", () => {
      const latitude = LATITUDE_MIN - 1;
      const longitude = 37.6173;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Не должен обрабатывать долготу за максимальным пределом", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MAX + 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Не должен обрабатывать долготу за минимальным пределом", () => {
      const latitude = 55.7558;
      const longitude = LONGITUDE_MIN - 1;

      expect(getValidCoords(latitude, longitude)).toBe(null);
    });

    test("Должен обрабатывать граничные положительные значения", () => {
      const latitude = LATITUDE_MAX;
      const longitude = LONGITUDE_MAX;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude
      ]);
    });

    test("Должен обрабатывать граничные отрицательные значения", () => {
      const latitude = -LATITUDE_MIN;
      const longitude = -LONGITUDE_MIN;

      expect(getValidCoords(latitude, longitude)).toEqual([
        latitude,
        longitude
      ]);
    });
  });

  describe("Корректно обрабатывает аргументы", function() {
    test("Должен возвращать false, если не переданы аргументы", function() {
      expect(getValidCoords(undefined)).toBe(null);
    });

    test("Должен возвращать false на falsy-аргументы", function() {
      expect(getValidCoords(null)).toBe(null);
      expect(getValidCoords(null, null)).toBe(null);
      expect(getValidCoords(55.7558, null)).toBe(null);
      expect(getValidCoords(null, 37.6173)).toBe(null);
    });

    test("Должен обрабатывать строки как координаты", function() {
      expect(getValidCoords("55.7558", "37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("0", "0")).toEqual([0, 0]);
    });

    test("Должен обрабатывать строки с пробелами как координаты", function() {
      expect(getValidCoords(" 55.7558", "37.6173  ")).toEqual([
        55.7558,
        37.6173
      ]);
    });

    test("Должен обрабатывать строку как координаты", function() {
      expect(getValidCoords("55.7558, 37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("55.7558,37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords(" 55.7558, 37.6173  ")).toEqual([55.7558, 37.6173]);
    });

    test("При обработке строки принимает только корректные значения", function() {
      expect(getValidCoords("55.7558")).toBe(null);
      expect(getValidCoords("")).toBe(null);
      expect(getValidCoords("test,test")).toBe(null);
    });

    test("Должен обрабатывать подходящий массив чисел", function() {
      expect(getValidCoords([55.7558, 37.6173])).toEqual([55.7558, 37.6173]);
      expect(getValidCoords([0, 0])).toEqual([0, 0]);
    });

    test("Должен обрабатывать подходящий массив строк", function() {
      expect(getValidCoords(["55.7558", "37.6173"])).toEqual([
        55.7558,
        37.6173
      ]);
    });

    describe("Корректно обрабатывает объекты с подходящими ключами", function() {
      test("Должен обрабатывать ключи latitude, longitude", function() {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            latitude,
            longitude
          })
        ).toEqual([latitude, longitude]);
      });

      test("Должен обрабатывать ключи lat, lng", function() {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lng: longitude
          })
        ).toEqual([latitude, longitude]);
      });

      test("Должен обрабатывать ключи lat, lon", function() {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            lon: longitude
          })
        ).toEqual([latitude, longitude]);
      });

      test("Должен обрабатывать ключи lat, long", function() {
        const latitude = 55.7558;
        const longitude = 37.6173;

        expect(
          getValidCoords({
            lat: latitude,
            long: longitude
          })
        ).toEqual([latitude, longitude]);
      });

      test("Должен корректно обрабатывать ноль", function() {
        expect(
          getValidCoords({
            lat: 0,
            lng: 0
          })
        ).toEqual([0, 0]);
      });
    });

    test("Должен обрабатывать смешанные значения string/number", function() {
      expect(getValidCoords("55.7558", 0)).toEqual([55.7558, 0]);
      expect(getValidCoords(0, "37.6173")).toEqual([0, 37.6173]);
      expect(getValidCoords(55.7558, "37.6173")).toEqual([55.7558, 37.6173]);
      expect(getValidCoords("55.7558", 37.6173)).toEqual([55.7558, 37.6173]);
    });
  });

  describe("Не модифицирует аргументы", function() {
    test("Не меняет переданный массив", function() {
      const input: CoordinatesArray = ["55.7558", "37.6173"];

      getValidCoords(input);

      expect(input).toEqual(["55.7558", "37.6173"]);
    });

    test("Не меняет переданный объект", function() {
      const input: CoordinatesObject = { lat: "55.7558", lng: "37.6173" };

      getValidCoords(input);

      expect(input).toEqual({ lat: "55.7558", lng: "37.6173" });
    });
  });
});
