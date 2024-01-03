import { Stack } from "@chakra-ui/react";
import { SshKeyListViewItem } from "./SshKeyListViewItem";
import { SshKey } from "@/features/computer/types";
import { SshKeyListViewHeader } from "./SshKeyListViewHeader";

type Props = {
  computer_id: number;
  sshKeys: SshKey[];
};

export function SshKeyListView({ computer_id, sshKeys }: Props) {
  return (
    <Stack spacing={0}>
      <SshKeyListViewHeader computer_id={computer_id} />
      {sshKeys.map((v) => (
        <SshKeyListViewItem sshKey={v} key={v.id} />
      ))}
    </Stack>
  );
}
