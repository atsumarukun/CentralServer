import { Stack } from "@chakra-ui/react";
import { ComputerListViewItem } from "./ComputerListViewItem";
import { Computer } from "@/features/computer/computer";
import { ComputerListViewHeader } from "./ComputerListViewHeader";

type Props = {
  computers: Computer[];
};

export function ComputerListView({ computers }: Props) {
  return (
    <Stack spacing={0}>
      <ComputerListViewHeader />
      {computers.map((v) => (
        <ComputerListViewItem computer={v} key={v.id} />
      ))}
    </Stack>
  );
}
