import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Hero from "./Components/Hero";
import Feaders from "./Components/Feaders";

function App() {
  return (
    <div className="App">
        <Header />
        {/*<Hero />*/}
        <Feaders />
      {/*<header className="">*/}
      {/*    <h1 className="text-3xl font-bold underline text-red-600">*/}
      {/*        Simple React Typescript Tailwind Sample*/}
      {/*    </h1>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
