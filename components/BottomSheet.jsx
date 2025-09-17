import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "../assets/styles/duaList.styles";

const BottomSheets = ({ children, setBottomForm }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "80%", "100%"], []);

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
            multiline
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Number Of times</AppText>
          <BottomSheetTextInput
            placeholder="1000"
            style={styles.BottomSheetTextInput}
            multiline
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Arabic Text(optional)</AppText>
          <BottomSheetTextInput
            placeholder="Enter Arabic Text....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Translation(Optional)</AppText>
          <BottomSheetTextInput
            placeholder="Enter Translation....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
          />
        </View>

        <View style={styles.BottomSheetTextInputContainer}>
          <AppText style={{ fontSize: 13 }}>Translitration(Option)</AppText>
          <BottomSheetTextInput
            placeholderTextColor="gray"
            placeholder="Enter Translitration....."
            style={styles.BottomSheetTextInputMultiLines}
            multiline
          />
        </View>

        <TouchableOpacity
          onPress={() => setBottomForm(false)}
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
