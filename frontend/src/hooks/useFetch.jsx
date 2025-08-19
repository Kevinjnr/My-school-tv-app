import { useQuery } from "@tanstack/react-query";
import { get } from "../services/api";

const useFetch = (url, key) => {
  return useQuery({
    queryFn: async () => {
      return get(url).then((resp) => {
        return resp.data;
      });
    },
    queryKey: key,
  });
};

export default useFetch;
