import './App.css';
import usePage from './hooks/usePage';
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
  const [ name, setName ] = useState("匿名");

  return(
    <>
      <Header mode={mode} changePage={changePage} name={name} setName={setName}/>
      {(() => {
        switch (mode) {
          case 'Home':
            return <Home changePage={changePage}/>;
          case 'Incense':
            return <Incense name={name}/>;
          case 'Straw':
            return <Straw/>;
          case 'Divination':
            return <Divination name={name}/>;
          case 'Light':
            return <Light name={name}/>;
        }
      })()}
      <Footer />
    </>
  )
}

export default App;
