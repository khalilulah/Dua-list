import styles from "@/assets/styles/singlePrayer.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Vibration, View } from "react-native";
import PagerView from "react-native-pager-view";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import BottomSheets from "./BottomSheet";
import MovableCounterButton from "./MovableCounterButton";

const DisplaySingleDua = () => {
  const router = useRouter();
  const { prayerId } = useLocalSearchParams();
  const [editForm, setEditForm] = useState(false);

  const getPrayersForCategory = useCategoryStore(
    (state) => state.getPrayersForCategory
  );

  const deletePrayer = useCategoryStore((state) => state.deletePrayer);

  const updatePrayerCount = useCategoryStore(
    (state) => state.updatePrayerCount
  );

  // ✅ Step 1: Find all prayers in the category of the current prayerId
  const allPrayers = useCategoryStore((state) => state.prayers);
  const prayerFromId = allPrayers.find((p) => p.id === prayerId);
  const prayers = getPrayersForCategory(prayerFromId?.categoryId) || [];

  // ✅ Step 2: Find initial index
  const initialIndex = prayers.findIndex((p) => p.id === prayerId);

  // ✅ Step 3: Track current index
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // ✅ Step 4: Current prayer depends on index
  const currentPrayer = prayers[currentIndex];

  // handles count
  const handleCounterPress = () => {
    if (currentPrayer.currentCount < currentPrayer.numberOfTimes) {
      updatePrayerCount(currentPrayer.id, currentPrayer.currentCount + 1);
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
      {
        text: "Yes, reset",
        onPress: () => updatePrayerCount(currentPrayer.id, 0),
      },
    ]);
  };

  return (
    <>
      <PagerView
        style={{ flex: 1 }}
        initialPage={initialIndex}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {prayers.map((prayer) => (
          <ScrollView
            key={prayer.id}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Prayer Title */}
            <View style={styles.titleContainer}>
              <View style={styles.menuContainer}>
                <AppText weight="Bold" style={styles.title}>
                  {prayer.title}
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
                                deletePrayer(prayer.id); // ✅ use this prayer's id
                                router.back();
                              },
                            },
                          ]
                        )
                      }
                      text="Delete Prayer"
                    />
                    {/* edit option */}
                    <MenuOption
                      onSelect={() => setEditForm(prayer)} // ✅ pass the prayer instead of just true
                      text="Edit Prayer"
                    />
                  </MenuOptions>
                </Menu>
              </View>

              <AppText style={styles.counter}>
                {prayer.currentCount}/{prayer.numberOfTimes} times
              </AppText>
            </View>

            {/* Arabic Text */}
            {prayer.arabicText && (
              <View style={styles.textSection}>
                <AppText weight="Regular" style={styles.sectionLabel}>
                  Arabic
                </AppText>
                <AppText style={styles.arabicText}>{prayer.arabicText}</AppText>
              </View>
            )}

            {/* Transliteration */}
            {prayer.transliteration && (
              <View style={styles.textSection}>
                <AppText weight="Regular" style={styles.sectionLabel}>
                  Transliteration
                </AppText>
                <AppText style={styles.transliteration}>
                  {prayer.transliteration}
                </AppText>
              </View>
            )}

            {/* Translation */}
            {prayer.translation && (
              <View style={styles.textSection}>
                <AppText weight="Regular" style={styles.sectionLabel}>
                  Translation
                </AppText>
                <AppText style={styles.translation}>
                  {prayer.translation}
                </AppText>
              </View>
            )}
          </ScrollView>
        ))}
      </PagerView>

      {/* Counter Button (for active prayer) */}
      <MovableCounterButton
        currentPrayer={currentPrayer} // ✅ need to update this when page changes
        handleCounterPress={handleCounterPress}
        handleLongPress={handleLongPress}
      />

      {/* Edit BottomSheet */}
      {editForm && (
        <BottomSheets
          setBottomForm={() => setEditForm(false)}
          categoryId={editForm.categoryId}
          mode="edit"
          prayer={editForm}
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
