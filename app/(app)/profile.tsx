import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Body, Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertMovie } from "@/db/mutations";
import { useMovies } from "@/db/queries";

import { Alert, View } from "react-native";

export default function ProfileScreen() {
  const { session, logout } = useAuth();

  const { data } = useMovies();
  const { mutateAsync } = useInsertMovie();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to log out right now.";
      Alert.alert("Logout failed", message);
    }
  };

  const insertMovie = async () => {
    try {
      await mutateAsync({
        name: "Movie title",
        description: "Movie description",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to insert movie right now.";
      Alert.alert("Insert failed", message);
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

          <View>
            <Subtitle className="mb-1">Movies</Subtitle>
            <Body>
              {data?.length === null
                ? "Loading movies..."
                : `${data?.length} movies`}
            </Body>
          </View>
        </View>

        <Button className="mt-8" onPress={insertMovie} label="insert movie" />
        <Button className="mt-8" onPress={handleLogout} label="Log Out" />
        <Link href="/" className="mt-8">
          Back to Home
        </Link>
      </View>
    </Screen>
  );
}
