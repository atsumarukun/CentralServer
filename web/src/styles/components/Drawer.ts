import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    fontWeight: "normal",
    p: 0
  },
  body: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    p: 0
  },
  footer: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    p: 0
  }
});

export const Drawer = defineMultiStyleConfig({
  baseStyle
});
