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
import {
  GetComputers,
  useWakeOnLanComputer,
} from "@/features/computer/hooks/request";
import { useActionToast } from "@/hooks/toast";

type Props = {
  computer: Computer;
  setLoading: (loading: boolean) => void;
};

export function ComputerListViewItemMenu({ computer, setLoading }: Props) {
  const { successToast, errorToast } = useActionToast();

  const {
    isOpen: isRemoveComputerAlertOpen,
    onOpen: onRemoveComputerAlertOpen,
    onClose: onRemoveComputerAlertClose,
  } = useDisclosure();

  const [wol, { loading }] = useWakeOnLanComputer({
    id: computer.id,
    onCompleted: () => {
      successToast({
        title: "起動しました",
      });
      setLoading(loading);
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputers],
  });

  const handleWakeOnLan = () => {
    setLoading(loading);
    wol();
  };

  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <HStack>
          <Icon as={MdMoreVert} boxSize={6} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<Icon as={VscDebugStart} boxSize={5} />}
          onClick={handleWakeOnLan}
        >
          起動
        </MenuItem>
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
