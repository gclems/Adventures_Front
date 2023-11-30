import { useRef, useState } from "react";

import clsx from "clsx";
import Joi from "joi";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

import AdventureItemsApi from "~/apis/adventuresItems.api";
import Button from "~/components/html/button/Button";
import InputContentSeparator from "~/components/html/forms/InputContentSeparator";
import Submit from "~/components/html/forms/Submit";
import Form from "~/components/html/forms/validated/Form";
import Input from "~/components/html/forms/validated/Input";
import useAdventure from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";
import useMount from "~/hooks/useMount";
import useToggle from "~/hooks/useToggle";

import DeleteItemModal from "./DeleteItemModal";

const schema = Joi.object({
  name: Joi.string().required().min(3).max(255),
});

function ItemToolbar({ className = "", item }) {
  const [anchored, toggleAnchored] = useToggle(false);
  const [editMode, setEditMode] = useState(false);

  const deleteConfirmModal = useRef();

  const loader = useLoader();

  const { adventure, addItem, removeItem, updateAdventureItem } =
    useAdventure();

  const addSubItemMutation = useMutation(
    AdventureItemsApi.create(adventure.id),
  );

  const updateNameMutation = useMutation(
    AdventureItemsApi.update(adventure.id, item.id),
  );

  const deleteMutation = useMutation(AdventureItemsApi.remove(adventure.id));

  const onCreateSubItem = () => {
    loader.show("Sauvegarde...");
    addSubItemMutation.mutate(
      {
        parentId: item.id,
        name: "New item",
        content: "",
      },
      {
        onError: (error) => {
          console.log("onError", error);
        },
        onSuccess: (data) => {
          addItem(data);
        },
        onSettled: () => {
          loader.hide();
        },
      },
    );
  };

  const onSubmitEdit = (formData) => {
    loader.show("Sauvegarde...");
    updateNameMutation.mutate(formData, {
      onError: (error) => {
        console.log("onError", error);
      },
      onSuccess: () => {
        updateAdventureItem(item, formData);
        setEditMode(false);
      },
      onSettled: () => {
        loader.hide();
      },
    });
  };

  const onRemoveItem = () => {
    loader.show("Sauvegarde...");

    deleteMutation.mutate(item.id, {
      onError: (error) => {
        console.log("onError", error);
      },
      onSuccess: () => {
        removeItem(item);
      },
      onSettled: () => {
        loader.hide();
      },
    });
  };

  useMount(() => {
    if (item.created) {
      setEditMode(true);
    }
  });

  return (
    <>
      <div
        className={clsx(
          "group flex flex-none items-center border bg-zinc-600 text-xs",
          className,
          {
            "border-zinc-400": anchored,
            "border-zinc-600 hover:border-zinc-500": !anchored,
          },
        )}
      >
        <div
          className={clsx({
            "hidden group-hover:flex flex-none": !anchored,
            "flex flex-none": anchored,
          })}
        >
          <Button
            variant="text"
            color="danger"
            size="small"
            title={`Supprimer ${item.name}`}
            onClick={() => deleteConfirmModal?.current?.open()}
          >
            <i className="fa-solid fa-trash" />
          </Button>

          <Button
            variant="text"
            color="warning"
            size="small"
            title="Renommer"
            onClick={() => setEditMode(true)}
          >
            <i className="fa-solid fa-pencil" />
          </Button>

          <Button
            variant="text"
            size="small"
            itle="Ajouter un sous élément"
            onClick={onCreateSubItem}
          >
            <i className="fa-solid fa-plus" />
          </Button>
        </div>
        <Button variant="ghost" size="fit" onClick={toggleAnchored}>
          <div
            className={clsx("transition-all duration-500", {
              "group-hover:rotate-45 group-hover:opacity-100 opacity-50":
                !anchored,
              "rotate-45 opacity-100": anchored,
            })}
          >
            <i className="fa-solid fa-circle-half-stroke opacity-50" />
          </div>
        </Button>
      </div>
      <DeleteItemModal
        ref={deleteConfirmModal}
        item={item}
        onConfirm={onRemoveItem}
      />
      {editMode && (
        <div className="fixed z-10">
          <Form
            onSubmit={onSubmitEdit}
            defaultValues={{ name: item.name }}
            schema={schema}
          >
            <Input
              id="name"
              name="name"
              autoFocus
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
        </div>
      )}
    </>
  );
}

ItemToolbar.propTypes = {
  className: PropTypes.string,
};

export default ItemToolbar;
