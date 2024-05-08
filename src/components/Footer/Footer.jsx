import React from 'react';
import footerImg from '../../assets/footerImg.png';
import insta from '../../assets/insta.png';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';

function Footer() {
    return (
        <div 
            className='h-[400px]'
            style={{backgroundColor:'#081F37'}}
        >
            <div className='pt-20 px-52 flex flex-col gap-10'>
                <div className='flex gap-60 justify-center'>
                    <div>
                        <img src={footerImg} alt="" />
                    </div>
                    <div className='flex gap-20 text-white'>
                        <div className='flex flex-col gap-3'>
                            <p className='font-extrabold text-lg'>Usefull Links</p>
                            <p className='text-base'>Home</p>
                            <p className='text-base'>About</p>
                            <p className='text-base'>Gallery</p>
                            <p className='text-base'>Batches</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col'>
                                <p className='font-extrabold text-lg pb-6'>Contact Information</p>
                                <p className='text-base'>Phone: +91 9030088545</p>
                                <p className='text-base'>Email: kakatiyavidyaniketn@gmail.com</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-extrabold text-lg'>Connect</p>
                                <div className='flex gap-2'>
                                    <img src={insta} alt="" width="35" height="35" /> {/* change the images size to 25*25 */}
                                    <img src={facebook} alt="" width="35" height="35" />
                                    <img src={youtube} alt="" width="35" height="35" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className='text-center font-extrabold text-white text-sm'>S Rami Reddy Educational Society (Residential & Non Residential - Recognised By Govt. of A.P)</p>
            </div>    
        </div>
    )
}

export default Footer;