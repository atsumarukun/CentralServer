import { Button, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { MenuDrawer } from "./MenuDrawer";
import Link from "next/link";

export const HeaderHeight = "46px";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack position="fixed" px={6} w="100%">
      <Button variant="unstyle" size="xs" onClick={onOpen}>
        <Icon as={IoMdMenu} boxSize={6} />
      </Button>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
      <Text as={Link} href="/" fontSize="xl" p={2}>
        CentralServer
      </Text>
    </HStack>
  );
}
