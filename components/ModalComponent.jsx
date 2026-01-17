import { KeyboardAvoidingView, Modal, Platform, View } from "react-native";

const ModalComponent = ({ isOpen, children, ...props }) => {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.3)", // 👈 dark overlay
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalComponent;
