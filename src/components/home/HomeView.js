import React from 'react';
import '../../styles/App.css';
import  TemporaryDrawer from './MenuDrawer.js';

class HomeView extends React.Component {
render(){
  return (
    <div className="App">
      <header className="App-Header-Logo-Panel">
      <div className="logo-panel-activity">
        <button type="button" className="my-concract">
        Mój karnet
        </button>
      </div>  
      <div className="logo-panel-activity">
        <p className="logout-link">
        Wyloguj
        </p>
        </div>
      </header>
      <header className="App-Header-Navigation">
        <TemporaryDrawer/>
      </header>
      <body className="App-Body">
        <p>
        body
        </p>
      </body>
    </div>
  );
}
}

export default HomeView;
