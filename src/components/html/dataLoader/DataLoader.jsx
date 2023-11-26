import PropTypes from "prop-types";

import Alert from "../alert/Alert";
import ChildrenRenderer from "../childrenRenderer/ChildrenRenderer";

const DataLoader = ({
  loadingPlaceholder,
  errorPlaceholder,
  queries,
  children,
}) => {
  let isLoading = false;
  let inError = false;

  const checkQuery = (query) => {
    isLoading ||= query.isLoading || query.isRefetching;
    inError ||= query.isError || query.isRefetchError;
  };

  if (queries) {
    if (Array.isArray(queries)) {
      queries.forEach((q) => checkQuery(q));
    } else if (typeof queries === "object") {
      checkQuery(queries);
    }
  }

  if (isLoading) {
    return (
      loadingPlaceholder ?? (
        <div className="min-h-[90px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-spinner fa-fw fa-2xl fa-spin" />
          </div>
        </div>
      )
    );
  }

  if (inError) {
    return (
      errorPlaceholder ?? (
        <Alert color="danger">
          Une erreur est survenue lors du chargement des données.
        </Alert>
      )
    );
  }

  return <ChildrenRenderer>{children}</ChildrenRenderer>;
};

DataLoader.propTypes = {
  loadingPlaceholder: PropTypes.element,
  errorPlaceholder: PropTypes.element,
  queries: PropTypes.oneOfType([
    PropTypes.shape({ status: PropTypes.string }),
    PropTypes.arrayOf(PropTypes.shape({ status: PropTypes.string })),
  ]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

DataLoader.defaultProps = {
  isLoadingText: "Chargement",
  loadingPlaceholder: null,
  errorPlaceholder: null,
};

export default DataLoader;
