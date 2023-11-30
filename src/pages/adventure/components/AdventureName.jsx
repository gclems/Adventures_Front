import { useState } from "react";

import Joi from "joi";
import { useMutation } from "react-query";

import AdventuresApi from "~/apis/adventures.api";
import Button from "~/components/html/button/Button";
import InputContentSeparator from "~/components/html/forms/InputContentSeparator";
import Submit from "~/components/html/forms/Submit";
import Form from "~/components/html/forms/validated/Form";
import Input from "~/components/html/forms/validated/Input";
import useAdventure from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";

const schema = Joi.object({
  name: Joi.string().required().min(5).max(255),
});

function AdventureName() {
  const { adventure, updateAdventureName } = useAdventure();
  const [editMode, setEditMode] = useState(false);
  const loader = useLoader();
  const updateNameMutation = useMutation(AdventuresApi.update(adventure.id));

  if (!editMode) {
    return (
      <div className="group flex items-center gap-4 text-xl">
        <div>{adventure.name}</div>
        <div className="invisible group-hover:visible">
          <Button
            variant="text"
            color="warning"
            size="small"
            onClick={() => {
              setEditMode(true);
            }}
          >
            <i className="fa-solid fa-pencil" />
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (formData) => {
    loader.show("Sauvegarde...");
    updateNameMutation.mutate(formData, {
      onError: (error) => {
        console.log("onError", error);
      },
      onSuccess: () => {
        updateAdventureName(formData.name);
        setEditMode(false);
      },
      onSettled: () => {
        loader.hide();
      },
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{ name: adventure.name }}
      schema={schema}
    >
      <Input
        id="name"
        name="name"
        endContent={
          <>
            <Button
              variant="text"
              color="secondaryDark"
              size="small"
              onClick={() => {
                setEditMode(false);
              }}
            >
              <i className="fa-solid fa-x" />
            </Button>
            <InputContentSeparator />
            <Submit variant="text" color="primaryDark" size="small">
              <i className="fa-solid fa-check" />
            </Submit>
          </>
        }
      />
    </Form>
  );
}

export default AdventureName;
