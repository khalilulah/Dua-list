import styles from "@/assets/styles/textInput.styles";
import { BASE_URL } from "@/constants/api";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react"; // Add useRef
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";

const LibraryComponent = () => {
  const [duaLibrary, setDuaLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const categories = useCategoryStore((state) => state.categories);
  const addCategoryFromAPI = useCategoryStore(
    (state) => state.addCategoryFromAPI,
  );
  const [timeoutError, setTimeoutError] = useState(false);

  // Progress modal states
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [isDownloading, setIsDownloading] = useState(false);

  // Use ref instead of state for cancel flag - this captures the current value
  const cancelDownloadRef = useRef(false);

  //fetch data
  const fetchDua = async () => {
    setLoading(true);
    setTimeoutError(false);
    // Timeout handler
    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 50000);
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: {
          "Accept-Language": "en",
        },
      });
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch dhikr");
      const data = await response.json();
      console.log(data.data);
      setDuaLibrary(data.data);
    } catch (error) {
      console.log("error fetching dua", error);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  // invoke the fetch function
  useEffect(() => {
    fetchDua();
  }, []);

  console.log(categories);

  // Modified function to handle adding with progress tracking
  const handleAddWithProgress = async (itemId, categoryName) => {
    // Reset cancel flag using ref
    cancelDownloadRef.current = false;
    setProgress({ current: 0, total: 0 });
    setShowProgress(true);
    setIsDownloading(true);

    try {
      // Call the modified addCategoryFromAPI function
      const result = await addCategoryFromAPI(
        itemId,
        categoryName,
        "en",
        // Progress callback
        (current, total) => {
          setProgress({ current, total });
        },
        // Cancel check callback - return the current ref value
        () => cancelDownloadRef.current,
      );

      // Close progress modal
      setShowProgress(false);
      setIsDownloading(false);

      // Check if download was cancelled
      if (result.cancelled) {
        Alert.alert("Cancelled", "Download was cancelled");
        return;
      }

      // Check if successful
      if (result.success) {
        Alert.alert("Success", result.message, [
          {
            text: "OK",
            onPress: () => {
              // Navigate to tabs ONLY after user dismisses success alert
              router.replace("/(tabs)");
            },
          },
        ]);
      } else {
        Alert.alert("Error", result.error || "Failed to add category");
      }
    } catch (error) {
      setShowProgress(false);
      setIsDownloading(false);
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  const handleAdd = (itemId, categoryName) => {
    const compareCategoryName = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );
    console.log(itemId);
    console.log(categoryName);

    setIsOpen(true);
    Alert.alert("Add to category", "Do you want to add to Category?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Add",
        onPress: () => {
          if (!compareCategoryName) {
            handleAddWithProgress(itemId, categoryName);
          } else {
            Alert.alert("Existing Group", "The group already exists", [
              { text: "Cancel", style: "cancel" },
            ]);
          }
        },
      },
    ]);
  };

  const handleSelectedDhikr = (dhikrSlug) => {
    router.push(`/(library)?prayerSlug=${dhikrSlug}`);
  };

  // Handle cancel button press - set ref value to true
  const handleCancelDownload = () => {
    Alert.alert(
      "Cancel Download",
      "Are you sure you want to cancel the download?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            // Set the ref value to true to signal cancellation
            cancelDownloadRef.current = true;
            console.log("Cancel flag set to true");
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectedDhikr(item.slug, item.name)}
      style={styles.libraryContainer}
    >
      {console.log(item)}
      <View
        style={{
          alignSelf: "center",
          width: "70%",
        }}
      >
        <AppText
          weight="Regular"
          style={{
            color: COLORS.primary,
            textTransform: "capitalize",
            marginBottom: 5,
          }}
        >
          {item.slug}
        </AppText>
        <AppText
          weight="Regular"
          style={{ color: COLORS.primary, fontSize: 14 }}
        >
          <AppText
            weight="ExtraBold"
            style={{ color: COLORS.primary, fontSize: 14 }}
          >
            Number of dua:
          </AppText>{" "}
          {item.total}
        </AppText>
      </View>
      <TouchableOpacity
        style={styles.progressCard}
        onPress={() => handleAdd(item.slug, item.name)}
      >
        <Ionicons
          name="add-outline"
          size={25}
          color={COLORS.Secondary}
          style={{
            borderRadius: 17.5,
            alignItems: "center",
            backgroundColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <AppText
        weight="ExtraBold"
        style={{ color: COLORS.primary, fontSize: 14 }}
      >
        this might take a minute Loading...
      </AppText>
    );
  if (timeoutError) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text style={{ marginBottom: 10 }}>
          Failed to fetch data. Please check your connection.
        </Text>
        <Button title="Reload" onPress={fetchDua} />
      </View>
    );
  }
  if (!duaLibrary.length) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text>No data available.</Text>
        <Button title="Reload" onPress={fetchDua} />
      </View>
    );
  }

  return (
    <View>
      <FlatList data={duaLibrary} renderItem={renderItem} />

      {/* Progress Modal */}
      <Modal
        visible={showProgress}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          // Prevent closing modal by back button during download
          if (!isDownloading) {
            setShowProgress(false);
          }
        }}
      >
        <View style={progressStyles.overlay}>
          <View style={progressStyles.modalContainer}>
            <AppText style={progressStyles.title}>Downloading Duas</AppText>

            <View style={progressStyles.progressContainer}>
              <Text style={progressStyles.progressText}>
                {progress.current} of {progress.total}
              </Text>

              {/* Progress Bar */}
              <View style={progressStyles.progressBarBackground}>
                <View
                  style={[
                    progressStyles.progressBarFill,
                    {
                      width:
                        progress.total > 0
                          ? `${(progress.current / progress.total) * 100}%`
                          : "0%",
                    },
                  ]}
                />
              </View>

              {/* Percentage */}
              <Text style={progressStyles.percentageText}>
                {progress.total > 0
                  ? Math.round((progress.current / progress.total) * 100)
                  : 0}
                %
              </Text>
            </View>

            {/* Loading Spinner */}
            {isDownloading && (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={progressStyles.spinner}
              />
            )}

            {/* Cancel Button */}
            <TouchableOpacity
              style={progressStyles.cancelButton}
              onPress={handleCancelDownload}
              disabled={!isDownloading}
            >
              <Text style={progressStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Progress Modal Styles
const progressStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary || "#333",
  },
  progressContainer: {
    width: "100%",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  progressBarBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary || "#4CAF50",
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary || "#333",
  },
  spinner: {
    marginVertical: 15,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#FF5252",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LibraryComponent;
