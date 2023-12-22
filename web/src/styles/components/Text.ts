import { TextProps, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const error = defineStyle<TextProps>({
  color: "red.400",
});

const menu = defineStyle<TextProps>({
  borderRadius: 8,
  px: 4,
  py: 2,
  _hover: {
    bgColor: "whiteAlpha.300",
  }
})

export const Text = defineStyleConfig({
  variants: {
    menu,
    error,
  }
});
