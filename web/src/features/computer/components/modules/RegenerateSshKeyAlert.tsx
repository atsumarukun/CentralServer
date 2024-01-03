import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import { GetComputer, useRegenerateSshKey } from "../../hooks/request";
import { useActionToast } from "@/hooks/toast";

type Props = {
  id: number;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  setPublicKey: (publicKey?: string) => void;
};

export function RegenerateSshKeyAlert({ isOpen, onClose, ...props }: Props) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <RegenerateSshKeyAlertContent
        cancelRef={cancelRef}
        onClose={onClose}
        {...props}
      />
    </AlertDialog>
  );
}

type ContentProps = {
  id: number;
  userName: string;
  cancelRef: MutableRefObject<null>;
  onClose: () => void;
  setPublicKey: (publicKey?: string) => void;
};

function RegenerateSshKeyAlertContent({
  id,
  userName,
  cancelRef,
  onClose,
  setPublicKey,
}: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const [regenerate] = useRegenerateSshKey({
    id: id,
    onCompleted: (data) => {
      successToast({
        title: "再生成しました",
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

  return (
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        再生成
      </AlertDialogHeader>
      <AlertDialogBody>「{userName}」を再生成しますか？</AlertDialogBody>
      <AlertDialogFooter>
        <Button variant="unstyle" ref={cancelRef} onClick={onClose}>
          キャンセル
        </Button>
        <Button ml={3} variant="unstyle" onClick={() => regenerate()}>
          再生成
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
