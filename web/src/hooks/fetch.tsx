import { useEffect, useRef, useState } from "react";

export type FetchError = {
  message: string;
};

type RequestError = {
  error: string;
};

type Response<T> = {
  data: T;
};

type Props = {
  url: string;
};

export function useFetch<T>({ url }: Props) {
  const firstRef = useRef(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>();
  const [data, setData] = useState<T | null>();

  useEffect(() => {
    if (firstRef.current) {
      (async () => {
        const request = async (): Promise<Response<T> | RequestError> =>
          fetch(url).then((res) => res.json());
        const res = await request();
        if ("error" in res) {
          setError({ message: res.error });
        } else {
          setData(res.data);
        }
        setLoading(false);
      })();
      return () => {
        firstRef.current = false;
      };
    }
  }, [url]);

  return {
    loading,
    error,
    data,
  };
}
