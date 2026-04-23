import { Text, TextInput, View, type TextInputProps } from "react-native";

type FormInputProps = TextInputProps & { label: string };

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <View className={label === "Password" ? "mb-6" : "mb-5"}>
      <Text className="text-gray-700 font-semibold mb-2">{label}</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}
