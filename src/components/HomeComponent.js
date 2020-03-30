import React from 'react';
import FormComponent from './FormComponent'
import TextComponent from './TextComponent';

function Home() {
    return (
        <div className="container">
            <TextComponent />
            <FormComponent />
        </div>
    );
}
export default Home;