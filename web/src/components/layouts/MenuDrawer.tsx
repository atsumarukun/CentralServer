import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { IconLink } from "../parts/IconLink";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MenuDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <HStack px={6}>
            <Button variant="unstyle" size="xs" onClick={onClose}>
              <Icon as={IoMdMenu} boxSize={6} />
            </Button>
            <Link href="/" fontSize="xl" p={2}>
              CentralServer
            </Link>
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={0} mx={2} my={4}>
            <IconLink href="/computer" icon={MdOutlineDesktopWindows}>
              コンピュータ
            </IconLink>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
