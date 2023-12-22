import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
    fontWeight: "normal",
  },
  body: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
  },
  footer: {
    color: "rgb(255, 255, 255)",
    bgColor: "rgb(53, 53, 53)",
  },
});

export const Modal = defineMultiStyleConfig({
  baseStyle,
});