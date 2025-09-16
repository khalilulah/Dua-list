import { Dimensions, PixelRatio } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const widthPixel = (percentage) => {
  const value = (percentage * screenWidth) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};
export const heightPixel = (percentage) => {
  const value = (percentage * screenHeight) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};
