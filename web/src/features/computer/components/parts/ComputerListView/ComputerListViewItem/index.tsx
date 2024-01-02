import { Computer } from "@/features/computer/types";
import {
  Circle,
  Grid,
  GridItem,
  HStack,
  Text,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { ComputerListViewItemMenu } from "./ComputersListViewItemMenu";
import { MdEdit } from "react-icons/md";
import { EditComputerModal } from "../../../modules/EditComputerModal";
import { useState } from "react";
import Link from "next/link";

type Props = {
  computer: Computer;
};

export function ComputerListViewItem({ computer }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    isOpen: isEditComputerModalOpen,
    onOpen: onEditComputerModalOpen,
    onClose: onEditComputerModalClose,
  } = useDisclosure();

  return (
    <HStack
      spacing={4}
      px={6}
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
          base: "repeat(4, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
      >
        <GridItem colSpan={2}>
          <Text>{computer.host_name}</Text>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <HStack>
            <Circle
              bgColor={
                loading
                  ? "orange.400"
                  : computer.running
                  ? "green.400"
                  : "red.400"
              }
              p={1}
            />
            <Text>
              {loading ? "Starting" : computer.running ? "Running" : "Stopped"}
            </Text>
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
        <ComputerListViewItemMenu computer={computer} setLoading={setLoading} />
      </HStack>
    </HStack>
  );
}
