import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  href: string;
  icon: IconType;
  children: React.ReactNode;
};

export function IconLink({ href, icon, children }: Props) {
  return (
    <Link href={href} variant="menu">
      <HStack spacing={4}>
        <Icon as={icon} boxSize={6} />
        <Text>{children}</Text>
      </HStack>
    </Link>
  );
}
