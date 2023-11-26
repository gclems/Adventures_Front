function StatsBlock({ content }) {
  return (
    <table className="w-full">
      <thead className="border-b border-ocre-500 text-ocre-500">
        <tr>
          <th>Str</th>
          <th>Dex</th>
          <th>Con</th>
          <th>Int</th>
          <th>Wis</th>
          <th>Cha</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {content.map((stat, i) => (
            <td key={i} className="text-center text-sm">
              {stat}
            </td>
          ))}
        </tr>
        <tr className="bg-ocre-500/10">
          {content.map((stat, i) => {
            const mod = Math.floor((+stat - 10) / 2);
            return (
              <td key={i} className="text-center font-semibold">
                {mod >= 0 && "+"}
                {mod}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default StatsBlock;
