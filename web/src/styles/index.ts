import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { Drawer } from "./components/Drawer";

export const theme = extendTheme({
  styles,
  components: {
    Button,
    Link,
    Drawer,
  }
});
