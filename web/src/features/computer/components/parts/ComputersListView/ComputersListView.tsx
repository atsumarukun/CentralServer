import { Stack } from "@chakra-ui/react";
import { ComputersListViewItem } from "./ComputersListViewItem";
import { Computer } from "@/features/computer/computer";
import { ComputersListViewHeader } from "./ComputersListViewHeader";

type Props = {
  computers: Computer[];
};

export function ComputersListView({ computers }: Props) {
  return (
    <Stack spacing={0}>
      <ComputersListViewHeader />
      {computers.map((v) => (
        <ComputersListViewItem computer={v} key={v.id} />
      ))}
    </Stack>
  );
}
