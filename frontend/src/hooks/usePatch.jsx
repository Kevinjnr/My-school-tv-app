import { useMutation } from "@tanstack/react-query";
import { patch } from "../services/api";
import { useToast } from "@chakra-ui/react";

export const usePatch = (url, key, config) => {
  const toast = useToast();
  return useMutation({
    mutationFn: async (data) => {
      return patch(url, data, config);
    },
    mutationKey: key,
    onError: (err) => {
      console.log(err);
      console.log("error response:", err);
      toast({
        title: "error",
        status: "error",
        description: err?.response.data.message || err.message,
      });
    },
    onSuccess: (resp) => {
      toast({
        title: "success",
        status: "success",
        description: resp.message,
      });
    },
  });
};

// export default usePost;
