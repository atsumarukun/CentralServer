import { FetchContext, FetchContextFunctionsKeys } from "@/providers/fetch";
import { useContext, useState } from "react";

export class FetchError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type FetchFunctionProps<T> = {
  refetchFunctions?: FetchContextFunctionsKeys[];
  onCompleted?: (data?: T) => void;
  onError?: (err: FetchError) => void;
};

type Props<T> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
} & FetchFunctionProps<T>;

export function useFetch<T>({
  url,
  method,
  refetchFunctions,
  onCompleted,
  onError,
}: Props<T>) {
  const context = useContext(FetchContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError>();
  const [data, setData] = useState<T>();

  const fetchFunction = async () => {
    setLoading(true);

    await (async () =>
      fetch(url, {
        method,
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new FetchError((await res.json()).error);
          }
          setData((await res.json()).data);
          if (refetchFunctions)
            Promise.all(
              refetchFunctions
                .map((refetch) => context[refetch]?.map((v) => v.refetch()))
                .flat()
            );
          onCompleted?.();
        })
        .catch((err: FetchError) => {
          setError(err);
          onError?.(err);
        }))();

    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    fetchFunction,
  };
}
