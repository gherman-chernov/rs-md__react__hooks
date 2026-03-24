import { useCallback, useEffect, useState } from "react";
import { RESPONSE_DEFAULT } from "./constants";

type FetchResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: boolean;
  refetch: (a: {params: {_limit: number}}, abortController: React.RefObject<AbortController>) => void;
};




export default function useFetch<T>(url: string): FetchResponse<T> {
  
  const [response, setData] = useState<FetchResponse<T>>({...RESPONSE_DEFAULT, isLoading: true});
  const fetchData = useCallback(async (url: string, rethrow: boolean = false, abortController: AbortController) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(url, { signal: abortController.signal });
      /// start: for demonstration
      if (rethrow) {
        throw new Error("Fetch error");
      }
      /// start: for demonstration
      const json = await response.json();
      setData({...RESPONSE_DEFAULT, data: json});
    } catch (error) {
      if (abortController.signal?.aborted) {
        return;
      }

      console.error("Fetch error:", error);
      if (rethrow) {
        throw error;
      } else {
        setData({...RESPONSE_DEFAULT, error: true})
      }
    }
  }, [setData]);
  const refetch = (a: {params:{_limit: number}}, abortController: React.RefObject<AbortController>) => {
    console.log('refetch')
    setData({...RESPONSE_DEFAULT, isLoading: true});
    console.log(a);
    abortController!.current = new AbortController()
    fetchData(url, a.params._limit > 0, abortController!.current).catch((error) => {
      console.error("Fetch error:", error);
      if (a.params._limit > 0) {
        abortController!.current = new AbortController()
        refetch({params: {_limit: a.params._limit - 1}}, abortController);
      } else {
        setData({...RESPONSE_DEFAULT, error: true})
      }
    });
  };


  useEffect(() => {
    const abortController = new AbortController();
    fetchData(url, false, abortController);

    return () => {
      abortController.abort();
    };
  }, [url, fetchData]);

  return {...response, refetch: refetch};
}