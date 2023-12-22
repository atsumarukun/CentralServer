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

export type UseRequestReturn<T> = [
  () => Promise<void>,
  {
    loading: boolean;
    error?: RequestError;
    data?: T;
  }
];

export function useRequest<T>({
  path,
  method,
  ...props
}: Props<T>): UseRequestReturn<T> {
  const firstRef = useRef(true);
  const context = useContext(RequestContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>();
  const [data, setData] = useState<T>();

  const request = async () => {
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
