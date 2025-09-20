import styles from "@/assets/styles/singlePrayer.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Prayer Title */}
          <View style={styles.titleContainer}>
            <View style={styles.menuContainer}>
              <AppText weight="Bold" style={styles.title}>
                {currentPrayer?.title}
              </AppText>
              <Menu>
                <MenuTrigger>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={18}
                    color={COLORS.primary}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsContainer: {
                      padding: 8,
                      borderRadius: 8,
                      backgroundColor: "white",
                      shadowColor: "#000",
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 5,
                    },
                  }}
                >
                  {/* delete option */}
                  <MenuOption
                    onSelect={() =>
                      Alert.alert(
                        "Delete Prayer",
                        "Are you sure you want to delete this Prayer?",
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => {
                              deletePrayer(prayerId);
                              router.back();
                            },
                          },
                        ]
                      )
                    }
                    text="Delete Category"
                  />
                  {/* edit option */}
                  <MenuOption
                    onSelect={() => setEditForm(true)}
                    text="Edit Prayer"
                  />
                </MenuOptions>
              </Menu>
            </View>

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
