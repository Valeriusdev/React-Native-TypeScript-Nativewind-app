import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, login, logout } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing information", "Enter both email and password.");
      return;
    }

    try {
      await login(email);
      setEmail("");
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log in right now.";
      Alert.alert("Login failed", message);
    }
  };

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
        <Title className="mb-2 text-center">Welcome Back APP</Title>
        {session ? (
          <>
            <Subtitle className="text-center mb-8">{session.user.email}</Subtitle>
            <Button onPress={handleLogout} label="Log Out" />
          </>
        ) : (
          <>
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
          </>
        )}

        <Link href="/about">About</Link>
      </View>
    </Screen>
  );
}