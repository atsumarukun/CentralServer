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
import { GetComputers, useRemoveComputer } from "../../hooks/request";
import { useActionToast } from "@/hooks/toast";

type Props = {
  id: number;
  hostName: string;
  isOpen: boolean;
  onClose: () => void;
};

export function RemoveComputerAlert({ isOpen, onClose, ...props }: Props) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <RemoveComputerAlertContent
        cancelRef={cancelRef}
        onClose={onClose}
        {...props}
      />
    </AlertDialog>
  );
}

type ContentProps = {
  id: number;
  hostName: string;
  cancelRef: MutableRefObject<null>;
  onClose: () => void;
};

function RemoveComputerAlertContent({
  id,
  hostName,
  cancelRef,
  onClose,
}: ContentProps) {
  const { successToast, errorToast } = useActionToast();

  const [remove] = useRemoveComputer({
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
    refetchRequests: [GetComputers],
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        削除
      </AlertDialogHeader>
      <AlertDialogBody>「{hostName}」を削除しますか？</AlertDialogBody>
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
