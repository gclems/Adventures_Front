import { forwardRef } from "react";

import Button from "~/components/html/button/Button";
import Modal from "~/components/html/modal/Modal";

const DeleteItemModal = forwardRef(({ item, onConfirm }, ref) => {
  return (
    <Modal title="Supprimer un élément" ref={ref}>
      <div>
        Vous allez supprimer{" "}
        <span className="text-red-500">définitivement</span> &quot;
        <i>{item.name}</i>
        &quot;
        {item.items && item.items.length > 0 && (
          <span className="font-semibold text-red-500">
            {" "}
            et ses sous-éléments
          </span>
        )}
        .
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Button
          onClick={() => ref?.current?.close()}
          variant="text"
          color="secondary"
        >
          Annuler
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Valider
        </Button>
      </div>
    </Modal>
  );
});

DeleteItemModal.displayName = "DeleteItemModal";
export default DeleteItemModal;
