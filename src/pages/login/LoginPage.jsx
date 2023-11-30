import Joi from "joi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSanctum } from "react-sanctum";

import Submit from "~/components/html/forms/Submit";
import Form from "~/components/html/forms/validated/Form";
import Input from "~/components/html/forms/validated/Input";
import useMount from "~/hooks/useMount";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(), // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

function LoginPage() {
  const { signIn, signOut, authenticated } = useSanctum();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useMount(() => {
    if (authenticated) {
      signOut();
    }
  });

  const onSubmit = async (formData) => {
    let error = null;

    await signIn(formData.email, formData.password).catch((e) => {
      error = e;
    });

    if (!error) {
      navigate(decodeURI(searchParams.redirectTo ?? "/"));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{ email: "gclems@gmail.com" }}
      schema={schema}
    >
      <div className="flex flex-col gap-y-8">
        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <Input id="email" name="email" className="mt-2" />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <Input
            id="password"
            name="password"
            type="password"
            className="mt-2"
          />
        </div>
        <Submit />
      </div>
    </Form>
  );
}

export default LoginPage;
