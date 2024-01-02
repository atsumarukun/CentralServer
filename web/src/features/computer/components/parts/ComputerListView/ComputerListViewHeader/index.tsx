import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { ComputerListViewHeaderMenu } from "./ComputersListViewHeaderMenu";

export function ComputerListViewHeader() {
  return (
    <HStack
      spacing={4}
      px={6}
      fontWeight="bold"
      bgColor="whiteAlpha.100"
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid
        flexGrow={1}
        gap={4}
        py={3}
        templateColumns={{
          base: "repeat(4, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
      >
        <GridItem colSpan={2}>
          <Text>ホスト名</Text>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
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
        <ComputerListViewHeaderMenu />
      </HStack>
    </HStack>
  );
}
