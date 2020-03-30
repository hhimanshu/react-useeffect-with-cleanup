import React, { useState, useEffect } from "react";

export default () => {
  const [randomQuote, setRandomQuote] = useState("")
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('https://api.quotable.io/quotes?limit=10')
      .then(res => res.json())
      .then(qs => {
        console.log("calling api")
        setQuotes(qs.results.map(q => q.content))
      })

    return () => {
      console.log("cleaning up")
      setRandomQuote(undefined)
      setQuotes(undefined)
    }
  }, []);

  useEffect(() => {
    getRandomQuote()
  }, [quotes])

  function getRandomQuote() {
    const index = Math.floor(Math.random() * Math.floor(quotes.length));
    setRandomQuote(quotes[index]);
  }

  return (
    <DisplayQuote quote={randomQuote}
      onNext={getRandomQuote}
    />
  );
};

const DisplayQuote = ({ quote, onNext }) => (
  <>
    <h1>Random Quote</h1>
    <p>{quote}</p>
    <button onClick={onNext}>Next</button>
  </>
)

