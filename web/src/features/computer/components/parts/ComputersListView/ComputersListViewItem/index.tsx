import { Computer } from "@/features/computer/computer";
import {
  Circle,
  Grid,
  GridItem,
  HStack,
  Text,
  Link,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { ComputersListViewItemMenu } from "./ComputersListViewItemMenu";
import { MdEdit } from "react-icons/md";
import { EditComputerModal } from "../../../modules/EditComputerModal";

type Props = {
  computer: Computer;
};

export function ComputersListViewItem({ computer }: Props) {
  const {
    isOpen: isEditComputerModalOpen,
    onOpen: onEditComputerModalOpen,
    onClose: onEditComputerModalClose,
  } = useDisclosure();

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
      <HStack>
        <Button size="xs" variant="unstyle" onClick={onEditComputerModalOpen}>
          <Icon as={MdEdit} boxSize={6} />
        </Button>
        <EditComputerModal
          computer={computer}
          isOpen={isEditComputerModalOpen}
          onClose={onEditComputerModalClose}
        />
        <ComputersListViewItemMenu computer={computer} />
      </HStack>
    </HStack>
  );
}
