function Dialog({ children, ...props }) {
  return (
    <div className="border-l-4 border-ocre-400 bg-white/20 px-4 py-2 text-xs italic">
      {children}
    </div>
  );
}

export default Dialog;
