import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import COLORS from "../../constants/colors";
import { useCategoryStore } from "../../store/useDhikrSrore";

const singleLibraryDhikr = () => {
  const { dhikrId } = useLocalSearchParams();

  const loading = useCategoryStore((state) => state.loading);
  const dhikr = useCategoryStore((state) => state.dhikr);
  const prayerSlug = useCategoryStore((state) => state.prayerSlug);
  const fetchDhikrId = useCategoryStore((state) => state.fetchDhikrId);

  // load the dhikr on initial page load
  useEffect(() => {
    fetchDhikrId(dhikrId, prayerSlug);
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={30} color={COLORS.primary} />
        <AppText weight="ExtraBold" style={styles.loadingText}>
          Loading...
        </AppText>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Arabic Text */}
        <View style={styles.arabicContainer}>
          <AppText style={styles.arabicText}>{dhikr.arabic}</AppText>
        </View>

        {/* Transliteration */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <AppText weight="Bold" style={styles.label}>
              Transliteration
            </AppText>
          </View>
          <AppText style={styles.latinText}>{dhikr.latin}</AppText>
        </View>

        {/* Translation */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <AppText weight="Bold" style={styles.label}>
              Translation
            </AppText>
          </View>
          <AppText style={styles.translationText}>{dhikr.translation}</AppText>
        </View>

        {/* Fawaid (Benefits) */}
        {dhikr.fawaid ? (
          <View style={styles.section}>
            <View style={styles.labelContainer}>
              <AppText weight="Bold" style={styles.label}>
                Benefits (Fawaid)
              </AppText>
            </View>
            <AppText style={styles.fawaidText}>{dhikr.fawaid}</AppText>
          </View>
        ) : null}

        {/* Source */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <AppText weight="Bold" style={styles.label}>
              Source
            </AppText>
          </View>
          <AppText style={styles.sourceText}>{dhikr.source}</AppText>
        </View>

        {/* Count Badge */}
        <View style={styles.countBadge}>
          <AppText weight="Bold" style={styles.countText}>
            Recite {dhikr.count}× times
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  arabicContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderRightWidth: 4,
    borderRightColor: COLORS.primary,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
  },
  arabicText: {
    fontSize: 28,
    lineHeight: 48,
    textAlign: "right",
    color: COLORS.primary,
    fontFamily: "Amiri-Regular", // You'll need to load this font
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  labelContainer: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "20",
  },
  label: {
    fontSize: 14,
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  latinText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#555",
    fontStyle: "italic",
  },
  translationText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
  },
  fawaidText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },
  sourceText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
    fontStyle: "italic",
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  countText: {
    fontSize: 16,
    color: COLORS.Secondary,
  },
});

export default singleLibraryDhikr;
