import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-8 w-full bg-black px-8 md:px-[500px] md:flex-row flex-col flex md:justify-between md:space-y-0 space-y-3 text-sm md:text-md py-8'>
        <div className='flex flex-col text-white'>
            <p>Featured Blogs</p>
            <p>Most viewed</p>
            <p>Readers Choice</p>
        </div>
        <div className='flex flex-col text-white'>
            <p>Forum</p>
            <p>Support</p>
            <p>Recent Posts</p>
        </div>
        <div className='flex flex-col text-white'>
            <p>Privacy Policy</p>
            <p>About Us</p>
            <p>Terms & Conditions</p>
            <p>Terms of service</p>
        </div>
    </div>
    <p className='py-2 pb-2 text-center text-white bg-black'>All rights reserved @SnapWrite</p>
    </>
  )
}

export default Footer