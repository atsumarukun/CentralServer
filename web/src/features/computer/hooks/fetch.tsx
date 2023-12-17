import { Computer } from "../computer";
import { useFetch } from "@/hooks/fetch";

export function useGetComputers() {
  const { loading, error, data } = useFetch<Computer[]>({
    url: "http://localhost:8000/api/v1/computer/",
  });

  return {
    loading,
    error,
    data,
  };
}
