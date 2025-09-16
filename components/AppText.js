import { Text } from "react-native";

export default function AppText({
  children,
  style,
  weight = "Regular",
  ...props
}) {
  // Map weight prop to your loaded fonts
  const fontMap = {
    Regular: "Jakarta-Regular",
    Medium: "Jakarta-Medium",
    SemiBold: "Jakarta-SemiBold",
    Bold: "Jakarta-Bold",
    ExtraBold: "Jakarta-ExtraBold",
    Light: "Jakarta-Light",
    ExtraLight: "Jakarta-ExtraLight",
  };

  return (
    <Text
      {...props}
      style={[
        { fontFamily: fontMap[weight], fontSize: 16, color: "#000" },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
