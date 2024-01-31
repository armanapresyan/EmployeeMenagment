import Modal from "../../helper/Modal/Modal";
import { useDispatch } from "react-redux";
import {  useState } from "react";
import { deleteEmployee, editEmployee } from "../../app/feature/crudSlice";

function Employee({ employee, index }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const onHandelEdit = () => {
    let salary$ = salary + "$";
    dispatch(
      editEmployee({
        id: employee.id,
        name,
        lastName,
        email,
        salary$,
        date,
      })
    );

   setName("");
   setLastName("");
   setEmail("");
   setSalary("");
   setDate(new Date().toISOString().split("T")[0]);

  
    setIsOpen(!isOpen);
  };


  
  const onHandleDelete = () => {
    dispatch(deleteEmployee(employee.id));
  };

  return (
    <tbody>
      <tr>
        <td>{1 + index}</td>
        <td>{employee?.name}</td>
        <td>{employee?.lastName}</td>
        <td>{employee?.email}</td>
        <td>{employee?.salary$}</td>
        <td>{employee?.date}</td>
        <td>
          <button onClick={onClose}>Edit</button>
          <button onClick={onHandleDelete}>Delete</button>
        </td>
      </tr>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="addModal">
            <input
              className="inputField"
              type="text"
              lable="First Name"
              placeholder="First Name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <input
              className="inputField"
              type="text"
              lable="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
            />
            <input
              className="inputField"
              type="email"
              lable="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <input
              className="inputField"
              type="text"
              lable="salary"
              placeholder="salary"
              value={salary}
              onChange={(evt) => setSalary(evt.target.value)}
            />
            <input
              className="inputField"
              type="date"
              label="date"
              placeholder="date"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
            />
            <div className="adddiv">
              <button className="addButton" onClick={onHandelEdit}>Edit</button>
            </div>
          </div>
        </Modal>
      )}
    </tbody>
  );
}

export default Employee;
