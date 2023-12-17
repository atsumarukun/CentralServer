import { LinkProps, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle<LinkProps>({
  _hover: {
    textDecoration: "none"
  }
})

const menu = defineStyle<LinkProps>({
  borderRadius: 8,
  px: 4,
  py: 2,
  _hover: {
    bgColor: "whiteAlpha.300",
  }
})

export const Link = defineStyleConfig({
  baseStyle,
  variants: {
    menu
  }
})
