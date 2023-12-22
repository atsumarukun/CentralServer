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
        templateColumns={{
          base: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
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
        <GridItem display={{ base: "none", md: "block" }}>
          <Text>{computer.ip_address}</Text>
        </GridItem>
        <GridItem display={{ base: "none", lg: "block" }}>
          <Text>{computer.mac_address}</Text>
        </GridItem>
      </Grid>
      <ComputersListViewItemMenu computer={computer} />
    </HStack>
  );
}
