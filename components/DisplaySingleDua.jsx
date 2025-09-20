import styles from "@/assets/styles/singlePrayer.styles";
import AppText from "@/components/AppText";
import useCategoryStore from "@/store/useCategoryStore";
import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplaySingleDua = () => {
  const { prayerId } = useLocalSearchParams();
  const currentPrayer = useCategoryStore((state) =>
    state.prayers.find((prayer) => prayer.id === prayerId)
  );
  // const getPrayer = useCategoryStore((state) => state.getPrayer);
  // const currentPrayer = getPrayer(prayerId);
  // console.log(currentPrayer);

  const updatePrayerCount = useCategoryStore(
    (state) => state.updatePrayerCount
  );

  const handleCounterPress = () => {
    if (currentPrayer.currentCount < currentPrayer.numberOfTimes) {
      updatePrayerCount(prayerId, currentPrayer.currentCount + 1);
      Vibration.vibrate(50);
    } else if (currentPrayer.currentCount === currentPrayer.numberOfTimes) {
      Vibration.vibrate(400);
    }
  };

  const handleLongPress = () => {
    Vibration.vibrate(40);
    Alert.alert("Reset Counter", "Are you sure you want to reset?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes, reset", onPress: () => updatePrayerCount(prayerId, 0) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
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
  );
};

export default DisplaySingleDua;
