"use client";

import { ErrorStatus } from "@/components/parts/ErrorStatus";
import { ComputerIdIndexPage } from "@/features/computer/pages/ComputerIdIndexPage";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

export default function ComputerIdIndex({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id))
    return (
      <ErrorStatus
        icon={MdOutlineDesktopAccessDisabled}
        message="コンピュータの取得に失敗しました."
      />
    );

  return (
    <main>
      <ComputerIdIndexPage id={id} />
    </main>
  );
}
