import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing information", "Enter both email and password.");
      return;
    }

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log in right now.";
      Alert.alert("Login failed", message);
    }
  };

  const fetchMovies = async () => {
    let { data: movies, error } = await supabase.from("movies").select("*");
    console.log(movies, error);
  };

  return (
    <Screen className="justify-center items-center px-6">
      {/* Container */}
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <Title className="mb-2 text-center">Welcome Back</Title>

        <Subtitle className="text-center mb-8">Sign in to your account</Subtitle>

        {/* Email Input */}
        <FormInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="sentences"
        />

        {/* Password Input */}
        <FormInput label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />

        {/* Login Button */}
        <Button onPress={handleLogin} label="Sign In" />
        <Button onPress={fetchMovies} label="fetch movies" />

        <View className="mt-4 items-center">
          <Link href="/signup">Create an account</Link>
        </View>

        <Link href="/about">About</Link>
      </View>
    </Screen>
  );
}