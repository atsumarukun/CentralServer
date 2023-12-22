import { ReactNode, createContext, useState } from "react";

export class RequestError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type RequestCallbacks<T> = {
  refetchRequests?: string[];
  onCompleted?: (data?: T) => void;
  onError?: (err: RequestError) => void;
};

export type RequestMethod =
  | "GET"
  | "DELETE"
  | { method: "POST" | "PUT"; body: string };

type RequestProps<T> = {
  path: string;
  method?: RequestMethod;
  setLoading: (loading: boolean) => void;
  setError: (err: RequestError) => void;
  setData: (data: T | undefined) => void;
} & RequestCallbacks<T>;

type RequestClientProps = {
  url: string;
};

export class RequestClient {
  private url: string;
  private requests: Record<string, (() => Promise<void>)[]>;

  constructor({ url }: RequestClientProps) {
    this.url = url;
    this.requests = {};
  }

  async request<T>({
    path,
    method,
    refetchRequests,
    setLoading,
    setError,
    setData,
    onCompleted,
    onError,
  }: RequestProps<T>) {
    setLoading(true);

    const requestMethod = typeof method === "string" ? method : method?.method;
    const headers =
      typeof method === "string"
        ? undefined
        : {
            Accept: "application/json",
          };
    const body = typeof method === "string" ? undefined : method?.body;

    await fetch(this.url + path, { method: requestMethod, headers, body })
      .then(async (res) => {
        const data: { data: T } | { error: string } = await res.json();
        if ("error" in data) throw new RequestError(data.error);
        setData(await data.data);
        if (refetchRequests)
          Promise.all(
            refetchRequests
              .map((v) => this.requests[v].map((refetch) => refetch()))
              .flat()
          );
        onCompleted?.(data.data);
      })
      .catch((err: RequestError) => {
        setError(err);
        onError?.(err);
      });

    setLoading(false);
  }

  setRequests(path: string, request: () => Promise<void>) {
    this.requests[path] = [...(this.requests[path] ?? []), request];
  }
}

type RequestContextProps = {
  client?: RequestClient;
};

export const RequestContext = createContext<RequestContextProps>({
  client: undefined,
});

type RequestProviderProps = {
  client: RequestClient;
  children: ReactNode;
};

export function RequestProvider({ client, children }: RequestProviderProps) {
  const [requestClient] = useState(client);

  return (
    <RequestContext.Provider value={{ client: requestClient }}>
      {children}
    </RequestContext.Provider>
  );
}
