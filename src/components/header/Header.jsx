import {  useEffect, useState, useCallback } from "react";
import "./Header.css";
import Modal from "../../helper/Modal/Modal";
import { addEmployee, fetchEmployee, searchEmployee } from "../../app/feature/crudSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IoIosSearch } from "react-icons/io";

function Header() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  const onHandleAdd = () => {
    let salary$ = salary + " $";
    formatDate(date);
    dispatch(
      addEmployee({
        name,
        lastName,
        email,
        salary$,
        date,
        id: uuidv4(),
      })
    );
    setName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsOpen(!isOpen);
  };

  
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(searchEmployee(value));
    }, 500),
    [dispatch]
  );
  
  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch, search]);
  
  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  return (
    <div className="headerwrapper">
      <div className="employe">
        <h1>Employee Menagment Software</h1>
      </div>
      <div className="buttonsDiv">
        <button className="addButton" onClick={onClose}>
          Add Employee
        </button>
        <div className="searchDiv">
          <span className="searchIcon">
            <IoIosSearch />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
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
              <button className="addButton" onClick={onHandleAdd}>
                Add
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Header;
