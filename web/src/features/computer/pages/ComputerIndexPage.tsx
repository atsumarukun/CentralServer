"use client";

import { LoadingSpinner } from "@/components/parts/LoadingSpinner";
import { useGetComputers } from "../hooks/request";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { ErrorStatus } from "@/components/parts/ErrorStatus";
import { ComputerListView } from "../components/parts/ComputerListView";
import { Stack } from "@chakra-ui/react";

export function ComputerIndexPage() {
  const { loading, error, data } = useGetComputers();

  if (loading) return <LoadingSpinner />;
  if (error || !data)
    return (
      <ErrorStatus
        icon={MdOutlineDesktopAccessDisabled}
        message="コンピュータの取得に失敗しました."
      />
    );

  return (
    <Stack m={6}>
      <ComputerListView computers={data} />
    </Stack>
  );
}
