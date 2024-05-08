import React from 'react';
import school from '../../assets/school.jpg'; // Corrected import statement for the school image
import Slider from './slider';
import cont3img1 from '../../assets/cont3img1.png';
import cont3img2 from '../../assets/cont3img2.png';
import cont3img3 from '../../assets/cont3img3.png';
function Home() {
    return (
        <div>
            <div className="h-screen hidden sm:block flex justify-center items-center">
                <img src={school} alt="Home" className="h-full w-full object-fit" />
            </div>
            <div className="grid grid-rows-2 lg:grid-cols-2 gap-20 m-10 h-lvh">
                <div>
                    <center><h1 className='text-xl'>Why Choose Us?</h1></center>
                    <p>Our distinguished faculty, equipped with advanced degrees, is devoted to  inspiring and nurturing students, fostering a supportive learning  environment where individuality thrives. Through personalized attention,  they uncover each student's unique strengths, interests, and goals,  guiding them towards academic excellence while cultivating creativity  and critical thinking. We prioritize a holistic approach to education,  valuing self-respect and respect for others, instilling enduring values  that transcend the confines of the classroom</p>
                </div>
                <div>
                    <Slider />
                </div>
            </div>
            <div 
                className='h-lvh flex justify-center items-center gap-36'
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #081F37 3%, #52D3D8 100%)',
                }}
            >
                <Programs image={cont3img1} content="Our educators blend academic expertise with real-world insights,  cultivating a dynamic learning environment. They inspire, engage, and  empathize with students, nurturing their individuality and aspirations.  With advanced degrees and a passion for teaching, they personalize  instruction to meet diverse learning styles"/>
                <Programs image={cont3img2} content="We blend child-led exploration, group learning, and guided skill  development to achieve our children's goals. Our seamless daily schedule  integrates indoor and outdoor activities, fostering comprehension  across diverse concepts. Specialized sessions in dedicated areas further  enrich their learning experiences." />
                <Programs image={cont3img3} content="Our program nurtures students' skills in fine art, dance, and drama,  fostering confidence, creativity, and teamwork. Core values of kindness,  respect, and integrity define our ethos, where mutual support and  celebration of achievements are paramount. Each student is valued and  expected to extend respect to peers, forming a supportive community." />                
            </div>
        </div>
    );
}

function Programs(props) {
    return (
        <div className='flex flex-col justify-center items-center max-w-80 h-[568px]'>
            <div>
                <img src={props.image} alt="" height="300"/>
            </div>
            <div className='text-center text-white pt-12'>
                <p>{props.content}</p>
            </div>
        </div>
    );
}

export default Home;
