import React from 'react';
import FormComponent from './FormComponent'
import Testes from './TestesComponent';

function Home() {
    return (
        <div className="container">
            <Testes />
            <FormComponent />
        </div>
    );
}
export default Home;