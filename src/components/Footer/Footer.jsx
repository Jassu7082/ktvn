import React from 'react';
import footerImg from '../../assets/footerImg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className='lg:h-[400px] md:h-[600px] sm:h-[640px] min-[320px]:h-[610px]' style={{backgroundColor:'#081F37'}}>
            <div className='pt-20 2xl:px-52 xl:px-32 lg:px-24 flex flex-col gap-10'>
                <div className='flex lg:flex-row md:flex-col sm:flex-col min-[320px]:flex-col min-[320px]:items-center min-[320px]:justify-center items-center md:gap-10 min-[320px]:gap-6 2xl:gap-60 xl:gap-52 lg:gap-28 justify-center'>
                    <div className='flex items-center justify-center md:size-full min-[320px]:w-[370px] min-[359px]:w-[360px]'>
                        <img src={footerImg} alt="Footer" className=''/>
                    </div>
                    <div className='flex 2xl:gap-20 xl:gap-16 lg:gap-10 md:gap-10 sm:gap-6 min-[320px]:gap-4 md:items-center md:justify-center text-white'>
                        <div className='flex flex-col gap-3'>
                            <span className='font-extrabold md:text-lg min-[320px]:text-sm'>Useful Links</span>
                            <button className='text-base' onClick={() => handleNavigate('/')}>Home</button>
                            <button className='text-base' onClick={() => handleNavigate('/about')}>About</button>
                            <button className='text-base' onClick={() => handleNavigate('/gallery')}>Gallery</button>
                            <button className='text-base' onClick={() => handleNavigate('/batches')}>Batches</button>
                        </div>
                        <div className='flex flex-col gap-3 sm:full-size min-[320px]:max-w-[230px]'>
                            <div className='flex flex-col'>
                                <span className='font-extrabold md:text-lg pb-6 min-[320px]:text-sm'>Contact Information</span>
                                <span className='text-base'>Phone: +91 9030088545</span>
                                <span className='text-base'>Email: kakatiyavidyaniketn@gmail.com</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-extrabold md:text-lg min-[320px]:text-sm'>Connect</p>
                                <div className='flex gap-2'>
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white hover:text-gray-400" />
                                    </a>
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white hover:text-gray-400" />
                                    </a>
                                    <a href="https://youtube.com/@kakatiyavidyanikethanemsch2239" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faYoutube} size="2x" className="text-white hover:text-gray-400" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='lg:px-0 md:mx-24 sm:mx-16'/>
                <p className='text-center font-extrabold text-white text-sm'>S Rami Reddy Educational Society (Residential & Non Residential - Recognised By Govt. of A.P)</p>
            </div>    
        </div>
    );
}

export default Footer;