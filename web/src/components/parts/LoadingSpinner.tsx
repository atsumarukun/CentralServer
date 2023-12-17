import { Center, Spinner } from "@chakra-ui/react";

export function LoadingSpinner() {
  return (
    <Center position="fixed" w="100%" h="100%" bgColor="blackAlpha.500">
      <Spinner size="xl" />
    </Center>
  );
}
