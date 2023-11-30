const getStat = (stat) => +(stat ?? 0);

const getModifier = (value) => {
  const mod = Math.floor((+(value ?? 0) - 10) / 2);
  return mod > 0 ? `+${mod}` : mod;
};

const getTooltip = (name, stat) => {
  const value = getStat(stat);
  return `${name}: ${value} (${getModifier(value)})`;
};

const getData = (stats) => [
  {
    header: "Str",
    value: getStat(stats[0]),
    modifier: getModifier(stats[0]),
    tooltip: getTooltip("Force", stats[0]),
  },
  {
    header: "Dex",
    value: getStat(stats[1]),
    modifier: getModifier(stats[1]),
    tooltip: getTooltip("Force", stats[1]),
  },
  {
    header: "Con",
    value: getStat(stats[2]),
    modifier: getModifier(stats[2]),
    tooltip: getTooltip("Force", stats[2]),
  },
  {
    header: "Int",
    value: getStat(stats[3]),
    modifier: getModifier(stats[3]),
    tooltip: getTooltip("Force", stats[3]),
  },
  {
    header: "Wis",
    value: getStat(stats[4]),
    modifier: getModifier(stats[4]),
    tooltip: getTooltip("Force", stats[4]),
  },
  {
    header: "Cha",
    value: getStat(stats[5]),
    modifier: getModifier(stats[5]),
    tooltip: getTooltip("Force", stats[5]),
  },
];

function Stats({ values }) {
  if (typeof values !== "string") {
    return null;
  }

  const data = getData(values.split(",").filter((element) => element));

  return (
    <table className="w-full max-w-md border border-ocre-500 bg-ocre-500/5">
      <thead className="border-b border-ocre-500 bg-ocre-500/10">
        <tr className="text-ocre-500">
          {data.map((d) => (
            <th key={d.header} className="cursor-default" title={d.tooltip}>
              {d.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm">
          {data.map((d) => (
            <td
              key={d.header}
              className="cursor-default text-center"
              title={d.tooltip}
            >
              {d.value}
            </td>
          ))}
        </tr>
        <tr className="font-semibold">
          {data.map((d) => (
            <td
              key={d.header}
              className="cursor-default text-center"
              title={d.tooltip}
            >
              {d.modifier}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Stats;
