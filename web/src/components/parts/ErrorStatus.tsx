import { Circle, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

type Props = {
  icon: IconType;
  message: string;
};

export function ErrorStatus({ icon, message }: Props) {
  return (
    <VStack spacing={4} h="100vh" justifyContent="center">
      <Circle bgColor="blackAlpha.500" p={8}>
        <Icon as={icon} boxSize={12} />
      </Circle>
      <Heading as="h2">エラーが発生しました</Heading>
      <Text>{message}</Text>
    </VStack>
  );
}
