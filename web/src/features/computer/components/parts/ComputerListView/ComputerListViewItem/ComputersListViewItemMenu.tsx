import {
  Button,
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
import { Computer } from "@/features/computer/types";
import { RemoveComputerAlert } from "../../../modules/RemoveComputerAlert";
import {
  GetComputers,
  useRebootComputer,
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

  const [wol, { loading: wolLoading }] = useWakeOnLanComputer({
    id: computer.id,
    onCompleted: () => {
      successToast({
        title: "起動しました",
      });
      setLoading(wolLoading);
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
      setLoading(wolLoading);
    },
    refetchRequests: [GetComputers],
  });

  const [reboot, { loading: rebootLoading }] = useRebootComputer({
    id: computer.id,
    onCompleted: () => {
      successToast({
        title: "再起動しました",
      });
      setLoading(rebootLoading);
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
      setLoading(rebootLoading);
    },
    refetchRequests: [GetComputers],
  });

  const handleWakeOnLan = () => {
    setLoading(wolLoading);
    wol();
  };

  const handleReboot = () => {
    setLoading(rebootLoading);
    reboot();
  };

  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <Icon as={MdMoreVert} boxSize={6} />
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
        <MenuItem
          icon={<Icon as={VscDebugRestart} boxSize={5} />}
          onClick={handleReboot}
        >
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
