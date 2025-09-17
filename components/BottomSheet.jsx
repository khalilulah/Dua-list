import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

const BottomSheets = ({ children }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "80%", "100%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
        {children}
        <BottomSheetTextInput
          placeholder="Enter location name"
          style={{ height: 130, borderWidth: 1 }}
          multiline
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheets;
