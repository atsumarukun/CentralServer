import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { ComputersListViewHeaderMenu } from "./ComputersListViewHeaderMenu";

export function ComputersListViewHeader() {
  return (
    <HStack
      spacing={4}
      p={3}
      fontWeight="bold"
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid flexGrow={1} templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text>ホスト名</Text>
        </GridItem>
        <GridItem>
          <Text>ステータス</Text>
        </GridItem>
        <GridItem>
          <Text>IPアドレス</Text>
        </GridItem>
        <GridItem>
          <Text>MACアドレス</Text>
        </GridItem>
      </Grid>
      <ComputersListViewHeaderMenu />
    </HStack>
  );
}
