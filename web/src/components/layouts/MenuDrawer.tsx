import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { IconLink } from "../parts/IconLink";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MenuDrawer({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [onClose, pathname]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <HStack px={6}>
            <Button variant="unstyle" size="xs" onClick={onClose}>
              <Icon as={IoMdMenu} boxSize={6} />
            </Button>
            <Text as={Link} href="/" fontSize="xl" p={2}>
              CentralServer
            </Text>
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
