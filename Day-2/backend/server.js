import "dotenv/config";
import express from "express";

const app = express();

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Joke 1",
      content: "This is First Joke",
    },
    {
      id: 2,
      title: "Joke 2",
      content: "This is Second Joke",
    },
    {
      id: 3,
      title: "Joke 3",
      content: "This is Third Joke",
    },
    {
      id: 4,
      title: "Joke 4",
      content: "This is Fourth Joke",
    },
    {
      id: 5,
      title: "Joke 5",
      content: "This is Fifth Joke",
    }
  ];
  res.send(jokes);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
