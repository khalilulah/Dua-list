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
    marginTop: 15,
    marginBottom: 25,
  },
  flatListStyle: {
    // marginTop: 10,
    // backgroundColor: "#fff",
    // backgroundColor: COLORS.textSecondary,
    // elevation: 4,
    // // iOS
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // }, display: "flex",
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
    shadowRadius: 15,
    borderRightWidth: 4,
    borderRightColor: COLORS.primary,
    alignItems: "center",
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // borderRadius: 10,
    // color: "white",
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
    marginBottom: 20,
  },
  BottomSheetTextInput: {
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    width: "100%",
    borderColor: COLORS.primary,
    fontFamily: "Amiri-Regular",
    color: COLORS.primary,
  },
  BottomSheetTextInputMultiLines: {
    height: 150,
    borderWidth: 2,
    borderRadius: 15,
    width: "100%",
    borderColor: COLORS.primary,
    fontFamily: "Amiri-Regular",
    color: COLORS.primary,
  },
});

export default styles;
