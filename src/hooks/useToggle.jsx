import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  const set = useCallback((val) => setState(!!val), []);

  return [state, toggle, set];
};

export default useToggle;
