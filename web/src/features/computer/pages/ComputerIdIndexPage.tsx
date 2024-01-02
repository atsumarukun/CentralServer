import { Grid, GridItem, Stack } from "@chakra-ui/react";
import { useGetComputer } from "../hooks/request";
import { LoadingSpinner } from "@/components/parts/LoadingSpinner";
import { ErrorStatus } from "@/components/parts/ErrorStatus";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

type Props = {
  id: number;
};

export function ComputerIdIndexPage({ id }: Props) {
  const { loading, error, data } = useGetComputer({ id: id });

  if (loading) return <LoadingSpinner />;
  if (error || !data)
    return (
      <ErrorStatus
        icon={MdOutlineDesktopAccessDisabled}
        message={"コンピュータの取得に失敗しました."}
      />
    );

  return (
    <Stack spacing={6} m={6}>
      <Grid
        rounded={8}
        p={6}
        bgColor="blackAlpha.400"
        boxShadow="0 1rem 2rem hsl(0 0% 50% / 35%)"
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
    </Stack>
  );
}
