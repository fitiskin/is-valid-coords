import isValidCoords from "./is-valid-coords";
import {
  LATITUDE_MIN,
  LATITUDE_MAX,
  LONGITUDE_MIN,
  LONGITUDE_MAX
} from "./constants";

let defaultCoordinates;

beforeEach(() => {
  defaultCoordinates = {
    latitude: 55.7558,
    longitude: 37.6173
  };
});

describe("is-valid-coords", function() {
  describe("Корректно проверяет координаты", function() {
    test("Должен обрабатывать обычные координаты", () => {
      const { latitude, longitude } = defaultCoordinates;

      delete defaultCoordinates.latitude;
      expect(isValidCoords(latitude, longitude)).toBe(true);
    });

    test("Должен обрабатывать нулевую точку", () => {
      const latitude = 0;
      const longitude = 0;

      expect(isValidCoords(latitude, longitude)).toBe(true);
    });

    test("Не должен обрабатывать широту за максимальным пределом", () => {
      const latitude = LATITUDE_MAX + 1;
      const { longitude } = defaultCoordinates;

      expect(isValidCoords(latitude, longitude)).toBe(false);
    });

    test("Не должен обрабатывать широту за минимальным пределом", () => {
      const latitude = LATITUDE_MIN - 1;
      const { longitude } = defaultCoordinates;

      expect(isValidCoords(latitude, longitude)).toBe(false);
    });

    test("Не должен обрабатывать долготу за максимальным пределом", () => {
      const longitude = LONGITUDE_MAX + 1;
      const { latitude } = defaultCoordinates;

      expect(isValidCoords(latitude, longitude)).toBe(false);
    });

    test("Не должен обрабатывать долготу за минимальным пределом", () => {
      const longitude = LONGITUDE_MIN - 1;
      const { latitude } = defaultCoordinates;

      expect(isValidCoords(latitude, longitude)).toBe(false);
    });

    test("Должен обрабатывать граничные положительные значения", () => {
      const latitude = LATITUDE_MAX;
      const longitude = LONGITUDE_MAX;

      expect(isValidCoords(latitude, longitude)).toBe(true);
    });

    test("Должен обрабатывать граничные отрицательные значения", () => {
      const latitude = -LATITUDE_MIN;
      const longitude = -LONGITUDE_MIN;

      expect(isValidCoords(latitude, longitude)).toBe(true);
    });
  });

  describe("Корректно обрабатывает аргументы", function() {
    test("Должен возвращать false, если не переданы аргументы", function() {
      expect(isValidCoords(undefined)).toBe(false);
    });

    test("Должен возвращать false на falsy-аргументы", function() {
      expect(isValidCoords(null)).toBe(false);
      expect(isValidCoords(null, null)).toBe(false);
      expect(isValidCoords(defaultCoordinates.latitude, null)).toBe(false);
      expect(isValidCoords(null, defaultCoordinates.longitude)).toBe(false);
    });

    test("Должен обрабатывать строки как координаты", function() {
      expect(isValidCoords("55.7558", "37.6173")).toBe(true);
      expect(isValidCoords(" 55.7558", "37.6173  ")).toBe(true);
    });

    test("Должен обрабатывать строку как координаты", function() {
      expect(isValidCoords("55.7558, 37.6173")).toBe(true);
      expect(isValidCoords("55.7558,37.6173")).toBe(true);
      expect(isValidCoords(" 55.7558, 37.6173  ")).toBe(true);
    });

    test("При обработке строки принимает только корректные значения", function() {
      expect(isValidCoords("55.7558")).toBe(false);
      expect(isValidCoords("")).toBe(false);
      expect(isValidCoords("test,test")).toBe(false);
    });

    test("Должен обрабатывать массив", function() {
      expect(isValidCoords([55.7558, 37.6173])).toBe(true);
      expect(isValidCoords(["55.7558", "37.6173"])).toBe(true);
    });

    describe("Корректно обрабатывает объекты с подходящими ключами", function() {
      test("Должен обрабатывать ключи latitude, longitude", function() {
        const { latitude, longitude } = defaultCoordinates;

        expect(
          isValidCoords({
            latitude,
            longitude
          })
        ).toBe(true);
      });

      test("Должен обрабатывать ключи lat, lng", function() {
        const { latitude, longitude } = defaultCoordinates;

        expect(
          isValidCoords({
            lat: latitude,
            lng: longitude
          })
        ).toBe(true);
      });

      test("Должен обрабатывать ключи lat, lon", function() {
        const { latitude, longitude } = defaultCoordinates;

        expect(
          isValidCoords({
            lat: latitude,
            lon: longitude
          })
        ).toBe(true);
      });

      test("Должен обрабатывать ключи lat, long", function() {
        const { latitude, longitude } = defaultCoordinates;

        expect(
          isValidCoords({
            lat: latitude,
            long: longitude
          })
        ).toBe(true);
      });

      test("Должен корректно обрабатывать ноль", function() {
        expect(
          isValidCoords({
            lat: 0,
            lng: 0
          })
        ).toBe(true);
      });
    });

    test("Должен обрабатывать смешанные значения string/number", function() {
      expect(isValidCoords("55.7558", 0)).toBe(true);
      expect(isValidCoords(0, "37.6173")).toBe(true);
      expect(isValidCoords(55.7558, "37.6173")).toBe(true);
      expect(isValidCoords("55.7558", 37.6173)).toBe(true);
    });
  });
});
