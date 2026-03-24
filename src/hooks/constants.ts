const REFETCH_DEFAULT = (a: {params: {_limit: number}}) => console.log(a);
const RESPONSE_DEFAULT = {data: null, error: false, isLoading: false, refetch: REFETCH_DEFAULT};

export {RESPONSE_DEFAULT, REFETCH_DEFAULT}