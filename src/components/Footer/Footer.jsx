import React from 'react';
import footerImg from '../../assets/footerImg.png';
import insta from '../../assets/insta.png';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';

function Footer() {
    return (
        <div 
            className='lg:h-[400px] md:h-[600px] sm:h-[640px] min-[320px]:h-[610px]'
            style={{backgroundColor:'#081F37'}}
        >
            <div className='pt-20 2xl:px-52 xl:px-32 lg:px-24 flex flex-col gap-10'>
                <div className='flex lg:flex-row md:flex-col sm:flex-col min-[320px]:flex-col min-[320px]:items-center min-[320px]:justify-center items-center md:gap-10 min-[320px]:gap-6 2xl:gap-60 xl:gap-52 lg:gap-28 justify-center'>
                    <div className='flex items-center justify-center md:size-full min-[320px]:w-[370px] min-[359px]:w-[360px]'>
                        <img src={footerImg} alt="" className=''/>
                    </div>
                    <div className='flex 2xl:gap-20 xl:gap-16 lg:gap-10 md:gap-10 sm:gap-6 min-[320px]:gap-4 md:items-center md:justify-center text-white'>
                        <div className='flex flex-col gap-3'>
                            <span className='font-extrabold md:text-lg min-[320px]:text-sm'>Usefull Links</span>
                            <p className='text-base'>Home</p>
                            <p className='text-base'>About</p>
                            <p className='text-base'>Gallery</p>
                            <p className='text-base'>Batches</p>
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
                                    <img src={insta} alt="" width="35" height="35" /> {/* change the images size to 25*25  468*171 */}
                                    <img src={facebook} alt="" width="35" height="35" />
                                    <img src={youtube} alt="" width="35" height="35" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='lg:px-0 md:mx-24 sm:mx-16'/>
                <p className='text-center font-extrabold text-white text-sm'>S Rami Reddy Educational Society (Residential & Non Residential - Recognised By Govt. of A.P)</p>
            </div>    
        </div>
    )
}

export default Footer;