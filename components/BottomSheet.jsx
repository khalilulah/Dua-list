import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "../assets/styles/duaList.styles";

const BottomSheets = ({
  children,
  setBottomForm,
  categoryId,
  mode = "create",
  prayer,
}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["20%", "80%", "100%"], []);

  const [formData, setFormData] = useState({
    title: prayer?.title || "",
    numberOfTimes: prayer?.numberOfTimes?.toString() || "",
    arabicText: prayer?.arabicText || "",
    translation: prayer?.translation || "",
    transliteration: prayer?.transliteration || "",
  });

  const addPrayer = useCategoryStore((state) => state.addPrayer);
  const updatePrayer = useCategoryStore((state) => state.updatePrayer);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (
      !formData.numberOfTimes ||
      isNaN(parseInt(formData.numberOfTimes, 10)) ||
      parseInt(formData.numberOfTimes, 10) < 1
    ) {
      alert("Please enter a valid number of times");
      return;
    }

    if (
      !formData.arabicText.trim() &&
      !formData.translation.trim() &&
      !formData.transliteration.trim()
    ) {
      alert(
        "Please fill at least one of: Arabic, Translation, or Transliteration",
      );
      return;
    }

    if (mode === "create") {
      await addPrayer(categoryId, {
        title: formData.title.trim(),
        numberOfTimes: parseInt(formData.numberOfTimes),
        arabicText: formData.arabicText.trim(),
        translation: formData.translation.trim(),
        transliteration: formData.transliteration.trim(),
      });
    } else if (mode === "edit" && prayer?.id) {
      await updatePrayer(prayer.id, {
        ...formData,
        numberOfTimes: parseInt(formData.numberOfTimes),
      });
    }

    setBottomForm(false);
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header (e.g. "Create Dua" or "Edit Dua") */}
        {children}

        {/* Fields */}
        <View style={styles.BottomSheetTextInputContainer}>
          <AppText
            weight="Regular"
            style={{ fontSize: 15, marginBottom: 5, color: COLORS.primary }}
          >
            Title
          </AppText>
          <BottomSheetTextInput
            style={styles.BottomSheetTextInput}
            value={formData.title}
            onChangeText={(text) => updateField("title", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText
            weight="Regular"
            style={{ fontSize: 15, marginBottom: 5, color: COLORS.primary }}
          >
            Number of times
          </AppText>
          <BottomSheetTextInput
            style={styles.BottomSheetTextInput}
            value={formData.numberOfTimes}
            onChangeText={(text) => updateField("numberOfTimes", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText
            weight="Regular"
            style={{ fontSize: 15, marginBottom: 5, color: COLORS.primary }}
          >
            Arabic Text
          </AppText>
          <BottomSheetTextInput
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.arabicText}
            onChangeText={(text) => updateField("arabicText", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText
            weight="Regular"
            style={{ fontSize: 15, marginBottom: 5, color: COLORS.primary }}
          >
            Translation
          </AppText>
          <BottomSheetTextInput
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.translation}
            onChangeText={(text) => updateField("translation", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText
            weight="Regular"
            style={{ fontSize: 15, marginBottom: 5, color: COLORS.primary }}
          >
            Transliteration
          </AppText>
          <BottomSheetTextInput
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.transliteration}
            onChangeText={(text) => updateField("transliteration", text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor: COLORS.primary,
          }}
        >
          <AppText weight="Bold" style={{ color: "white" }}>
            {mode === "create" ? "Create Dua" : "Save Changes"}
          </AppText>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheets;
