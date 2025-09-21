import styles from "@/assets/styles/singlePrayer.styles";
import AppText from "@/components/AppText";
import { Dimensions, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Customize button size for clamping
const BUTTON_SIZE = 80; // adjust to match styles.counterButton dimensions

const MovableCounterButton = ({
  currentPrayer,
  handleCounterPress,
  handleLongPress,
}) => {
  // Keep track of absolute position
  const x = useSharedValue(SCREEN_WIDTH - BUTTON_SIZE); // starting X position
  const y = useSharedValue(SCREEN_HEIGHT - BUTTON_SIZE * 2); // starting Y position

  // Store the position when gesture starts
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // Create the drag gesture
  const dragGesture = Gesture.Pan()
    .onStart(() => {
      // calculate new position
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      // Calculate new position from start + translation
      const newX = startX.value + event.translationX;
      const newY = startY.value + event.translationY;

      // Clamp within screen bounds
      const minX = 0;
      const maxX = SCREEN_WIDTH - BUTTON_SIZE;
      const minY = 0;
      const maxY = SCREEN_HEIGHT - BUTTON_SIZE;

      x.value = Math.max(minX, Math.min(newX, maxX));
      y.value = Math.max(minY, Math.min(newY, maxY));
    })
    .onEnd(() => {
      // Optional: snap back to origin
      x.value = withSpring(x.value);
      y.value = withSpring(y.value);
    });

  // Animated style for position
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[{ position: "absolute" }, animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.counterButton,
            { width: BUTTON_SIZE, height: BUTTON_SIZE },
          ]}
          onPress={handleCounterPress}
          onLongPress={handleLongPress}
          activeOpacity={0.8}
        >
          <AppText weight="Bold" style={styles.counterButtonText}>
            {currentPrayer?.currentCount || 0}
          </AppText>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default MovableCounterButton;
