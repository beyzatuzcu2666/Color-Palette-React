import React, { Component } from 'react';
import ColorPalette from './ColorPalette';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
			<Switch>
				<Route path="/palette/:colors?" component={ColorPalette} />
			</Switch>
    	</Router>
    );
  }
}

export default App;