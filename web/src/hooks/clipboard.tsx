import { useActionToast } from "./toast";

export function useCopy() {
  const { successToast, errorToast } = useActionToast();

  const copy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      successToast({ title: "クリップボードにコピーしました" });
    } catch (err) {
      if (err instanceof Error) {
        errorToast({ description: err.message });
      }
    }
  };

  return {
    copy,
  };
}
