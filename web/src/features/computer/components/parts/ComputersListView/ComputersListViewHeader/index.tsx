import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { ComputersListViewHeaderMenu } from "./ComputersListViewHeaderMenu";

export function ComputersListViewHeader() {
  return (
    <HStack
      spacing={4}
      p={3}
      fontWeight="bold"
      bgColor="whiteAlpha.100"
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid
        flexGrow={1}
        gap={4}
        templateColumns={{
          base: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
      >
        <GridItem colSpan={2}>
          <Text>ホスト名</Text>
        </GridItem>
        <GridItem>
          <Text>ステータス</Text>
        </GridItem>
        <GridItem display={{ base: "none", md: "block" }}>
          <Text>IPアドレス</Text>
        </GridItem>
        <GridItem display={{ base: "none", lg: "block" }}>
          <Text>MACアドレス</Text>
        </GridItem>
      </Grid>
      <HStack>
        <Box boxSize={6} />
        <ComputersListViewHeaderMenu />
      </HStack>
    </HStack>
  );
}
