import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';


class Main extends Component {
  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
