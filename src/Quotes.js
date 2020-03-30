import React, { useState, useEffect } from "react";

export default () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState("")
  const [unsubscribe, setUnsubscribe] = useState(false)

  useEffect(() => {
    fetch('https://api.quotable.io/quotes?limit=10')
      .then(res => res.json())
      .then(qs => {
        console.log("calling api")
        setQuotes(qs.results.map(q => q.content))
      })

    return () => console.log("cleaning up")
  }, []);

  function getRandomQuote() {
    const index = Math.floor(Math.random() * Math.floor(quotes.length));
    setRandomQuote(quotes[index]);
  }

  return (
    <>
      {!unsubscribe && <DisplayQuote quote={randomQuote}
        onNext={getRandomQuote}
        onUnsubscribe={() => setUnsubscribe(true)} />}
      {unsubscribe && <UnSubscribe />}
    </>
  );
};

const DisplayQuote = ({ quote, onNext, onUnsubscribe }) => (
  <>
    <h1>Random Quote</h1>
    <p>{quote}</p>
    <button onClick={onNext}>Next</button>
    <button onClick={onUnsubscribe}>UnSubscribe</button>
  </>
)

const UnSubscribe = () => (
  <h5>You are now unsubscribed!</h5>
)
