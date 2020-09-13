import React from "react";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = (props) => {
  const [contactObjects, setContactObjects] = React.useState({});
  const [currentId, setCurrentId] = React.useState("");
  React.useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapShot) => {
      if (snapShot.val() !== null) {
        setContactObjects({
          ...snapShot.val(),
        });
      } else {
        setContactObjects({});
      }
    });
  }, []);

  const addOnEdit = (obj) => {
    if (currentId === "") {
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    } else {
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Are you to delete record?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  return (
    <div>
      <h2>Customer Register</h2>
      <ContactForm {...{ addOnEdit, currentId, contactObjects }} />
      <div>List of contacts</div>
      <table>
        <thead>
          <tr>
            <td>Full Name</td>
            <td>Mobile</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(contactObjects).map((id) => (
            <tr key={id}>
              <td>{contactObjects[id].address}</td>
              <td>{contactObjects[id].email}</td>
              <td>{contactObjects[id].fullName}</td>
              <td>{contactObjects[id].mobile}</td>
              <td>
                <button onClick={() => setCurrentId(id)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Contacts.propTypes = {};
Contacts.defaultProps = {};

export default Contacts;
