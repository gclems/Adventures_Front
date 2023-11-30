function A({ children, ...props }) {
  return (
    <a
      className="appearance-none text-ocre-500 underline"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}

export default A;
