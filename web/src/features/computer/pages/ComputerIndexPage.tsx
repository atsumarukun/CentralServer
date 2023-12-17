"use client";

import { LoadingSpinner } from "@/components/parts/LoadingSpinner";
import { useGetComputers } from "../hooks/fetch";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { ErrorStatus } from "@/components/parts/ErrorStatus";
import { ComputersListView } from "../components/parts/ComputersListView";

export function ComputerIndexPage() {
  const { loading, error, data } = useGetComputers();

  if (loading) return <LoadingSpinner />;
  if (error || !data)
    return (
      <ErrorStatus
        icon={MdOutlineDesktopAccessDisabled}
        message={"コンピュータの取得に失敗しました."}
      />
    );

  return <ComputersListView computers={data} />;
}
