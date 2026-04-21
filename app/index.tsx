import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login delay
    setLoading(false);
    Alert.alert("Success", `Logged in as ${email}`);
    setEmail("");
    setPassword("");
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
          editable={!loading}
        />

        {/* Password Input */}
        <FormInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        {/* Login Button */}
        <Button onPress={handleLogin} disabled={loading} label={loading ? "Signing in..." : "Sign In"} />
      </View>
    </Screen>
  );
}
