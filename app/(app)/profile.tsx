import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Body, Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { addMovie, getMovies } from "@/db/movies";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function ProfileScreen() {
  const { session, logout } = useAuth();
  const [movieCount, setMovieCount] = useState<number | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to log out right now.";
      Alert.alert("Logout failed", message);
    }
  };

  const loadMovies = async () => {
    try {
      const movies = await getMovies();
      setMovieCount(movies.length);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to fetch movies right now.";
      Alert.alert("Fetch failed", message);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const insertMovie = async () => {
    try {
      await addMovie("Movie Title", "Movie description");
      await loadMovies();
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
              {movieCount === null
                ? "Loading movies..."
                : `${movieCount} movies`}
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
