import { useState, useContext, createContext, useCallback } from "react";

const loaderContext = createContext();

export function ProvideLoader({ children }) {
  const data = useProvideLoader();

  return (
    <loaderContext.Provider value={data}>{children}</loaderContext.Provider>
  );
}

function useProvideLoader() {
  const [counter, setCounter] = useState(null);
  const [text, setText] = useState("");

  const show = useCallback(
    (loadingText = "Chargement...") => {
      setCounter(counter + 1);
      setText(loadingText);
    },
    [counter],
  );

  const hide = useCallback(() => {
    setCounter(Math.max(0, counter - 1));
  }, [counter]);

  // Return the user object and loader methods
  return {
    visible: counter > 0,
    show,
    hide,
    text,
  };
}

const useLoader = () => {
  return useContext(loaderContext);
};

export default useLoader;
