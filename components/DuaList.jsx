import styles from "@/assets/styles/duaList.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import BottomSheets from "./BottomSheet";
const duaList = [
  {
    title: "Al-Fateha",
    amoutOfTimes: 1,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "forgiveness",
    amoutOfTimes: 1,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "protection",
    amoutOfTimes: 1,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "Ayatal Kursi",
    amoutOfTimes: 1,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "Alif Laam Meem",
    amoutOfTimes: 1,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "Al Iklas",
    amoutOfTimes: 3,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
  {
    title: "Laa ik'raaha fid-deen",
    amoutOfTimes: 5,
    ArabicText: "",
    translation: "",
    translitration: "",
  },
];
const extendedList = [...duaList, { id: "add_new", addCategory: true }];

const DuaList = () => {
  const [bottomForm, setBottomForm] = useState(false);
  const renderitems = ({ item }) => {
    //add dua box
    if (item.addCategory) {
      return (
        <TouchableOpacity
          style={styles.addDua}
          onPress={() => setBottomForm(true)}
        >
          <Ionicons name="add-circle-outline" size={25} color={"black"} />
          <AppText weight="Bold" style={{ marginLeft: 5, marginBottom: 5 }}>
            Add Dua
          </AppText>
        </TouchableOpacity>
      );
    }

    // list of dua
    return (
      <TouchableOpacity style={styles.item}>
        <AppText weight="Medium" style={{ marginBottom: 15 }}>
          {item.title}
        </AppText>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.primary}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.FlatListContainer}>
        <View style={styles.listHeader}>
          <AppText weight="Bold" style={{}}>
            Name of category
          </AppText>
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={extendedList}
          renderItem={renderitems}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          contentContainerStyle={styles.flatListStyle}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={{}}>
              <Ionicons name="add-outline" size={50} color={COLORS.primary} />
            </View>
          }
        />
      </View>

      {bottomForm && (
        <BottomSheets>
          <AppText>Create a new Dua</AppText>
        </BottomSheets>
      )}
    </>
  );
};

export default DuaList;
