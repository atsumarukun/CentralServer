import {
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetComputer } from "../hooks/request";
import { LoadingSpinner } from "@/components/parts/LoadingSpinner";
import { ErrorStatus } from "@/components/parts/ErrorStatus";
import { MdEdit, MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { EditComputerModal } from "../components/modules/EditComputerModal";
import { SshKeyListView } from "../components/parts/SshKeyListView";

type Props = {
  id: number;
};

export function ComputerIdIndexPage({ id }: Props) {
  const { loading, error, data } = useGetComputer({
    input: {
      id: id,
    },
  });

  const {
    isOpen: isEditComputerModalOpen,
    onOpen: onEditComputerModalOpen,
    onClose: onEditComputerModalClose,
  } = useDisclosure();

  if (loading) return <LoadingSpinner />;
  if (error || !data)
    return (
      <ErrorStatus
        icon={MdOutlineDesktopAccessDisabled}
        message="コンピュータの取得に失敗しました."
      />
    );

  return (
    <Stack spacing={6} m={6}>
      <HStack justifyContent="flex-end">
        <Button variant="rounded" onClick={onEditComputerModalOpen}>
          <Icon as={MdEdit} boxSize={6} mr={2} />
          編集
        </Button>
        <EditComputerModal
          computer={data}
          isOpen={isEditComputerModalOpen}
          onClose={onEditComputerModalClose}
        />
      </HStack>
      <Grid
        rounded={8}
        p={6}
        pr={{ base: 6, md: 14 }}
        bgColor="blackAlpha.400"
        boxShadow="0 1rem 2rem hsl(0 0% 50% / 25%)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
      >
        <GridItem fontWeight="bold" colSpan={2}>
          ホスト名
        </GridItem>
        <GridItem colSpan={3}>{data.host_name}</GridItem>
        <GridItem fontWeight="bold" colSpan={2}>
          IPアドレス
        </GridItem>
        <GridItem colSpan={3}>{data.ip_address}</GridItem>
        <GridItem fontWeight="bold" colSpan={2}>
          MACアドレス
        </GridItem>
        <GridItem colSpan={3}>{data.mac_address}</GridItem>
      </Grid>
      {data.ssh_keys && <SshKeyListView sshKeys={data.ssh_keys} />}
    </Stack>
  );
}
