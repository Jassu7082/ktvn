import React from 'react';
import school from '../../assets/school.jpg'; // Corrected import statement for the school image
import Slider from './slider';
function Home() {
    return (
        <div>
            <div className="h-screen hidden sm:block flex justify-center items-center">
                <img src={school} alt="Home" className="h-full w-full object-fit" />
            </div>
            <div className="grid  grid-rows-2 lg:grid-cols-2 gap-20 m-10">
            <div>
                <center><h1 className='text-xl'>Why Choose Us?</h1></center>
                <p>Our distinguished faculty, equipped with advanced degrees, is devoted to  inspiring and nurturing students, fostering a supportive learning  environment where individuality thrives. Through personalized attention,  they uncover each student's unique strengths, interests, and goals,  guiding them towards academic excellence while cultivating creativity  and critical thinking. We prioritize a holistic approach to education,  valuing self-respect and respect for others, instilling enduring values  that transcend the confines of the classroom</p>
            </div>
            <div>
                <Slider />
            </div>
            </div>
        </div>
    );
}

export default Home;
