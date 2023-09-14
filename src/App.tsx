import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Hero from "./Components/Hero";
import Feaders from "./Components/Feaders";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div className="App">
        <Header />
        {/*<Hero />*/}
        {/*<Feaders />*/}

        <SignUp />
    </div>
  );
}

export default App;
