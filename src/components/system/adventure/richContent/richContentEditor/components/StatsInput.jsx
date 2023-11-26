import { useFieldArray, useFormContext } from "react-hook-form";

import Hidden from "~/components/html/hidden/Hidden";
import Input from "~/components/html/input/Input";

const stats = ["Str", "Dex", "Con", "Int", "Sag", "Cha"];

function StatsInput({ name, onChange }) {
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: `${name}.content` });

  return (
    <div>
      <div className="text-sm">
        <i>Statistiques</i>
      </div>
      <Hidden name={`${name}.type`} value="stats" />
      <div className="grid grid-cols-3 gap-2">
        {fields.map((field, i) => (
          <div key={field.id}>
            <label htmlFor={`${name}.content.${i}`}>{stats[i]}</label>
            <Input
              type="number"
              name={`${name}.content.${i}`}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsInput;
