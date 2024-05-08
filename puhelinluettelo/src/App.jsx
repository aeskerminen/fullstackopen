import { useEffect, useState } from "react";

import services from "./services/persons";
import axios from "axios";

const Filter = (props) => {
  return (
    <p>
      filter shown with a <input value={props.value} onChange={props.handler} />
    </p>
  );
};

const goodAlertStyle = {
  'color': 'green',
  'padding': '1rem',
  'border': '2px solid green',
  'maxHeight': '20px',
  'fontSize': '1rem',
  'borderRadius': '0.5rem'
}

const badAlertStyle = {
  'color': 'red',
  'padding': '1rem',
  'border': '2px solid red',
  'maxHeight': '20px',
  'fontSize': '1rem',
  'borderRadius': '0.5rem'
}

const Notification = ({ message, notifStyle }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error" style={notifStyle}>
      {message}
    </div>
  );
};

const Form = (props) => {
  return (
    <form onSubmit={props.newNameHandler}>
      <div>
        name: <input value={props.name} onChange={props.changeNameHandler} />
        number:{" "}
        <input value={props.number} onChange={props.changeNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      ).map((person, i) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person.id)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  const [addNotificationMsg, setAddNotificationMsg] = useState(null);
  const [errorNotificationMsg, setErrorNotificationMsg] = useState(null);

  useEffect(() => {
    services.getPersons().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleNewName = (event) => {
    event.preventDefault();
    let found = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name == newName) {
        found = true;
        break;
      }
    }

    if (!found) {
      services.createPerson({ name: newName, number: newNumber })
        .then((data) => {
          setPersons(persons.concat(data));
          setAddNotificationMsg(`Added ${newName}`);
          setTimeout(() => {
            setAddNotificationMsg(null);
          }, 5000);
        }).catch(error => {
          setErrorNotificationMsg(error.response.data);
          setTimeout(() => {
            setErrorNotificationMsg(null);
          }, 5000);
        });
    } else {
      if (
        confirm(
          `${newName} is already added to the phonebook. Replace number with the new one?`,
        )
      ) {
        const cur = persons.find((p) => p.name === newName);
        services.changeNumber(cur.id, cur, newNumber).catch(() => {
          setErrorNotificationMsg(`Information of ${newName} has already been removed from the servers.`);
          setTimeout(() => {
            setErrorNotificationMsg(null);
          }, 5000);
        });
        setPersons(
          persons.map((p) =>
            (p.name !== cur.name) ? p : { ...cur, number: newNumber }
          ),
        );
      }
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    if (confirm("Delete " + persons.find((p) => p.id === id).name + " ?")) {
      services.deletePerson(id)
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addNotificationMsg} notifStyle={goodAlertStyle}></Notification>
      <Notification message={errorNotificationMsg} notifStyle={badAlertStyle}></Notification>
      <Filter value={filter} handler={handleChangeFilter}></Filter>
      <h2>Add a new</h2>
      <Form
        number={newNumber}
        name={newName}
        newNameHandler={handleNewName}
        changeNameHandler={handleChangeName}
        changeNumberHandler={handleChangeNumber}
      >
      </Form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}>
      </Persons>
    </div>
  );
};

export default App;
