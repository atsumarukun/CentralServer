import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type FetchContextFunction = {
  refetch: () => Promise<void>;
};

type FetchContextFunctions = {
  getComputers: FetchContextFunction[];
};

type FetchContextSetFunctions = {
  setGetComputers: Dispatch<SetStateAction<FetchContextFunction[]>>;
};

export type FetchContextProps = FetchContextFunctions &
  FetchContextSetFunctions;

export type FetchContextFunctionsKeys = keyof FetchContextFunctions;

export const FetchContext = createContext<FetchContextProps>({
  getComputers: [],
  setGetComputers: () => [],
});

type Props = {
  children: ReactNode;
};

export function FetchProvider({ children }: Props) {
  const [getComputers, setGetComputers] = useState<FetchContextFunction[]>([]);

  return (
    <FetchContext.Provider value={{ getComputers, setGetComputers }}>
      {children}
    </FetchContext.Provider>
  );
}
