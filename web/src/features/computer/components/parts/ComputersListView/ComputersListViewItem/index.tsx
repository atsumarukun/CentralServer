import { Computer } from "@/features/computer/computer";
import { Circle, Grid, GridItem, HStack, Text, Link } from "@chakra-ui/react";
import { ComputersListViewItemMenu } from "./ComputersListViewItemMenu";

type Props = {
  computer: Computer;
};

export function ComputersListViewItem({ computer }: Props) {
  return (
    <HStack
      spacing={4}
      px={3}
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.500"
    >
      <Grid
        as={Link}
        href={`/computer/${computer.id}`}
        gap={4}
        py={3}
        flexGrow={1}
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem colSpan={2}>
          <Text>{computer.host_name}</Text>
        </GridItem>
        <GridItem>
          <HStack>
            <Circle
              bgColor={computer.running ? "green.400" : "red.400"}
              p={1}
            />
            <Text>{computer.running ? "Running" : "Stopped"}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text>{computer.ip_address}</Text>
        </GridItem>
        <GridItem>
          <Text>{computer.mac_address}</Text>
        </GridItem>
      </Grid>
      <ComputersListViewItemMenu computer={computer} />
    </HStack>
  );
}
