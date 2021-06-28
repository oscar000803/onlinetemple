import './App.css';
import usePage from './hooks/usePage';
import useName from './hooks/useName';
import Home from './containers/Home';
import Incense from './containers/Incense';
import Straw from './containers/Straw';
import Divination from './containers/Divination';
import Light from './containers/Light';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const { mode, changePage } = usePage();
  const { name, signIn, signOut, hasLight, turnLight } = useName();

  return(
    <>
      <Header mode={mode} changePage={changePage} name={name} signIn={signIn} signOut={signOut}/>
      {(() => {
        switch (mode) {
          case 'Home':
            return <Home changePage={changePage}/>;
          case 'Incense':
            return <Incense name={name}/>;
          case 'Straw':
            return <Straw name={name}/>;
          case 'Divination':
            return <Divination name={name}/>;
          case 'Light':
            return <Light name={name} hasLight={hasLight} turnLight={turnLight}/>;
        }
      })()}
      <Footer />
    </>
  )
}

export default App;
