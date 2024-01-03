import { Stack } from "@chakra-ui/react";
import { SshKeyListViewItem } from "./SshKeyListViewItem";
import { SshKey } from "@/features/computer/types";
import { SshKeyListViewHeader } from "./SshKeyListViewHeader";

type Props = {
  computer_id: number;
  sshKeys: SshKey[];
  setPublicKey?: (publicKey?: string) => void;
};

export function SshKeyListView({ computer_id, sshKeys, setPublicKey }: Props) {
  return (
    <Stack spacing={0}>
      <SshKeyListViewHeader
        computer_id={computer_id}
        setPublicKey={setPublicKey}
      />
      {sshKeys.map((v) => (
        <SshKeyListViewItem sshKey={v} key={v.id} setPublicKey={setPublicKey} />
      ))}
    </Stack>
  );
}
