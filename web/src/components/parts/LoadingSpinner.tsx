import { Center, Spinner } from "@chakra-ui/react";

export function LoadingSpinner() {
  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bgColor="blackAlpha.600"
    >
      <Spinner size="xl" />
    </Center>
  );
}
