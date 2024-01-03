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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetComputer, useGenerateSshKey } from "../../hooks/request";
import { useActionToast } from "@/hooks/toast";
import { SshKeyFormShema, sshKeyFormShema } from "./SshKeyForm/schema";
import { SshKeyForm } from "./SshKeyForm";

type Props = {
  computer_id: number;
  isOpen: boolean;
  onClose: () => void;
  setPublicKey: (publicKey?: string) => void;
};

export function GenerateSshKeyModal({ isOpen, onClose, ...props }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <GenerateSshKeyModalContent {...props} onClose={onClose} />
    </Modal>
  );
}

type ContentProps = {
  computer_id: number;
  onClose: () => void;
  setPublicKey: (publicKey?: string) => void;
};

function GenerateSshKeyModalContent({
  computer_id,
  onClose,
  setPublicKey,
}: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const useFormReturnValue = useForm<SshKeyFormShema>({
    resolver: zodResolver(sshKeyFormShema),
  });

  const [generate] = useGenerateSshKey({
    onCompleted: (data) => {
      successToast({
        title: "生成しました",
      });
      setPublicKey(data);
      onClose();
    },
    onError: (err) => {
      errorToast({
        description: err.message,
      });
    },
    refetchRequests: [GetComputer],
  });

  const onSubmit: SubmitHandler<SshKeyFormShema> = (input) => {
    generate({
      computer_id: computer_id,
      ...input,
    });
  };

  return (
    <ModalContent
      as={chakra.form}
      onSubmit={useFormReturnValue.handleSubmit(onSubmit)}
    >
      <ModalHeader>生成</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SshKeyForm useFormReturnValue={useFormReturnValue} />
      </ModalBody>
      <ModalFooter>
        <Button variant="unstyle" type="submit">
          送信
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
