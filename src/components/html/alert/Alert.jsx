import PropTypes from "prop-types";

import ChildrenRenderer from "~/components/html/childrenRenderer/ChildrenRenderer";

function Alert({ children }) {
  return (
    <div>
      <ChildrenRenderer>{children}</ChildrenRenderer>
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.elementType,
};

export default Alert;
