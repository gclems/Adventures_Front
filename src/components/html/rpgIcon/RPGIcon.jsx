import PropTypes from "prop-types";
function RPGIcon({ name }) {
  return <i className={name}></i>;
}

RPGIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["lg", "2x", "3x", "4x", "5x"]),
};

export default RPGIcon;
