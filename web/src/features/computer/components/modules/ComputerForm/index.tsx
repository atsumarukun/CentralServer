import { FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { ComputerFormShema } from "./schema";

type Props = {
  useFormReturnValue: UseFormReturn<ComputerFormShema>;
};

export function ComputerForm({ useFormReturnValue }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormReturnValue;

  return (
    <Stack spacing={6}>
      <FormControl>
        <FormLabel>ホスト名</FormLabel>
        {errors?.host_name && (
          <Text variant="error">{errors.host_name.message}</Text>
        )}
        <Input {...register("host_name")} />
      </FormControl>
      <FormControl>
        <FormLabel>IPアドレス</FormLabel>
        {errors?.ip_address && (
          <Text variant="error">{errors.ip_address.message}</Text>
        )}
        <Input {...register("ip_address")} />
      </FormControl>
      <FormControl>
        <FormLabel>MACアドレス</FormLabel>
        {errors?.mac_address && (
          <Text variant="error">{errors.mac_address.message}</Text>
        )}
        <Input {...register("mac_address")} />
      </FormControl>
    </Stack>
  );
}
