import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #d9e3da;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  background-color: #c6d5d2;
  height: 50px;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  border-radius: 5px;
  border: solid 1px;
`;

const ListContainer = styled.div`
  width: 50%;
  height: 200px;
  background-color: teal;
  overflow: scroll;
  background-color: #d9e3da;
  border-radius: 5px;
  border: solid 1px;
`;

const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IconContainer = styled.span`
  align-items: flex-end;
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { addEmployee } = useContext(EmployeeContext);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/employees");
      setEmployees(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (emp) => {
    addEmployee(emp);
    navigate("/editEmp");
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3001/api/employees/delete/" + id
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header
          style={{ display: "flex", fontWeight: "600", border: "solid 1px " }}
        >
          List of Employees
        </Header>
        <Header>
          <Button
            style={{
              border: "solid 0.5px",
              backgroundColor: "black",
              color: "white",
              display: "flex",
              height: "100%",
              width: "100%",
            }}
            onClick={() => navigate("/addEmp")}
          >
            Add Employee
          </Button>
        </Header>
      </HeaderContainer>
      <ListContainer>
        <List>
          {employees.map((item) => (
            <ListItem key={item._id}>
              <ListItemContainer>
                {item.name}
                <IconContainer>
                  <EditIcon onClick={() => handleEdit(item)} />
                  <DeleteIcon onClick={() => handleDelete(item._id)} />
                </IconContainer>
              </ListItemContainer>
            </ListItem>
          ))}
        </List>
      </ListContainer>
    </Container>
  );
};

export default EmployeeList;
