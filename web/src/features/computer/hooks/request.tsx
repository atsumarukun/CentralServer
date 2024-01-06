import { UseRequestReturn, useRequest } from "@/hooks/request";
import { Computer, SshKey } from "../types";
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
  }, [request]);

  return {
    loading,
    error,
    data,
    refetch: request,
  };
}

export const GetComputer = "computer/$id";

type GetComputerProps = {
  input?: {
    id: number;
  };
} & RequestCallbacks<Computer>;

export function useGetComputer({ ...props }: GetComputerProps) {
  const firstRef = useRef(true);

  const [request, { loading, error, data }] = useRequest<
    Computer,
    GetComputerProps["input"]
  >({
    path: GetComputer,
    ...props,
  });

  useEffect(() => {
    if (firstRef.current) {
      request();
      firstRef.current = false;
    }
  }, [request]);

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

type EditComputerProps = {
  id: number;
  input?: {
    host_name: string;
    ip_address: string;
    mac_address: string;
  };
} & RequestCallbacks<Computer>;

export function useEditComputer({ id, input, ...props }: EditComputerProps) {
  return useRequest<Computer, EditComputerProps["input"]>({
    path: `computer/${id}`,
    method: {
      method: "PUT",
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

type WakeOnLanComputerProps = {
  id: number;
} & RequestCallbacks<Computer>;

export function useWakeOnLanComputer({ id, ...props }: WakeOnLanComputerProps) {
  return useRequest<Computer, undefined>({
    path: `computer/${id}/wol`,
    method: {
      method: "PUT",
    },
    ...props,
  });
}

type GenerateSshKeyProps = {
  input?: {
    computer_id: number;
    user_name: string;
    port: number;
  };
} & RequestCallbacks<string>;

export function useGenerateSshKey({
  input,
  ...props
}: GenerateSshKeyProps): UseRequestReturn<
  string,
  GenerateSshKeyProps["input"]
> {
  return useRequest<string, GenerateSshKeyProps["input"]>({
    path: "ssh/key/",
    method: {
      method: "POST",
      body: JSON.stringify(input),
    },
    ...props,
  });
}

type RegenerateSshKeyProps = {
  id: number;
} & RequestCallbacks<string>;

export function useRegenerateSshKey({
  id,
  ...props
}: RegenerateSshKeyProps): UseRequestReturn<string, undefined> {
  return useRequest<string, undefined>({
    path: `ssh/key/${id}`,
    method: { method: "PUT" },
    ...props,
  });
}

type RemoveSshKeyProps = {
  id: number;
} & RequestCallbacks<SshKey>;

export function useRemoveSshKey({
  id,
  ...props
}: RemoveSshKeyProps): UseRequestReturn<SshKey, undefined> {
  return useRequest<SshKey, undefined>({
    path: `ssh/key/${id}`,
    method: "DELETE",
    ...props,
  });
}
