import styles from "@/assets/styles/singlePrayer.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheets from "./BottomSheet";

const DisplaySingleDua = () => {
  const router = useRouter();
  const { prayerId } = useLocalSearchParams();
  const [editForm, setEditForm] = useState(false);
  const updatePrayer = useCategoryStore((state) => state.updatePrayer);
  const currentPrayer = useCategoryStore((state) =>
    state.prayers.find((prayer) => prayer.id === prayerId)
  );
  const deletePrayer = useCategoryStore((state) => state.deletePrayer);
  // const getPrayer = useCategoryStore((state) => state.getPrayer);
  // const currentPrayer = getPrayer(prayerId);
  // console.log(currentPrayer);

  const updatePrayerCount = useCategoryStore(
    (state) => state.updatePrayerCount
  );

  // handles count
  const handleCounterPress = () => {
    if (currentPrayer.currentCount < currentPrayer.numberOfTimes) {
      updatePrayerCount(prayerId, currentPrayer.currentCount + 1);
      Vibration.vibrate(50);
    } else if (currentPrayer.currentCount === currentPrayer.numberOfTimes) {
      Vibration.vibrate(400);
    }
  };

  //handles delete
  const handleDeletePrayer = (prayerId) => {
    Alert.alert("delete prayer", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          return deletePrayer(prayerId);
        },
      },
    ]);
    router.back();
  };

  // handles reset counter
  const handleLongPress = () => {
    Vibration.vibrate(40);
    Alert.alert("Reset Counter", "Are you sure you want to reset?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes, reset", onPress: () => updatePrayerCount(prayerId, 0) },
    ]);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              width: 70,
              height: 30,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 10,
            }}
            onPress={() => setEditForm(true)}
          >
            <AppText>Edit</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              width: 70,
              height: 30,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 10,
            }}
            onPress={() => handleDeletePrayer(currentPrayer?.id)}
          >
            <AppText>Delete</AppText>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Prayer Title */}
          <View style={styles.titleContainer}>
            <AppText weight="Bold" style={styles.title}>
              {currentPrayer?.title}
            </AppText>
            <AppText style={styles.counter}>
              {currentPrayer?.currentCount}/{currentPrayer?.numberOfTimes} times
            </AppText>
          </View>

          {/* Arabic Text */}
          {currentPrayer?.arabicText && (
            <View style={styles.textSection}>
              <AppText weight="Medium" style={styles.sectionLabel}>
                Arabic
              </AppText>
              <AppText style={styles.arabicText}>
                {currentPrayer.arabicText}
              </AppText>
            </View>
          )}

          {/* Transliteration */}
          {currentPrayer?.transliteration && (
            <View style={styles.textSection}>
              <AppText weight="Medium" style={styles.sectionLabel}>
                Transliteration
              </AppText>
              <AppText style={styles.transliteration}>
                {currentPrayer.transliteration}
              </AppText>
            </View>
          )}

          {/* Translation */}
          {currentPrayer?.translation && (
            <View style={styles.textSection}>
              <AppText weight="Medium" style={styles.sectionLabel}>
                Translation
              </AppText>
              <AppText style={styles.translation}>
                {currentPrayer.translation}
              </AppText>
            </View>
          )}

          {/* Counter Button */}
          <View style={styles.counterSection}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={handleCounterPress}
              onLongPress={handleLongPress}
            >
              <AppText weight="Bold" style={styles.counterButtonText}>
                {currentPrayer?.currentCount || 0}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {editForm && (
        <BottomSheets
          setBottomForm={setEditForm}
          categoryId={currentPrayer.categoryId}
          mode="edit"
          prayer={currentPrayer}
        >
          <AppText weight="Bold" style={{ marginBottom: 20 }}>
            Edit Dua
          </AppText>
        </BottomSheets>
      )}
    </>
  );
};

export default DisplaySingleDua;
