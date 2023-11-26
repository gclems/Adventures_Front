function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="m-4 flex items-start gap-x-8 rounded-lg border-2 border-red-500 bg-red-400 p-4 text-red-900"
    >
      <div className="flex-none rounded-full bg-red-300 p-2 text-2xl">
        <i className="fa-solid fa-bug" />
      </div>
      <div className="flex flex-1 flex-col justify-start gap-y-4">
        <div>
          <strong>Une erreur est survenue:</strong>
        </div>
        <div>
          <pre>{error.message}</pre>
        </div>
        <button
          onClick={resetErrorBoundary}
          className="rounded-full bg-red-300 hover:bg-red-200 active:bg-red-400"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
