import { Button, Grid, GridItem, HStack, Icon, Text } from "@chakra-ui/react";
import { MdCheckBoxOutlineBlank, MdMoreHoriz } from "react-icons/md";

export function ComputersListViewHeader() {
  return (
    <HStack spacing={4} px={6} py={3} fontWeight="bold" borderBottomWidth="1px">
      <Button size="xs" variant="unstyle">
        <Icon as={MdCheckBoxOutlineBlank} boxSize={6} />
      </Button>
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
      <Button size="xs" variant="unstyle">
        <Icon as={MdMoreHoriz} boxSize={6} />
      </Button>
    </HStack>
  );
}
