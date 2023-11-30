import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FormProvider } from "react-hook-form";

import ChildrenRenderer from "~/components/html/childrenRenderer/ChildrenRenderer";

function Form({
  onSubmit,
  defaultValues = {},
  schema,
  children,
  ...formProps
}) {
  const form = useForm({
    defaultValues,
    resolver: schema ? joiResolver(schema) : undefined,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await onSubmit(data);
        })}
        {...formProps}
      >
        <ChildrenRenderer functionParameters={form}>
          {children}
        </ChildrenRenderer>
      </form>
    </FormProvider>
  );
}

export default Form;
