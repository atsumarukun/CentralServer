import {
  RequestCallbacks,
  RequestContext,
  RequestError,
  RequestMethod,
} from "@/providers/request";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

type Props<T, U extends object | undefined> = {
  path: string;
  method?: RequestMethod;
  input?: U;
} & RequestCallbacks<T>;

export type UseRequestReturn<T, U extends object | undefined> = [
  (...input: U[]) => Promise<void>,
  {
    loading: boolean;
    error?: RequestError;
    data?: T;
  }
];

export function useRequest<T, U extends object | undefined>({
  path,
  method,
  ...props
}: Props<T, U>): UseRequestReturn<T, U> {
  const firstRef = useRef(true);
  const context = useContext(RequestContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>();
  const [data, setData] = useState<T>();

  const request = useCallback(
    async (requestInput?: U) => {
      const input = requestInput ? requestInput : props.input;
      context.client?.request({
        path:
          input && "id" in input ? path.replace("$id", `${input.id}`) : path,
        method:
          method !== undefined && typeof method !== "string"
            ? { method: method.method, body: JSON.stringify({ ...input }) }
            : method,
        ...props,
        setLoading,
        setError,
        setData,
      });
    },
    [context.client, method, path, props]
  );

  useEffect(() => {
    if (firstRef.current && (!method || method == "GET")) {
      context.client?.setRequests(path, request);
      firstRef.current = false;
    }
  }, [context.client, method, path, request]);

  return [
    request,
    {
      loading,
      error,
      data,
    },
  ];
}
