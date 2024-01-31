import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  employee: [],
  loading: false,
  error: null,
};

export const fetchEmployee = createAsyncThunk(
  "crud/fetchEmployee",
  async () => {
    try {
      const tasksRef = collection(db, "employee");
      const snapshot = await getDocs(tasksRef);

      const employee = snapshot.docs.map((doc) => doc.data());

      return employee;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }
);

export const addEmployee = createAsyncThunk(
  "crud/addEmployee",
  async (newEmployee, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "employee"), newEmployee);
      return { id: docRef.id, ...newEmployee };
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const editEmployee = createAsyncThunk(
  "crud/editEmployee",
  async ({ id, name, lastName, email, salary$, date }) => {
    try {
      const employeeRef = collection(db, "employee");
      const q = query(employeeRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      const matchingDoc = querySnapshot.docs.find(
        (doc) => doc.data().id === id
      );

      if (matchingDoc) {
        const employeeDocRef = doc(db, "employee", matchingDoc.id);

        await updateDoc(employeeDocRef, {
          name,
          email,
          salary$,
          date,
          lastName,
        });

        return {
          id,
          name,
          lastName,
          email,
          salary$,
          date,
        };
      } else {
        console.error("No matching document found for the given ID");
        throw new Error("No matching document found for the given ID");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "crud/deleteEmployee",
  async (employeeId) => {
    try {
      const tasksRef = collection(db, "employee");
      const q = query(tasksRef, where("id", "==", employeeId));
      const querySnapshot = await getDocs(q);

      const matchingDoc = querySnapshot.docs.find(
        (doc) => doc.data().id === employeeId
      );

      if (matchingDoc) {
        const todoRef = doc(db, "employee", matchingDoc.id);
        await deleteDoc(todoRef);

        return employeeId;
      } else {
        console.error("No matching document found for the given ID");
        throw new Error("No matching document found for the given ID");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }
);

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    searchEmployee: (state, action) => {
      const searchTerm = action.payload.toLowerCase();

      const originalEmployees = state.employee;

      state.searchQuery = action.payload; 

      if (searchTerm === "") {
        state.employee = originalEmployees;
      } else {
        state.employee = originalEmployees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.salary$.toLowerCase().includes(searchTerm) ||
            employee.date.includes(searchTerm)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employee.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.loading = false;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const { id, name, lastName, email, salary$, date } = action.payload;
        const updatedEmployeeIndex = state.employee.findIndex(
          (employee) => employee.id === id
        );

        if (updatedEmployeeIndex !== -1) {
          state.employee[updatedEmployeeIndex] = {
            ...state.employee[updatedEmployeeIndex],
            name:
              name !== undefined
                ? name
                : state.employee[updatedEmployeeIndex].name,
            lastName:
              lastName !== undefined
                ? lastName
                : state.employee[updatedEmployeeIndex].lastName,
            email:
              email !== undefined
                ? email
                : state.employee[updatedEmployeeIndex].email,
            salary$:
              salary$ !== undefined
                ? salary$
                : state.employee[updatedEmployeeIndex].salary$,
            date:
              date !== undefined
                ? date
                : state.employee[updatedEmployeeIndex].date,
          };
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const deletedEmployeeId = action.payload;
        state.employee = state.employee.filter(
          (employee) => employee.id !== deletedEmployeeId
        );
        state.loading = false;
        state.error = null;
      });
  },
});

export const { searchEmployee } = crudSlice.actions;

export default crudSlice.reducer;
