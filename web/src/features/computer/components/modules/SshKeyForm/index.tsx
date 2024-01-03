import { FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { SshKeyFormShema } from "./schema";

type Props = {
  useFormReturnValue: UseFormReturn<SshKeyFormShema>;
};

export function SshKeyForm({ useFormReturnValue }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormReturnValue;

  return (
    <Stack spacing={6}>
      <FormControl>
        <FormLabel>ホスト名</FormLabel>
        {errors?.user_name && (
          <Text variant="error">{errors.user_name.message}</Text>
        )}
        <Input {...register("user_name")} />
      </FormControl>
    </Stack>
  );
}
