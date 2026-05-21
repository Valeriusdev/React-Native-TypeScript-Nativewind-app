import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertMovie } from "@/db/mutations";
import { useMovies } from "@/db/queries";
import { Alert, View } from "react-native";

export default function Index() {
  const { session, logout } = useAuth();

  const { data } = useMovies();
  const { mutateAsync } = useInsertMovie();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log out right now.";
      Alert.alert("Logout failed", message);
    }
  };

  const insertMovie = async () => {
    try {
      await mutateAsync({ name: "Movie title", description: "Movie description" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to insert movie right now.";
      Alert.alert("Insert failed", message);
    }
  };

  return (
    <Screen className="justify-center items-center px-6">
      {/* Container */}
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <Title className="mb-2 text-center">Welcome Back, {session?.user.user_metadata.name}</Title>

        <Subtitle className="text-center mb-8">{session?.user.email}</Subtitle>
        <Subtitle className="text-center mb-4">{data === null ? "Loading movies..." : `${data?.length} movies`}</Subtitle>
        <Link href="/profile" className="text-center mb-4">
          View Profile
        </Link>
        <Button onPress={insertMovie} label="insert movie" />
        <Button onPress={handleLogout} label="Log Out" />

        <Link href="/about">About</Link>
      </View>
    </Screen>
  );
}