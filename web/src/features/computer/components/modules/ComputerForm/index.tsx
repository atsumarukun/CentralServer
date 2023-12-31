import { FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { ComputerFormShema } from "./schema";
import { Computer } from "@/features/computer/computer";
import { useEffect } from "react";

type Props = {
  computer?: Computer;
  useFormReturnValue: UseFormReturn<ComputerFormShema>;
};

export function ComputerForm({ computer, useFormReturnValue }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormReturnValue;

  useEffect(() => {
    if (computer) {
      setValue("host_name", computer.host_name);
      setValue("ip_address", computer.ip_address);
      setValue("mac_address", computer.mac_address);
    }
  }, [computer, setValue]);

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
