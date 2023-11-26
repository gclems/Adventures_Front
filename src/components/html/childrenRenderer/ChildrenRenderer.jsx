function ChildrenRenderer({ functionParameters, children }) {
  if (typeof children === "function") {
    return children(functionParameters);
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((c, i) => (
          <ChildrenRenderer key={i}>{c}</ChildrenRenderer>
        ))}
      </>
    );
  }

  return children;
}

export default ChildrenRenderer;
