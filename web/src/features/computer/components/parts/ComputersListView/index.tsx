import { Stack } from "@chakra-ui/react";
import { ComputersListViewItem } from "./ComputersListViewItem";
import { Computer } from "@/features/computer/computer";
import { ComputersListViewHeader } from "./ComputersListViewHeader";
import { useContext } from "react";
import { RequestContext } from "@/providers/request";

type Props = {
  computers: Computer[];
};

export function ComputersListView({ computers }: Props) {
  return (
    <Stack spacing={0} mx={4} my={4}>
      <ComputersListViewHeader />
      {computers.map((v) => (
        <ComputersListViewItem computer={v} key={v.id} />
      ))}
    </Stack>
  );
}
