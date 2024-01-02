import { ButtonProps, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const unstyle = defineStyle<ButtonProps>({
  bgColor: "transparent",
  color: "primary",
  fontWeight: "normal",
  borderRadius: 0,
  p: 0
})

const rounded = defineStyle<ButtonProps>({
  bgColor: "blackAlpha.400",
  color: "white",
  rounded: 20,
  fontWeight: "normal",
  _hover: {
    bgColor: "whiteAlpha.300"
  }
})

export const Button = defineStyleConfig({
  variants: {
    unstyle,
    rounded,
  }
})
