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
import { GetComputer, useRemoveSshKey } from "../../hooks/request";
import { useActionToast } from "@/hooks/toast";

type Props = {
  id: number;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
};

export function RemoveSshKeyAlert({ isOpen, onClose, ...props }: Props) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <RemoveSshKeyAlertContent
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
};

function RemoveSshKeyAlertContent({
  id,
  userName,
  cancelRef,
  onClose,
}: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const [remove] = useRemoveSshKey({
    id: id,
    onCompleted: () => {
      successToast({
        title: "削除しました",
      });
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
        削除
      </AlertDialogHeader>
      <AlertDialogBody>「{userName}」を削除しますか？</AlertDialogBody>
      <AlertDialogFooter>
        <Button variant="unstyle" ref={cancelRef} onClick={onClose}>
          キャンセル
        </Button>
        <Button
          color="red.400"
          ml={3}
          variant="unstyle"
          onClick={() => remove()}
        >
          削除
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
