import { useEffect } from "react";

const useMount = (func) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(func, []);
};
export default useMount;
