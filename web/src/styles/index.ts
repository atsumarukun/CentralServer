import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { Drawer } from "./components/Drawer";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { Text } from "./components/Text";

export const theme = extendTheme({
  styles,
  components: {
    Button,
    Link,
    Drawer,
    Menu,
    Modal,
    Text,
  }
});
