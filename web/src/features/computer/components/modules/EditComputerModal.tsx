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
import { GetComputers, useEditComputer } from "../../hooks/request";
import { Computer } from "../../computer";
import { useActionToast } from "@/hooks/toast";

type Props = {
  computer: Computer;
  isOpen: boolean;
  onClose: () => void;
};

export function EditComputerModal({ computer, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <EditComputerModalContent computer={computer} onClose={onClose} />
    </Modal>
  );
}

type ContentProps = {
  computer: Computer;
  onClose: () => void;
};

function EditComputerModalContent({ computer, onClose }: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const useFormReturnValue = useForm<ComputerFormShema>({
    resolver: zodResolver(computerFormShema),
  });

  const [edit] = useEditComputer({
    id: computer.id,
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
    edit({
      input,
    });
  };

  return (
    <ModalContent
      as={chakra.form}
      onSubmit={useFormReturnValue.handleSubmit(onSubmit)}
    >
      <ModalHeader>{computer.host_name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ComputerForm
          computer={computer}
          useFormReturnValue={useFormReturnValue}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="unstyle" type="submit">
          送信
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
