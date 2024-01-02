import { Stack } from "@chakra-ui/react";
import { SshKeyListViewItem } from "./SshKeyListViewItem";
import { SshKey } from "@/features/computer/types";
import { SshKeyListViewHeader } from "./SshKeyListViewHeader";

type Props = {
  sshKeys: SshKey[];
};

export function SshKeyListView({ sshKeys }: Props) {
  return (
    <Stack spacing={0}>
      <SshKeyListViewHeader />
      {sshKeys.map((v) => (
        <SshKeyListViewItem sshKey={v} key={v.id} />
      ))}
    </Stack>
  );
}
