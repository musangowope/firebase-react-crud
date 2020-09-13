import React from "react";
import PropTypes from "prop-types";

const ContactForm = ({ addOnEdit, currentId, contactObjects }) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };

  const [values, setValues] = React.useState(initialFieldValues);

  React.useEffect(() => {
    if (currentId === "") {
      setValues({
        ...initialFieldValues,
      });
    } else {
      setValues({ ...initialFieldValues, ...contactObjects[currentId] });
    }
  }, [contactObjects, currentId]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOnEdit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <input
        placeholder="Full Name"
        name="fullName"
        onChange={handleInputChange}
        value={values.fullName}
      />
      <input
        placeholder="Mobile"
        name="mobile"
        onChange={handleInputChange}
        value={values.mobile}
      />
      <input
        placeholder="Email"
        name="email"
        onChange={handleInputChange}
        value={values.email}
      />
      <input
        placeholder="Address"
        name="address"
        onChange={handleInputChange}
        value={values.address}
      />
      <button type="submit">{currentId === "" ? "Save" : "Update"}</button>
    </form>
  );
};

ContactForm.propTypes = {
  addOnEdit: PropTypes.func,
  currentId: PropTypes.string,
  contactObjects: PropTypes.object,
};
ContactForm.defaultProps = {
  addOnEdit: () => false,
  currentId: "",
  contactObjects: {},
};

export default ContactForm;
