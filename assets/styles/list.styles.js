import COLORS from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../utils/responsive";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const cardMargin = widthPixel(2);
const cardHorizontalMargin = widthPixel(2); // Increased horizontal margin
const cardPadding = widthPixel(3);
const cardWidth = (screenWidth - widthPixel(6) - cardHorizontalMargin * 4) / 2;
export const ProgressBarWidth = cardWidth - cardPadding * 2;

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: COLORS.Secondary,
    elevation: 10,
    borderColor: COLORS.Secondary,
    borderRadius: widthPixel(4),
    width: cardWidth,
    padding: cardPadding,
    marginVertical: cardMargin,
    marginHorizontal: cardHorizontalMargin,
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: heightPixel(26),
  },
  AddIcon: {
    backgroundColor: COLORS.Secondary,
    elevation: 10,
    borderColor: COLORS.Secondary,
    borderRadius: widthPixel(2),
    padding: widthPixel(1.4),
  },
  FlatListContainer: {
    flex: 1,
    backgroundColor: COLORS.Secondary,
  },
  containerRemaining: {
    flex: 1, // Add this
    minHeight: screenHeight * 0.6,
    backgroundColor: COLORS.Secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    paddingTop: 15,
    paddingHorizontal: 1,
    // paddingBottom: heightPixel(25),
  },
  hadithsContainer: {
    alignSelf: "center",
    paddingTop: 13,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: cardHorizontalMargin,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: cardMargin,
    marginHorizontal: cardHorizontalMargin + cardHorizontalMargin,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.primary,
  },
  FlatList: {
    flexGrow: 1,
  },
  modalStyle: {
    width: widthPixel(80),
    height: heightPixel(30),
    backgroundColor: COLORS.cardBackground,
    borderRadius: widthPixel(4),
    padding: 17,
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
