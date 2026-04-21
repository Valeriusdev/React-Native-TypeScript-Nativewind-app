import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ className = "", children, ...props }: ViewProps) {
  return (
    <SafeAreaView className={`flex-1 bg-gradient-to-b from-blue-50 to-blue-100 ${className}`} {...props}>
      {children}
    </SafeAreaView>
  );
}
