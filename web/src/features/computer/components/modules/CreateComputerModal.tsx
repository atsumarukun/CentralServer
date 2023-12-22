import {
  chakra,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { ComputerForm } from "./ComputerForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { ComputerFormShema, computerFormShema } from "./ComputerForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetComputers, useCreateComputer } from "../../hooks/request";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateComputerModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CreateModalContent onClose={onClose} />
    </Modal>
  );
}

type ContentProps = {
  onClose: () => void;
};

function CreateModalContent({ onClose }: ContentProps) {
  const toast = useToast();

  const useFormReturnValue = useForm<ComputerFormShema>({
    resolver: zodResolver(computerFormShema),
  });

  const [create] = useCreateComputer({
    onCompleted: () => {
      toast({
        title: "登録しました",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    },
    onError: (err) => {
      toast({
        title: "エラーが発生しました",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    refetchRequests: [GetComputers],
  });

  const onSubmit: SubmitHandler<ComputerFormShema> = (input) => {
    create({
      input,
    });
  };

  return (
    <ModalContent
      as={chakra.form}
      onSubmit={useFormReturnValue.handleSubmit(onSubmit)}
    >
      <ModalHeader>作成</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ComputerForm useFormReturnValue={useFormReturnValue} />
      </ModalBody>
      <ModalFooter>
        <Button variant="unstyle" type="submit">
          送信
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
