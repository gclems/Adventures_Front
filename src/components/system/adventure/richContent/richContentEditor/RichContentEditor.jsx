import { useFieldArray } from "react-hook-form";

import Button from "~/components/html/button/Button";
import Form from "~/components/html/form/Form";
import Submit from "~/components/html/submit/Submit";

import MarkdownInput from "./components/MarkdownInput";
import StatsInput from "./components/StatsInput";

function RichContentEditor({ item, onChange }) {
  const onSubmit = (formData) => {
    console.log("formData", formData);
  };

  const onInputChange = (newValues) => {
    onChange?.({ ...newValues });
  };

  return (
    <div className="grid gap-y-2 p-2">
      <div className="rounded-md bg-zinc-600 p-2">
        <Button variant="ghost" onClick={() => {}}>
          <i className="fa-solid fa-plus" />
        </Button>
      </div>
      <Form onSubmit={onSubmit} defaultValues={item}>
        {({ control, getValues }) => {
          const { fields } = useFieldArray({ control, name: "content" });
          return (
            <div className="grid gap-y-4">
              {fields.map((block, i) => {
                let Component = null;
                switch (block.type) {
                  case "stats":
                    Component = StatsInput;
                    break;
                  default:
                    Component = MarkdownInput;
                    break;
                }

                return (
                  <Component
                    key={block.id}
                    control={control}
                    name={`content.${i}`}
                    onChange={() => {
                      onInputChange(getValues());
                    }}
                  />
                );
              })}
              <Submit>Valider</Submit>
            </div>
          );
        }}
      </Form>
    </div>
  );
}

export default RichContentEditor;
