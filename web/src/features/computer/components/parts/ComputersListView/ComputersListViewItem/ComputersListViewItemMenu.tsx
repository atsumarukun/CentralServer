import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugStop } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { LuTrash } from "react-icons/lu";
import { Computer } from "@/features/computer/computer";
import { RemoveComputerAlert } from "../../../modules/RemoveComputerAlert";

type Props = {
  computer: Computer;
};

export function ComputersListViewItemMenu({ computer }: Props) {
  const {
    isOpen: isRemoveComputerAlertOpen,
    onOpen: onRemoveComputerAlertOpen,
    onClose: onRemoveComputerAlertClose,
  } = useDisclosure();

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
        <MenuItem
          color="red.400"
          icon={<Icon as={LuTrash} boxSize={5} />}
          onClick={onRemoveComputerAlertOpen}
        >
          削除
        </MenuItem>
        <RemoveComputerAlert
          id={computer.id}
          hostName={computer.host_name}
          isOpen={isRemoveComputerAlertOpen}
          onClose={onRemoveComputerAlertClose}
        />
      </MenuList>
    </Menu>
  );
}
