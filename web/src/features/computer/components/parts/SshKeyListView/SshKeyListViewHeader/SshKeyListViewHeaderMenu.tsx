import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

export function SshKeyListViewHeaderMenu() {
  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <HStack>
          <Icon as={MdMoreVert} boxSize={6} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<Icon as={FiPlus} boxSize={5} />}>登録</MenuItem>
      </MenuList>
    </Menu>
  );
}
