import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [Jokes, setJokes] = useState([]);

  axios
    .get("/api/jokes")
    .then((response) => {
      setJokes(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <h1>Code And Jokes</h1>
      <p>JOKES : {Jokes.length}</p>

      {Jokes.map((elem) => {
        return (
          <div key={elem.id}>
            <h2>{elem.title}</h2>
            <p>{elem.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;

