import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    border: "none",
    boxShadow: "0 1rem 2rem hsl(0 0% 0% / 75%)"
  },
  item: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    _hover: {
      bgColor: "whiteAlpha.300",
    }
  }
})

export const Menu = defineMultiStyleConfig({
  baseStyle,
})
