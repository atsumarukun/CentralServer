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
import { RegenerateSshKeyAlert } from "../../../modules/RegenerateSshKeyAlert";

type Props = {
  sshKey: SshKey;
  setPublicKey?: (publicKey?: string) => void;
};

export function SshKeyListViewItemMenu({ sshKey, setPublicKey }: Props) {
  const {
    isOpen: isRegenerateSshKeyAlertOpen,
    onOpen: onRegenerateSshKeyAlertOpen,
    onClose: onRegenerateSshKeyAlertClose,
  } = useDisclosure();
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
        <MenuItem
          icon={<Icon as={MdEdit} boxSize={5} />}
          onClick={onRegenerateSshKeyAlertOpen}
          isDisabled={!setPublicKey}
        >
          再生成
        </MenuItem>
        {setPublicKey && (
          <RegenerateSshKeyAlert
            id={sshKey.id}
            userName={sshKey.user_name}
            isOpen={isRegenerateSshKeyAlertOpen}
            onClose={onRegenerateSshKeyAlertClose}
            setPublicKey={setPublicKey}
          />
        )}
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
