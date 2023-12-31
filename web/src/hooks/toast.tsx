import { UseToastOptions, useToast } from "@chakra-ui/react";

export function useActionToast() {
  const toast = useToast();

  return {
    successToast: ({ ...options }: UseToastOptions) => {
      toast({
        status: "success",
        duration: 2000,
        isClosable: true,
        ...options,
      });
    },
    errorToast: ({ ...options }: UseToastOptions) => {
      toast({
        title: "エラーが発生しました",
        status: "error",
        duration: 5000,
        isClosable: true,
        ...options,
      });
    },
  };
}
