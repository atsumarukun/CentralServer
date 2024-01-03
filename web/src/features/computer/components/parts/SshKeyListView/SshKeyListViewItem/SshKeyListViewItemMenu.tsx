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
import { MdEdit, MdMoreVert } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { SshKey } from "@/features/computer/types";
import { RemoveSshKeyAlert } from "../../../modules/RemoveSshKeyAlert";

type Props = {
  sshKey: SshKey;
};

export function SshKeyListViewItemMenu({ sshKey }: Props) {
  const {
    isOpen: isRemoveSshKeyAlertOpen,
    onOpen: onRemoveSshKeyAlertOpen,
    onClose: onRemoveSshKeyAlertClose,
  } = useDisclosure();

  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <HStack>
          <Icon as={MdMoreVert} boxSize={6} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<Icon as={MdEdit} boxSize={5} />}>再生成</MenuItem>
        <MenuDivider />
        <MenuItem
          color="red.400"
          icon={<Icon as={LuTrash} boxSize={5} />}
          onClick={onRemoveSshKeyAlertOpen}
        >
          削除
        </MenuItem>
        <RemoveSshKeyAlert
          id={sshKey.id}
          userName={sshKey.user_name}
          isOpen={isRemoveSshKeyAlertOpen}
          onClose={onRemoveSshKeyAlertClose}
        />
      </MenuList>
    </Menu>
  );
}
