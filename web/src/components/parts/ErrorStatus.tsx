import { Circle, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  message: string;
};

export function ErrorStatus({ icon, message }: Props) {
  return (
    <VStack
      spacing={12}
      justifyContent="center"
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
    >
      <Circle p={8} boxShadow="0 1rem 2rem hsl(0 0% 0% / 75%)">
        <Icon as={icon} boxSize={12} />
      </Circle>
      <VStack>
        <Heading as="h2">エラーが発生しました</Heading>
        <Text>{message}</Text>
      </VStack>
    </VStack>
  );
}
