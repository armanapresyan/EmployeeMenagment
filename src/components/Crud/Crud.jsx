import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./Crud.css";
import Employee from "../Employee/Employee";
import { fetchEmployee } from "../../app/feature/crudSlice";

function Crud() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

const employee = useSelector((state) => state.crud.employee);
  const loading = useSelector((state) => state.crud.loading);
  const error = useSelector((state) => state.crud.error);


  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <div className="wrapper">
      <div className="wrapertables">
        <table className="tables">
          <thead>
            <tr>
              <th>N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {employee.length && employee.map((employe, index) => (
            <Employee key={employe.id} employee={employe} index={index}/>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Crud;