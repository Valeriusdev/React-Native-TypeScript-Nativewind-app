import { useAuth } from "@/contexts/AuthContext";
import { Text, View } from "react-native";

export default function About() {
  const { session } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>About page</Text>
      {session ? <Text>{session.user.email}</Text> : null}
    </View>
  );
}