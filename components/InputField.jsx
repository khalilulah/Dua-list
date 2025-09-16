import styles from "@/assets/styles/textInput.styles";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import AppText from "./AppText";

const InputField = ({ label, placeholder, ...props }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.textContainer}>
        <AppText style={{ paddingBottom: 10 }}>{label}</AppText>
        <TextInput
          placeholder={placeholder}
          {...props}
          style={styles.inputField}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputField;
