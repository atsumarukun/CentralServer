import { SshKey } from "@/features/computer/types";
import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { SshKeyListViewItemMenu } from "./SshKeyListViewItemMenu";

type Props = {
  sshKey: SshKey;
};

export function SshKeyListViewItem({ sshKey }: Props) {
  return (
    <HStack
      spacing={4}
      px={6}
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid gap={4} py={3} flexGrow={1} templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={{ base: 5, md: 2 }}>
          <Text>{sshKey.user_name}</Text>
        </GridItem>
        <GridItem colSpan={3} display={{ base: "none", md: "block" }}>
          <Text>●●●●●●●●●●●●●●●●●●●●</Text>
        </GridItem>
      </Grid>
      <HStack>
        <SshKeyListViewItemMenu sshKey={sshKey} />
      </HStack>
    </HStack>
  );
}
