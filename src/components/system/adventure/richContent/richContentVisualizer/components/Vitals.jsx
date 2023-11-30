function Vitals({ values }) {
  if (typeof values !== "string") {
    return null;
  }

  const stats = values.split(",").filter((element) => element);

  return (
    <div className="grid max-w-xs grid-cols-3 border border-ocre-500">
      <div className="text-center" title={`Classe d'armure: ${stats[0]}`}>
        <div className=" border-b border-ocre-500 bg-ocre-500/10 py-1 font-semibold text-ocre-500">
          <i className="fa-solid fa-shield-halved fa-xl" />
        </div>
        <div className="cursor-default bg-ocre-500/5 font-semibold">
          {stats[0]}
        </div>
      </div>
      <div className="text-center" title={`Points de vie: ${stats[1]}`}>
        <div className=" border-b border-ocre-500 bg-ocre-500/10 py-1 font-semibold text-ocre-500">
          <i className="fa-solid fa-heart fa-xl" />
        </div>
        <div className="cursor-default bg-ocre-500/5 font-semibold">
          {stats[1]}
        </div>
      </div>
      <div className="text-center" title={`Vitesse: ${stats[2]}`}>
        <div className="border-b border-ocre-500 bg-ocre-500/10 py-1 font-semibold text-ocre-500">
          <i className="fa-solid fa-person-running-fast fa-xl" />
        </div>
        <div className="cursor-default bg-ocre-500/5 font-semibold">
          {stats[2]}
        </div>
      </div>
    </div>
  );
}

export default Vitals;
