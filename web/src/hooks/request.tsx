import {
  RequestCallbacks,
  RequestContext,
  RequestError,
  RequestMethod,
} from "@/providers/request";
import { useContext, useEffect, useRef, useState } from "react";

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

type Input<T> =
  | {
      input: T;
    }
  | undefined;

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

  const request = async (...input: Input<U>[]) => {
    if (input.length && method !== undefined && typeof method !== "string")
      method = { method: method.method, body: JSON.stringify(input[0]?.input) };
    context.client?.request({
      path,
      method,
      ...props,
      setLoading,
      setError,
      setData,
    });
  };

  useEffect(() => {
    if (firstRef.current && (!method || method == "GET")) {
      context.client?.setRequests(path, request);
      firstRef.current = false;
    }
  }, [path]);

  return [
    request,
    {
      loading,
      error,
      data,
    },
  ];
}
