import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AppText from "./AppText";

const STORAGE_KEY = "DAILY_HADITH";

const DailyHadith = ({ data }) => {
  const [hadith, setHadith] = useState(null);

  useEffect(() => {
    const loadDailyHadith = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const today = new Date().toDateString();

        if (stored) {
          const { date, index } = JSON.parse(stored);

          // Same day → reuse hadith
          if (date === today) {
            setHadith(data[index]);
            return;
          }
        }

        // New day → pick next (or random)
        const newIndex = stored
          ? (JSON.parse(stored).index + 1) % data.length
          : 0;

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            date: today,
            index: newIndex,
          }),
        );

        setHadith(data[newIndex]);
      } catch (error) {
        console.error("DailyHadith error:", error);
      }
    };

    loadDailyHadith();
  }, [data]);

  if (!hadith) return null;

  return (
    <>
      <View
        pointerEvents="none" // 👈 prevents blocking touches
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.primary,
        }}
      >
        <Ionicons
          name="moon-outline"
          size={160}
          color="white"
          style={{
            position: "absolute",
            top: -30,
            right: -40,
            opacity: 0.08,
          }}
        />

        <Ionicons
          name="book-outline"
          size={140}
          color="white"
          style={{
            position: "absolute",
            top: 180,
            left: -30,
            opacity: 0.06,
          }}
        />
        <Ionicons
          name="star-outline"
          size={140}
          color="white"
          style={{
            position: "absolute",
            top: 50,
            left: "25%",
            opacity: 0.06,
          }}
        />
      </View>
      <View
        style={{
          padding: 20,
          borderRadius: 24,

          backgroundColor: "#04312e",
        }}
      >
        <AppText
          weight="Bold"
          style={{ fontSize: 16, color: "white", marginBottom: 15 }}
        >
          Daily Hadith
        </AppText>
        <AppText
          weight="Bold"
          style={{ marginBottom: 6, color: COLORS.Secondary }}
        >
          {hadith.narrator}
        </AppText>

        <AppText
          style={{
            fontSize: 14,
            marginBottom: 8,
            opacity: 0.7,
            color: COLORS.textSecondary,
            marginBottom: 10,
          }}
        >
          {hadith.translation}
        </AppText>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <AppText
            weight="Bold"
            style={{ fontSize: 12, color: COLORS.Secondary }}
          >
            Reference :{" "}
          </AppText>
          <AppText
            style={{ fontSize: 12, opacity: 0.6, color: COLORS.Secondary }}
          >
            {hadith.reference}
          </AppText>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <AppText
            weight="Bold"
            style={{ fontSize: 12, color: COLORS.Secondary }}
          >
            In-book reference :{" "}
          </AppText>
          <AppText
            style={{ fontSize: 12, opacity: 0.6, color: COLORS.Secondary }}
          >
            {hadith.InBookReference}
          </AppText>
        </View>
      </View>
    </>
  );
};

export default DailyHadith;
