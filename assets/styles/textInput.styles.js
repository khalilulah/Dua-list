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
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  inputField: {
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.lightSecondary,
    fontFamily: "Inter-Regular",
  },
  libraryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    borderRightWidth: 4,
    borderRightColor: COLORS.primary,
  },

  simplr: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBlockColor: COLORS.primary,
  },
});

export default styles;
