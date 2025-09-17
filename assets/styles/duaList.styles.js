import COLORS from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
import { widthPixel } from "../../utils/responsive";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const cardMargin = widthPixel(2);
const cardPadding = widthPixel(3);
const cardWidth = (screenWidth - widthPixel(6) - cardMargin * 4) / 2; // Account for padding and margins
export const ProgressBarWidth = cardWidth - cardPadding * 2;
const styles = StyleSheet.create({
  FlatListContainer: {
    flex: 1,
    margin: 10,
  },
  listHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  flatListStyle: {
    backgroundColor: COLORS.textSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: "white",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textPrimary,
  },
  addDua: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  BottomSheetTextInputContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  BottomSheetTextInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  BottomSheetTextInputMultiLines: {
    height: 150,
    borderWidth: 1,
    borderRadius: 15,
    width: "100%",
  },
});

export default styles;
