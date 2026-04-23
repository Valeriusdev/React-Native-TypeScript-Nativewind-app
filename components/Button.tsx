import { Pressable, Text, type PressableProps } from "react-native";

type ButtonProps = PressableProps & {
  className?: string;
  label?: string;
};

export function Button({ className = "", disabled, label, children, ...props }: ButtonProps) {
  return (
    <Pressable
      className={`w-full py-3 rounded-lg flex items-center justify-center ${disabled ? "bg-blue-400" : "bg-blue-600"} ${className}`}
      disabled={disabled}
      {...props}
    >
      {label ? <Text className="text-white font-bold text-lg">{label}</Text> : children}
    </Pressable>
  );
}
