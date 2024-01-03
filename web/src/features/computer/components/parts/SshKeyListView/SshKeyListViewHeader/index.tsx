import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { SshKeyListViewHeaderMenu } from "./SshKeyListViewHeaderMenu";

type Props = {
  computer_id: number;
};

export function SshKeyListViewHeader({ computer_id }: Props) {
  return (
    <HStack
      spacing={4}
      px={6}
      fontWeight="bold"
      bgColor="whiteAlpha.100"
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid flexGrow={1} gap={4} py={3} templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={{ base: 5, md: 2 }}>
          <Text>ユーザ名</Text>
        </GridItem>
        <GridItem colSpan={3} display={{ base: "none", md: "block" }}>
          <Text>Privateキー</Text>
        </GridItem>
      </Grid>
      <HStack>
        <SshKeyListViewHeaderMenu computer_id={computer_id} />
      </HStack>
    </HStack>
  );
}
