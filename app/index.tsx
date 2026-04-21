import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", `Logged in as ${email}`);
      // Reset form
      setEmail("");
      setPassword("");
    }, 1500);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 justify-center items-center px-6">
      {/* Container */}
      <View className="w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</Text>
        <Text className="text-gray-500 text-center mb-8">Sign in to your account</Text>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Email</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="you@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Password</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="••••••••"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-lg flex items-center justify-center ${loading ? "bg-blue-400" : "bg-blue-600"}`}
        >
          <Text className="text-white font-bold text-lg">{loading ? "Signing in..." : "Sign In"}</Text>
        </Pressable>

        {/* Forgot Password Link */}
        <Pressable className="mt-4">
          <Text className="text-center text-blue-600 font-semibold">Forgot Password?</Text>
        </Pressable>

        {/* Sign Up Link */}
        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-600">Don&apos;t have an account? </Text>
          <Pressable>
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
