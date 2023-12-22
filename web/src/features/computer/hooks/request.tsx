import { UseRequestReturn, useRequest } from "@/hooks/request";
import { Computer } from "../computer";
import { useEffect, useRef } from "react";
import { RequestCallbacks } from "@/providers/request";

export const GetComputers = "computer/";

export function useGetComputers() {
  const firstRef = useRef(true);

  const [request, { loading, error, data }] = useRequest<Computer[]>({
    path: GetComputers,
  });

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

type RemoveComputerProps = {
  id: number;
} & RequestCallbacks<Computer>;

export function useRemoveComputer({
  id,
  ...props
}: RemoveComputerProps): UseRequestReturn<Computer> {
  return useRequest<Computer>({
    path: `computer/${id}`,
    method: "DELETE",
    ...props,
  });
}
