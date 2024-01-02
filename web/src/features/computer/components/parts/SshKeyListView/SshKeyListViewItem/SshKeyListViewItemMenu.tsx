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
import { MdEdit, MdMoreVert } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { SshKey } from "@/features/computer/types";

type Props = {
  sshKey: SshKey;
};

export function SshKeyListViewItemMenu({ sshKey }: Props) {
  console.log(sshKey);

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
        <MenuItem color="red.400" icon={<Icon as={LuTrash} boxSize={5} />}>
          削除
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
