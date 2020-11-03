import React from "react";
import { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [reps, setReps] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        setReps(response.data);
      })      
      .catch(error => console.error(error));    

  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "https://github.com/pedro-cal/gostack14-conceitos-nodejs.git",
      techs: ["ReactJS","NodeJS","Axios"]
    });

    setReps([...reps, response.data]);
   
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setReps(reps.filter(rep => rep.id !== id));
  }

  return (
    <div>
      {console.log(reps)}
      <ul data-testid="repository-list">
        {reps.length > 0 ? reps.map(rep => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
          </li>
        )) : null}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
