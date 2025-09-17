import styles, { ProgressBarWidth } from "@/assets/styles/list.styles";
import AppText from "@/components/AppText";
import InputField from "@/components/InputField";
import Modal from "@/components/ModalComponent";
import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
const duaGroup = [
  {
    name: "Bedtime",
    progress: 30,
  },
  {
    name: "Bedtime",
    progress: 30,
  },
  {
    name: "Morning",
    progress: 20,
  },
  {
    name: "Travel",
    progress: 60,
  },

  {
    name: "Jannah",
    progress: 57,
  },
  {
    name: "My Parents",
    progress: 100,
  },
];

const List = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // get number of column based on screen width
  const getNumColumns = () => {
    if (screenWidth < 600) return 2; // Phone
    if (screenWidth < 900) return 3; // Small tablet
    return 4; // Large tablet
  };

  // list of categories including the "add item"
  const extendedData = [...duaGroup, { id: "add_new", addCategory: true }];

  // renderItem
  const renderitems = ({ item }) => {
    //add category box
    if (item.addCategory) {
      return (
        <TouchableOpacity
          style={styles.progressCard}
          onPress={() => setIsOpen(true)}
        >
          <Ionicons name="add-outline" size={50} color={COLORS.primary} />
        </TouchableOpacity>
      );
    }

    // list of categories
    return (
      <TouchableOpacity
        style={styles.progressCard}
        onPress={() => router.push("/(dua)")}
      >
        <AppText weight="Medium" style={{ marginBottom: 15 }}>
          {item.name}
        </AppText>

        <AnimatedCircularProgress
          size={ProgressBarWidth}
          width={15}
          fill={item.progress}
          tintColor={COLORS.border}
          backgroundColor="#3d5875"
        >
          {(fill) => <Text>{item.progress}%</Text>}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.FlatListContainer}>
      <FlatList
        data={extendedData}
        renderItem={renderitems}
        showsVerticalScrollIndicator={false}
        numColumns={getNumColumns()}
        key={getNumColumns()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.FlatList}
        ListHeaderComponent={
          <View style={styles.header}>
            <AppText weight="Bold" style={styles.headerTitle}>
              My Dua
            </AppText>

            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Ionicons name="add-outline" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.progressCard}>
            <Ionicons name="add-outline" size={50} color={COLORS.primary} />
          </View>
        }
      />

      {/* POP UP MODAL */}
      <Modal isOpen={isOpen}>
        {/* MODAL CONTAINER */}
        <View style={styles.modalStyle}>
          {/* MODAL HEADER CONTAINER */}
          <View style={styles.modalHeader}>
            <AppText weight="Bold" style={{ fontSize: 18, marginBottom: 10 }}>
              Create a new category
            </AppText>
            {/* MODAL HEADER EXIT BURRON*/}
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons name="close-outline" size={28} color="red" />
            </TouchableOpacity>
          </View>

          {/* INPUT FIELD */}
          <InputField label="Name of Category" placeholder="Friday prayer" />

          {/* MODAL BUTTON */}
          <TouchableOpacity
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
            <AppText style={{ color: "white", fontSize: 13 }}>
              Create category
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default List;
