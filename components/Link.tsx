import { Link as ExpoLink, type LinkProps } from "expo-router";

type Props = LinkProps & {
  className?: string;
};

export function Link({ className = "", ...props }: Props) {
  return <ExpoLink className={`text-blue-600 font-semibold ${className}`} {...props} />;
}