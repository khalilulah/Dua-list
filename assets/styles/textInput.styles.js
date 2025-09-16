import COLORS from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
import { widthPixel } from "../../utils/responsive";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const cardMargin = widthPixel(2);
const cardPadding = widthPixel(3);
const cardWidth = (screenWidth - widthPixel(6) - cardMargin * 4) / 2; // Account for padding and margins
export const ProgressBarWidth = cardWidth - cardPadding * 2;
const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  inputField: {
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.border,
  },
});

export default styles;
