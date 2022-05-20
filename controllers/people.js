import people_data from "../data/people_data.json" assert { type: "json" };
import fs from "fs";
import path from "path";

// Absolute path to the people_data file
const peopleDataPath = path.resolve("data/people_data.json");

// Get people from /people
const getPeople = (req, res) => {
  console.log("GET people_data Request Received");
  res.json({ success: true, data: people_data });
};

// Create Person in /people
const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.json({ success: false, message: "Enter proper data" });
  }
  console.log("CREATE people Request Received");
  const newPersonObj = {
    id: people_data.length + Math.floor(Math.random() * 1234),
    name: name,
  };

  const newPeopleData = [...people_data, newPersonObj];
  fs.writeFileSync(peopleDataPath, JSON.stringify(newPeopleData));
  res.status(201).json({ message: "Person created", data: newPersonObj });
};

// Delete person from /people
const deletePerson = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json({ success: false, message: "Enter proper ID" });
  }
  const newPeopleData = people_data.filter((item) => item.id !== Number(id));

  fs.writeFileSync(peopleDataPath, JSON.stringify(newPeopleData));
  res.status(202).json({
    message: `Person with ID: ${id} has been deleted`,
    data: newPeopleData,
  });
};

// Update a person from /people
const updatePerson = (req, res) => {
  const { id, name } = req.body;
  const oldPersonObject = people_data.find((elem) => elem.id === Number(id));
  const indexOfOldPersonObject = people_data.indexOf(oldPersonObject);
  people_data[indexOfOldPersonObject] = {
    id: people_data.length + Math.floor(Math.random() * 1234),
    name: name,
  };
  const newPeopleData = [...people_data];
  fs.writeFileSync(peopleDataPath, JSON.stringify(newPeopleData));
  res.status(202).json({
    message: `Person with ID: ${id} has been updated`,
    data: newPeopleData,
  });
};

export { getPeople, createPerson, deletePerson, updatePerson };
