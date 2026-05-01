import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Link } from "@/components/Link";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing information", "Enter your name, email, and password.");
      return;
    }

    try {
      await signup(email, password, name);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign up right now.";
      Alert.alert("Signup failed", message);
    }
  };

  return (
    <Screen className="justify-center items-center px-6">
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        <Title className="mb-2 text-center">Create Account</Title>

        <Subtitle className="text-center mb-8">Sign up to get started</Subtitle>

        <FormInput label="Name" placeholder="Your name" value={name} onChangeText={setName} autoCapitalize="words" />

        <FormInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />

        <Button onPress={handleSignup} label="Sign Up" />

        <View className="mt-4 items-center">
          <Link href="/">Back to sign in</Link>
        </View>
      </View>
    </Screen>
  );
}