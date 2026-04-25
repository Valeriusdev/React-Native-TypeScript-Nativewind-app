import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Body, Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import { Alert, View } from "react-native";

export default function ProfileScreen() {
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
    <Screen className="justify-center px-6">
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        <Title className="mb-2">Profile</Title>
        <Subtitle className="mb-8">Basic account details</Subtitle>

        <View className="gap-4">
          <View>
            <Subtitle className="mb-1">Email</Subtitle>
            <Body>{session?.user.email ?? "No email available"}</Body>
          </View>

          <View>
            <Subtitle className="mb-1">Status</Subtitle>
            <Body>{session ? "Signed in" : "Signed out"}</Body>
          </View>
        </View>

        <Button className="mt-8" onPress={handleLogout} label="Log Out" />
        <Link href="/" className="mt-8 text-blue-600 font-semibold">
          Back to Home
        </Link>
      </View>
    </Screen>
  );
}