import { ButtonProps, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const unstyle = defineStyle<ButtonProps>({
  bg: "transparent",
  color: "primary",
  fontWeight: "normal",
  borderRadius: 0,
  p: 0
})

export const Button = defineStyleConfig({
  variants: {
    unstyle,
  }
})
