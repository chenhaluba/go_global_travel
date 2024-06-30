import './css/App.css';
import Homepage from './pages/Homepage';
import React from 'react';
import LogoImage from './go-global-travel.png';


const App= () => {
  return (
    <div className="App">
      <header className="App-header">
      <img src={LogoImage} alt="Logo" className='AppLogo' />
        <h1 style={{marginTop:0}}>Status Audit Of Jobs</h1>
        <Homepage/>
      </header>
    </div>
  );
}

export default App;
