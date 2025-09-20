import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
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
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  arabicText: {
    fontSize: 20,
    textAlign: "right",
    lineHeight: 32,
    color: "#333",
  },
  transliteration: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
    color: "#444",
  },
  translation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
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
