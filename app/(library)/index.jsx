import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import COLORS from "../../constants/colors";
import { useCategoryStore } from "../../store/useDhikrSrore";

const SelectedSlug = () => {
  const { prayerSlug } = useLocalSearchParams();
  const router = useRouter();
  const categoryItems = useCategoryStore((state) => state.categoryItems);
  const fetchDhikrSlug = useCategoryStore((state) => state.fetchDhikrSlug);
  const loading = useCategoryStore((state) => state.loading);
  const setPrayerSlug = useCategoryStore((state) => state.setPrayerSlug);

  // load the prayerSlug on initial page load
  useEffect(() => {
    fetchDhikrSlug(prayerSlug);
  }, []);

  //update the value of prayerSlug anytime the slug changes
  useEffect(() => {
    if (prayerSlug) setPrayerSlug(prayerSlug);
  }, [prayerSlug]);

  const handleSelectedDhikr = (dhikrId) => {
    router.push(`/(library)/singleLibraryDhikr?dhikrId=${dhikrId}`);
  };

  // Convert number to Arabic-Indic numerals
  const toArabicNumeral = (num) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((digit) => arabicNumerals[parseInt(digit)])
      .join("");
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleSelectedDhikr(item.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.numberContainer}>
          <AppText style={styles.arabicNumber}>
            {toArabicNumeral(index + 1)}
          </AppText>
        </View>
        <View style={styles.contentContainer}>
          <AppText style={styles.title}>{item.title}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size={30} color={COLORS.primary} />
        <AppText
          weight="ExtraBold"
          style={{ color: COLORS.primary, fontSize: 14, marginTop: 2 }}
        >
          Loading...
        </AppText>
      </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoryItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            {categoryItems && categoryItems.length > 0 ? (
              <AppText
                weight="ExtraBold"
                style={{
                  fontSize: 32,
                  marginBottom: 10,
                  color: COLORS.primary,
                }}
              >
                {categoryItems[0].categoryName}
              </AppText>
            ) : null}

            <AppText style={{ color: COLORS.primary }}>
              Recite between subhi to sunrise
            </AppText>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  arabicNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.Secondary,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "right",
  },
});

export default SelectedSlug;
