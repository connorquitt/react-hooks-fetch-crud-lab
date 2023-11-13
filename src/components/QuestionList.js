import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import App from "./App";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(q => setQuestions(q))
  }, [App, handleDelete])

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(data => console.log(data.id))
  }

  function handleChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex
      })
    })
    .then(r => r.json())
    .then(data => console.log(data))
  }
 
  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      handleDelete={handleDelete}
      handleAdd={handleChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
