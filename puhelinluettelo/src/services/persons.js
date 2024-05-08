import axios from "axios";
//const baseUrl = "http://localhost:9999/api/persons/";
const baseUrl = "/api/persons/";

const createPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((response) => response.data);
};

const deletePerson = (id) => {
  axios.delete(baseUrl + id);
};

const changeNumber = (id, current, newNumber) => {
  const req = axios.put(baseUrl + id, {
    ...current,
    number: newNumber,
  })
  return req.then()
};

const getPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

export default { createPerson, deletePerson, changeNumber, getPersons };
