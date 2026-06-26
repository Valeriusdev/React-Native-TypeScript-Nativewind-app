import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useFriends, useUser } from "@/db/queries";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Index() {
  const { logout } = useAuth();
  const { data: user, isLoading } = useUser();
  const { data: friends } = useFriends();
  const [friendId, setFriendId] = useState("");

  console.log("user", user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log out right now.";
      Alert.alert("Logout failed", message);
    }
  };

  if (isLoading) {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Loading</Title>
      </Screen>
    );
  }

  if (!user) {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>No user found</Title>
      </Screen>
    );
  }

  return (
    <Screen className="justify-center items-center px-6">
      {/* Container */}
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <Title className="mb-2 text-center">Welcome Back, {user.name}</Title>

        <Subtitle className="text-center mb-8">{user.email}</Subtitle>
        <Subtitle className="text-center mb-4">Friends: {friends?.length ?? 0}</Subtitle>
        <Link href="/profile" className="text-center mb-4">
          View Profile
        </Link>
        <View className="mb-4">
          <FormInput
            label="Friend ID"
            placeholder="Friend user ID"
            value={friendId}
            onChangeText={setFriendId}
            autoCapitalize="none"
          />
          <Button label="Add Friend" />
        </View>
        <Button onPress={handleLogout} label="Log Out" />

        <Link href="/about">About</Link>
      </View>
    </Screen>
  );
}