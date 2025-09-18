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

const BottomSheets = ({ children, setBottomForm, categoryId }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["20%", "80%", "100%"], []);

  const [formData, setFormData] = useState({
    title: "",
    numberOfTimes: "",
    arabicText: "",
    translation: "",
    transliteration: "",
  });

  const addPrayer = useCategoryStore((state) => state.addPrayer);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreatePrayer = async () => {
    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!formData.numberOfTimes || parseInt(formData.numberOfTimes) < 1) {
      alert("Please enter a valid number of times");
      return;
    }

    // At least one of the optional fields must be filled
    if (
      !formData.arabicText.trim() &&
      !formData.translation.trim() &&
      !formData.transliteration.trim()
    ) {
      alert(
        "Please fill at least one of: Arabic Text, Translation, or Transliteration"
      );
      return;
    }

    // Create prayer
    await addPrayer(categoryId, {
      title: formData.title.trim(),
      numberOfTimes: parseInt(formData.numberOfTimes),
      arabicText: formData.arabicText.trim(),
      translation: formData.translation.trim(),
      transliteration: formData.transliteration.trim(),
    });

    // Reset form and close
    setFormData({
      title: "",
      numberOfTimes: "",
      arabicText: "",
      translation: "",
      transliteration: "",
    });
    setBottomForm(false);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      containerStyle={{}}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {children}
        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Title</AppText>
          <BottomSheetTextInput
            placeholder="Fard"
            style={styles.BottomSheetTextInput}
            value={formData.title}
            onChangeText={(text) => updateField("title", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Number Of times</AppText>
          <BottomSheetTextInput
            placeholder="1000"
            style={styles.BottomSheetTextInput}
            value={formData.numberOfTimes}
            onChangeText={(text) => updateField("numberOfTimes", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Arabic Text(optional)</AppText>
          <BottomSheetTextInput
            placeholder="Enter Arabic Text....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.arabicText}
            onChangeText={(text) => updateField("arabicText", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Translation(Optional)</AppText>
          <BottomSheetTextInput
            placeholder="Enter Translation....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.translation}
            onChangeText={(text) => updateField("translation", text)}
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Translitration(Option)</AppText>
          <BottomSheetTextInput
            placeholderTextColor="gray"
            placeholder="Enter Translitration....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
            value={formData.transliteration}
            onChangeText={(text) => updateField("translitration", text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleCreatePrayer}
          activeOpacity={0.7}
          style={{
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor: COLORS.primary,
          }}
        >
          <AppText>Create new dua</AppText>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheets;
