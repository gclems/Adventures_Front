// import { useEff

import { useIsFetching, useIsMutating } from "react-query";

// import useLoader from "~/hooks/useLoader";

function LoadingOverlay() {
  // const { text, visible } = useLoader();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const visible = isFetching || isMutating;

  if (!visible) return null;

  const text = isFetching ? "Chargement..." : "Sauvegarde...";

  return (
    <div className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/40">
      <div className="flex min-w-[300px] max-w-full flex-col items-center justify-center rounded-2xl border-2 border-zinc-400 bg-gradient-to-br from-zinc-500 to-zinc-600 p-16 text-center shadow-xl">
        <i className="fa-solid fa-spinner fa-fw fa-2xl fa-spin" />
        <div className="mt-8">{text}</div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
