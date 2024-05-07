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
            <div className='grid w-lvw grid-rows-3 lg:grid-cols-3 gap-4 ">'>
            <div>
                <img src={school} alt="Home" className="h-[300px] w-[300px] " />
                <p className="w-[300px] text-justify">Our educators blend academic expertise with real-world insights,  cultivating a dynamic learning environment. They inspire, engage, and  empathize with students, nurturing their individuality and aspirations.  With advanced degrees and a passion for teaching, they personalize  instruction to meet diverse learning styles</p>
            </div>
            <div>
                <img src={school} alt="Home" className="h-[300px] w-[300px] " />
                <p className="w-[300px] text-justify">We blend child-led exploration, group learning, and guided skill  development to achieve our children's goals. Our seamless daily schedule  integrates indoor and outdoor activities, fostering comprehension  across diverse concepts. Specialized sessions in dedicated areas further  enrich their learning experiences.</p>
            </div>
            <div>
                <img src={school} alt="Home" className="h-[300px] w-[300px] " />
                <p className="w-[300px] text-justify">Our program nurtures students' skills in fine art, dance, and drama,  fostering confidence, creativity, and teamwork. Core values of kindness,  respect, and integrity define our ethos, where mutual support and  celebration of achievements are paramount. Each student is valued and  expected to extend respect to peers, forming a supportive community.</p>
            </div>
            </div>
            </div>
        </div>
    );
}

export default Home;
