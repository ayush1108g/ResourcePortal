import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./studentSideBarModal.module.css";
import { ToLink } from "../../Contents/Main";

function MemStuSidebarModal(props) {
  const [students, setStudents] = useState([ ]);

  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
const xid = localStorage.getItem('id');
const id = xid.slice(0, -4);
//console.log(id);
      const response = await axios.get(`${ToLink}/student/signup/${id}`);
    //  console.log(response.data.data.newStudent);
      setStudents(response.data.data.newStudent);
    } catch (error) {
      // console.error("Error fetching students:", error);
    }
  };

  return (
    <div className={classes.sidebar} onClick={props.onChangeModal}>
      {
        <div className={classes.modal}>
          <div className={classes["modal-content"]}>
            <h2 className={classes["modal-title"]}>Your Students</h2>
            <ul className={classes["student-list"]}>
              {students.map((student) => (
                <li key={student._id} className={classes["student-item"]}>
                  <strong>Name:</strong> {student.name}
                  <br />
                  <strong>Email:</strong> {student.emailid}
                  <br />
                  <strong>Phone:</strong> {student.phoneno}
                </li>
              ))}
            </ul>
            <button
              className={classes["close-button"]}
              onClick={props.onChangeModal}
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default MemStuSidebarModal;
