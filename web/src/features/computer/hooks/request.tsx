import { UseRequestReturn, useRequest } from "@/hooks/request";
import { Computer } from "../computer";
import { useEffect, useRef } from "react";
import { RequestCallbacks } from "@/providers/request";

export const GetComputers = "computer/";

export function useGetComputers() {
  const firstRef = useRef(true);

  const [request, { loading, error, data }] = useRequest<Computer[], undefined>(
    {
      path: GetComputers,
    }
  );

  useEffect(() => {
    if (firstRef.current) {
      request();
      firstRef.current = false;
    }
  }, []);

  return {
    loading,
    error,
    data,
    refetch: request,
  };
}

type CreateComputerProps = {
  input?: {
    host_name: string;
    ip_address: string;
    mac_address: string;
  };
} & RequestCallbacks<Computer>;

export function useCreateComputer({ input, ...props }: CreateComputerProps) {
  return useRequest<Computer, CreateComputerProps["input"]>({
    path: "computer/",
    method: {
      method: "POST",
      body: JSON.stringify(input),
    },
    ...props,
  });
}

type RemoveComputerProps = {
  id: number;
} & RequestCallbacks<Computer>;

export function useRemoveComputer({
  id,
  ...props
}: RemoveComputerProps): UseRequestReturn<Computer, undefined> {
  return useRequest<Computer, undefined>({
    path: `computer/${id}`,
    method: "DELETE",
    ...props,
  });
}
