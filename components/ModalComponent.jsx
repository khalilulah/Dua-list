import { KeyboardAvoidingView, Modal, Platform } from "react-native";

const ModalComponent = ({ isOpen, children, ...props }) => {
  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalComponent;
