import { useEffect, useRef } from "react";
import { useFetch } from "../../hooks";

export default function FetchDemo() {
  const { data, isLoading, error, refetch } = useFetch<
    { id: number; title: string }[]
  >("https://jsonplaceholder.typicode.com/posts");
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const controller = abortController;

    return () => {
      controller.current!.abort();
    };
  }, [abortController]);

  return (
    <div>
      <div>
        <button
          disabled={isLoading}
          onClick={() =>
            refetch({
              params: {
                _limit: 3,
              },
            }, abortController)
          }
        >
          Перезапросить
        </button>
      </div>
      {isLoading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {data &&
        !isLoading &&
        data.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}
