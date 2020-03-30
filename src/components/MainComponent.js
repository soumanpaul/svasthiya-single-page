import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './sd';

class Main extends Component {
  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/contact" component={() => <Contact />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
