import { forwardRef } from "react";

import Joi from "joi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import AdventuresApi from "~/apis/adventures.api";
import Button from "~/components/html/button/Button";
import Submit from "~/components/html/forms/Submit";
import Form from "~/components/html/forms/validated/Form";
import Input from "~/components/html/forms/validated/Input";
import Modal from "~/components/html/modal/Modal";
import useLoader from "~/hooks/useLoader";

const schema = Joi.object({
  name: Joi.string().required().min(5).max(255),
});

const CreateModal = forwardRef((props, ref) => {
  const saveMutation = useMutation(AdventuresApi.create());
  const navigate = useNavigate();
  const loader = useLoader();

  const onSubmit = (formData) => {
    loader.show("Création de l'aventure");
    saveMutation.mutate(formData, {
      onError: (error) => {
        console.log("onError", error);
      },
      onSuccess: (data) => {
        ref?.current?.close();
        navigate(`/adventures/${data.id}`);
      },
      onSettled: () => {
        loader.hide();
      },
    });
  };

  return (
    <Modal ref={ref} title="Nouvelle aventure">
      <Form onSubmit={onSubmit} defaultValues={{ name: "" }} schema={schema}>
        <div>
          <label htmlFor="name">Donnez un nom à cette aventure</label>
          <Input
            id="name"
            name="name"
            placeholder="Nom"
            className="mt-2 w-full"
          />
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Button
            onClick={() => ref?.current?.close()}
            variant="text"
            color="secondary"
          >
            Annuler
          </Button>
          <Submit>Valider</Submit>
        </div>
      </Form>
    </Modal>
  );
});

CreateModal.displayName = "CreateModal";
export default CreateModal;
