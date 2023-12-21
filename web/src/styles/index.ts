import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { Drawer } from "./components/Drawer";
import { Menu } from "./components/Menu";

export const theme = extendTheme({
  styles,
  components: {
    Button,
    Link,
    Drawer,
    Menu,
  }
});
