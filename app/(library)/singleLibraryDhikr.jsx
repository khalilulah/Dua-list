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
        <View style={styles.countBadge}>
          <AppText weight="Bold" style={styles.countText}>
            Recite {dhikr.count}× time(s)
          </AppText>
        </View>
        {/* Arabic Text */}
        <View>
          <AppText style={styles.arabicText}>{dhikr.arabic}</AppText>
        </View>

        {/* Transliteration */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <AppText weight="Bold" style={styles.label}>
              Transliteration
            </AppText>
          </View>
          <AppText weight="Regular" style={styles.latinText}>
            {dhikr.latin}
          </AppText>
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
    fontSize: 18,
    lineHeight: 48,
    textAlign: "right",
    marginBottom: 16,
    color: COLORS.primary,
    fontFamily: "Amiri-Regular",
  },
  section: {
    paddingVertical: 20,
    marginBottom: 16,
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
    fontSize: 14,
    lineHeight: 26,
    color: "#555",
    textAlign: "left",
    // fontStyle: "italic",
  },
  translationText: {
    fontSize: 14,
    lineHeight: 26,
    color: "#555",
  },
  fawaidText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#555",
  },
  sourceText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  countText: {
    fontSize: 14,
    color: COLORS.Secondary,
  },
});

export default singleLibraryDhikr;
