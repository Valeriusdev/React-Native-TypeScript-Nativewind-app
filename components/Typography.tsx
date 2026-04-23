import { Text, type TextProps } from "react-native";

type TypographyProps = TextProps;

export function Title({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-3xl font-bold text-gray-800 ${className}`} {...props} />;
}

export function Subtitle({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-base text-gray-500 ${className}`} {...props} />;
}

export function Body({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-sm text-gray-700 ${className}`} {...props} />;
}

export function Label({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-gray-700 font-semibold mb-2 ${className}`} {...props} />;
}
