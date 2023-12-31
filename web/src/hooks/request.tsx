import {
  RequestCallbacks,
  RequestContext,
  RequestError,
  RequestMethod,
} from "@/providers/request";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

type Props<T> = {
  path: string;
  method?: RequestMethod;
} & RequestCallbacks<T>;

export type UseRequestReturn<T, U> = [
  (...input: Input<U>[]) => Promise<void>,
  {
    loading: boolean;
    error?: RequestError;
    data?: T;
  }
];

type Input<T> = {
  input: T;
};

export function useRequest<T, U>({
  path,
  method,
  ...props
}: Props<T>): UseRequestReturn<T, U> {
  const firstRef = useRef(true);
  const context = useContext(RequestContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>();
  const [data, setData] = useState<T>();

  const request = useCallback(
    async (input?: Input<U>) => {
      context.client?.request({
        path,
        method:
          method !== undefined && typeof method !== "string"
            ? { method: method.method, body: JSON.stringify(input?.input) }
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
