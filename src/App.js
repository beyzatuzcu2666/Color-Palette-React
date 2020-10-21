import React, { Component } from 'react';
import ColorPalette from './ColorPalette';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notfound from './components/NotFound'

class App extends Component {
 


  render() {
    return (
        <Router>
			<Switch>
				<Route exact path="/palette/:colors?" component={ColorPalette} />
				<Route component = {Notfound}/>
			</Switch>
    	</Router>
    );
  }
}

export default App;