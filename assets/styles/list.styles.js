import COLORS from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../utils/responsive";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const cardMargin = widthPixel(2);
const cardPadding = widthPixel(3);
const cardWidth = (screenWidth - widthPixel(6) - cardMargin * 4) / 2; // Account for padding and margins
export const ProgressBarWidth = cardWidth - cardPadding * 2;
const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
    borderRadius: widthPixel(4),
    width: cardWidth,
    padding: cardPadding,
    margin: cardMargin,
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: heightPixel(26),
  },
  FlatListContainer: {
    paddingHorizontal: widthPixel(2.5),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: cardMargin,
    marginBottom: 20,
    width: "auto",
  },
  headerTitle: {
    fontSize: 20,
  },
  FlatList: { paddingBottom: heightPixel(15) },
  modalStyle: {
    width: widthPixel(80),
    height: heightPixel(25),
    backgroundColor: COLORS.cardBackground,
    borderRadius: widthPixel(4),
    padding: 7,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: "auto",
  },
});

export default styles;
