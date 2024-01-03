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
} from "@chakra-ui/react";
import { ComputerForm } from "./ComputerForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { ComputerFormShema, computerFormShema } from "./ComputerForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetComputers, useCreateComputer } from "../../hooks/request";
import { useActionToast } from "@/hooks/toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateComputerModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CreateComputerModalContent onClose={onClose} />
    </Modal>
  );
}

type ContentProps = {
  onClose: () => void;
};

function CreateComputerModalContent({ onClose }: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const useFormReturnValue = useForm<ComputerFormShema>({
    resolver: zodResolver(computerFormShema),
  });

  const [create] = useCreateComputer({
    onCompleted: () => {
      successToast({
        title: "登録しました",
      });
      onClose();
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputers],
  });

  const onSubmit: SubmitHandler<ComputerFormShema> = (input) => {
    create({
      ...input,
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
