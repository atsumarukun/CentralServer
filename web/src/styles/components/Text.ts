import { TextProps, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const error = defineStyle<TextProps>({
  color: "red.400",
});

export const Text = defineStyleConfig({
  variants: {
    error,
  }
});
