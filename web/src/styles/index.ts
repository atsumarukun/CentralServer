import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { Button } from "./components/Button"

export const theme = extendTheme({
  styles,
  components: {
    Button,
  }
});
