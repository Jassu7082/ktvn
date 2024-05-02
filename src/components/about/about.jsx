import React from 'react';
import Navbar from '../navbar/navbar';

const About = () => {
    return (
        <div>
        <Navbar />
            <h1 className='text-2xl'>About Page</h1>
            <p>This is the about page of our application.</p>
        </div>
    );
};

export default About;