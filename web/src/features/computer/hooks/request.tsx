import { UseRequestReturn, useRequest } from "@/hooks/request";
import { Computer } from "../types";
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
