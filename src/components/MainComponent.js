import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

class Main extends Component {
  render() {
    return (
      <div >
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default Main;
