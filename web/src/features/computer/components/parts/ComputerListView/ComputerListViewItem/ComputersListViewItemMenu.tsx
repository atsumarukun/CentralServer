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
  useShutdownComputer,
  useWakeOnLanComputer,
} from "@/features/computer/hooks/request";
import { useActionToast } from "@/hooks/toast";
import { LoadingSpinner } from "@/components/parts/LoadingSpinner";

type Props = {
  computer: Computer;
};

export function ComputerListViewItemMenu({ computer }: Props) {
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
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputers],
  });

  const [shutdown, { loading: shutdownLoading }] = useShutdownComputer({
    id: computer.id,
    onCompleted: () => {
      successToast({
        title: "停止しました",
      });
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputers],
  });

  const [reboot, { loading: rebootLoading }] = useRebootComputer({
    id: computer.id,
    onCompleted: () => {
      successToast({
        title: "再起動しました",
      });
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputers],
  });

  if (wolLoading || shutdownLoading || rebootLoading)
    return (
      <>
        <Button size="xs" variant="unstyle">
          <Icon as={MdMoreVert} boxSize={6} />
        </Button>
        <LoadingSpinner />
      </>
    );

  return (
    <Menu>
      <MenuButton as={Button} size="xs" variant="unstyle">
        <Icon as={MdMoreVert} boxSize={6} />
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<Icon as={VscDebugStart} boxSize={5} />}
          onClick={() => wol()}
        >
          起動
        </MenuItem>
        <MenuItem
          icon={<Icon as={VscDebugStop} boxSize={5} />}
          onClick={() => shutdown()}
        >
          停止
        </MenuItem>
        <MenuItem
          icon={<Icon as={VscDebugRestart} boxSize={5} />}
          onClick={() => reboot()}
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
