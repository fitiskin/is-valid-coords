import isValidCoords from "./is-valid-coords";
import getValidCoords from "./get-valid-coords";

jest.mock("./get-valid-coords", () => {
  return jest.fn().mockImplementation((a, b) => {
    if (a && b) {
      return [55.7558, 37.6173];
    }

    return null;
  });
});

describe("is-valid-coords", function () {
  test("Correctly passes arguments to getValidCoords", () => {
    isValidCoords(55.7558, 37.6173);

    expect(getValidCoords).toHaveBeenCalledWith(55.7558, 37.6173);
  });

  test("Correctly returns boolean from getValidCoords result", () => {
    expect(isValidCoords(55.7558, 37.6173)).toBe(true);
    expect(isValidCoords(null)).toBe(false);
  });
});
