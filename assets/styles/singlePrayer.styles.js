import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    width: "100%",
  },
  titleContainer: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: 8,
  },
  counter: {
    fontSize: 16,
    color: "#666",
  },
  textSection: {
    paddingVertical: 16,

    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  labelContainer: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "20",
  },
  arabicText: {
    fontSize: 20,
    textAlign: "right",
    lineHeight: 48,
    color: "#333",
    fontFamily: "Amiri-Regular",
  },
  transliteration: {
    fontSize: 14,
    color: "#555",
    lineHeight: 24,
  },
  translation: {
    fontSize: 14,
    lineHeight: 24,
    color: "#555",
  },
  counterSection: {
    alignItems: "center",
    marginTop: 40,
  },
  counterButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  counterButtonText: {
    fontSize: 32,
    color: "white",
  },
});

export default styles;
