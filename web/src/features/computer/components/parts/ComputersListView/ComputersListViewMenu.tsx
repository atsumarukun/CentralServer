import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugStop } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { LuTrash } from "react-icons/lu";

export function ComputersListViewMenu() {
  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <HStack>
          <Icon as={MdMoreVert} boxSize={6} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<Icon as={VscDebugStart} boxSize={5} />}>起動</MenuItem>
        <MenuItem icon={<Icon as={VscDebugStop} boxSize={5} />} isDisabled>
          停止
        </MenuItem>
        <MenuItem icon={<Icon as={VscDebugRestart} boxSize={5} />} isDisabled>
          再起動
        </MenuItem>
        <MenuDivider />
        <MenuItem color="red.400" icon={<Icon as={LuTrash} boxSize={5} />}>
          削除
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
