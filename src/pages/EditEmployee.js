import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validator from "validator";
import { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";
import "../Form.css";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: grey;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
`;

const EditEmployee = () => {
  const { employee } = useContext(EmployeeContext);
  const [name, setName] = useState(employee.name);
  const [age, setAge] = useState(employee.age);
  const [email, setEmail] = useState(employee.email);
  const [date_of_birth, setDate_Of_Birth] = useState(
    new Date(employee.date_of_birth)
  );
  const [address, setAddress] = useState(employee.address);
  const [photo, setPhoto] = useState();

  var emailCheck = false;
  var ageCheck = false;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail(email);
    validateAge(age);

    if (emailCheck && ageCheck) {
      try {
        const res = await axios.patch(
          "http://localhost:3001/api/employees/update",
          {
            id: employee._id,
            name: name,
            age: age,
            email: email,
            date_of_birth: date_of_birth,
            address: address,
            photo: photo,
          }
        );
        if (res.data.name) {
          alert("Employee Updated Successfully");
          setName("");
          setEmail("");
          setAge("");
          setDate_Of_Birth("");
          setAddress("");
          setPhoto("");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/editEmp");
    }
  };

  const onNameChange = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setName(value);
    } else {
      alert("Only alphabets allowed in Name");
    }
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmail(email);
      emailCheck = true;
    } else {
      alert("Enter valid Email!");
    }
  };

  const validateAge = (age) => {
    if (isNaN(age)) {
      alert("Age can only be a number");
    } else {
      setAge(age);
      ageCheck = true;
    }
  };

  return (
    <Container>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          height: "40%",
          width: "40%",
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e)}
          placeholder="Name"
        ></input>

        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        ></input>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>

        <DatePicker
          selected={date_of_birth}
          onChange={(date) => setDate_Of_Birth(date)}
        />

        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        ></input>

        <input
          type="text"
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo"
        ></input>

        <button onClick={(e) => handleSubmit(e)}>Update Employee</button>
        <button onClick={() => navigate("/")}>Go to Dashboard</button>
      </form>
    </Container>
  );
};

export default EditEmployee;
