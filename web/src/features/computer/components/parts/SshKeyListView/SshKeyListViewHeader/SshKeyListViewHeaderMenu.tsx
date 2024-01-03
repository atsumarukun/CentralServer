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
import { GenerateSshKeyModal } from "../../../modules/GenerateSshKeyModal";

type Props = {
  computer_id: number;
  setPublicKey?: (publicKey?: string) => void;
};

export function SshKeyListViewHeaderMenu({ computer_id, setPublicKey }: Props) {
  const {
    isOpen: isGenerateSshKeyModalOpen,
    onOpen: onGenerateSshKeyModalOpen,
    onClose: onGenerateSshKeyModalClose,
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
          onClick={onGenerateSshKeyModalOpen}
          isDisabled={!setPublicKey}
        >
          生成
        </MenuItem>
        {setPublicKey && (
          <GenerateSshKeyModal
            computer_id={computer_id}
            isOpen={isGenerateSshKeyModalOpen}
            onClose={onGenerateSshKeyModalClose}
            setPublicKey={setPublicKey}
          />
        )}
      </MenuList>
    </Menu>
  );
}
