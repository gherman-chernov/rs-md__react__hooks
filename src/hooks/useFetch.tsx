import { useCallback, useEffect, useState } from "react";

type FetchResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: boolean;
  refetch: (a: {params: {_limit: number}}) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
const REFETCH_DEFAULT = (a: {params: {_limit: number}}) => console.log(a);
const RESPONSE_DEFAULT = {data: null, error: false, isLoading: false, refetch: REFETCH_DEFAULT};

export default function useFetch<T>(url: string): FetchResponse<T> {
  const [response, setData] = useState<FetchResponse<T>>({...RESPONSE_DEFAULT, isLoading: true});
  const fetchData = useCallback(async (url: string, rethrow: boolean = false) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(url);
      /// start: for demonstration
      if (rethrow) {
        throw new Error("Fetch error");
      }
      /// start: for demonstration
      const json = await response.json();
      setData({...RESPONSE_DEFAULT, data: json});
    } catch (error) {
      console.error("Fetch error:", error);
      
      if (rethrow) {
        throw error;
      } else {
        setData({...RESPONSE_DEFAULT, error: true})
      }
    }
  }, [setData]);
  const refetch = (a: {params:{_limit: number}}) => {
    console.log('refetch')
    setData({...RESPONSE_DEFAULT, isLoading: true});
    console.log(a);
    fetchData(url, a.params._limit > 0).catch((error) => {
      console.error("Fetch error:", error);
      if (a.params._limit > 0) {
        refetch({params: {_limit: a.params._limit - 1}});
      } else {
        setData({...RESPONSE_DEFAULT, error: true})
      }
    });
  };


  useEffect(() => {
    fetchData(url);
  }, [url, fetchData]);

  return {...response, refetch: refetch};
}