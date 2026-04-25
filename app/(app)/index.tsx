import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import { Alert, View } from "react-native";

export default function Index() {
  const { session, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log out right now.";
      Alert.alert("Logout failed", message);
    }
  };

  return (
    <Screen className="justify-center items-center px-6">
      {/* Container */}
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <Title className="mb-2 text-center">Welcome Back</Title>

        <Subtitle className="text-center mb-8">{session?.user.email}</Subtitle>
        <Link href="/profile" className="text-center text-blue-600 font-semibold mb-4">
          View Profile
        </Link>
        <Button onPress={handleLogout} label="Log Out" />

        <Link href="/about">About</Link>
      </View>
    </Screen>
  );
}