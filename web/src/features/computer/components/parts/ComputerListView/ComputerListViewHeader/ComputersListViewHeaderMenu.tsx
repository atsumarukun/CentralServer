import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { CreateComputerModal } from "../../../modules/CreateComputerModal";

export function ComputerListViewHeaderMenu() {
  const {
    isOpen: isCreateComputerModalOpen,
    onOpen: onCreateComputerModalOpen,
    onClose: onCreateComputerModalClose,
  } = useDisclosure();

  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <HStack>
          <Icon as={MdMoreVert} boxSize={6} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<Icon as={FiPlus} boxSize={5} />}
          onClick={onCreateComputerModalOpen}
        >
          登録
        </MenuItem>
        <CreateComputerModal
          isOpen={isCreateComputerModalOpen}
          onClose={onCreateComputerModalClose}
        />
      </MenuList>
    </Menu>
  );
}
