import { useContext, useEffect, useRef } from "react";
import { Computer } from "../computer";
import { FetchError, FetchFunctionProps, useFetch } from "@/hooks/fetch";
import { FetchContext } from "@/providers/fetch";
import { generateUrl } from "@/utils/fetch";

export const GetComputers = "getComputers";

export function useGetComputers(): {
  loading: boolean;
  error?: FetchError;
  data?: Computer[];
  refetch: () => Promise<void>;
} {
  const firstRef = useRef(true);
  const context = useContext(FetchContext);

  const { loading, error, data, fetchFunction } = useFetch<Computer[]>({
    url: generateUrl("computer/"),
  });

  useEffect(() => {
    (async () => {
      if (firstRef.current) {
        fetchFunction();
        firstRef.current = false;
        context.setGetComputers((v) => [{ refetch: fetchFunction }, ...v]);
      }
    })();
  }, []);

  return {
    loading,
    error,
    data,
    refetch: fetchFunction,
  };
}

type RemoveProps = {
  id: number;
} & FetchFunctionProps<Computer>;

export function useRemoveComputer({ id, ...props }: RemoveProps): [
  () => Promise<void>,
  {
    loading: boolean;
    error?: FetchError;
    data?: Computer;
  }
] {
  const { loading, error, data, fetchFunction } = useFetch<Computer>({
    url: generateUrl(`computer/${id}`),
    method: "DELETE",
    ...props,
  });

  return [
    fetchFunction,
    {
      loading,
      error,
      data,
    },
  ];
}
