import { Computer } from "@/features/computer/computer";
import {
  chakra,
  Button,
  Circle,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MdCheckBoxOutlineBlank, MdMoreHoriz } from "react-icons/md";

type Props = {
  computer: Computer;
};

export function ComputersListViewItem({ computer }: Props) {
  return (
    <HStack spacing={4} px={6} borderBottomWidth="1px">
      <HStack
        as={chakra.button}
        textAlign="left"
        spacing={4}
        py={3}
        flexGrow={1}
      >
        <Icon as={MdCheckBoxOutlineBlank} boxSize={6} />
        <Grid flexGrow={1} templateColumns="repeat(5, 1fr)" gap={4}>
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
      </HStack>
      <Button size="xs" variant="unstyle">
        <Icon as={MdMoreHoriz} boxSize={6} />
      </Button>
    </HStack>
  );
}
