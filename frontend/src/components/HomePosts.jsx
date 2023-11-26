import React from 'react'

const HomePosts = () => {
  return (
    <div className='w-full flex mt-8 space-x-4 items-center'>
        {/* left  */}
        <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src="https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg" alt="image" className='h-full w-full object-cover self-center'/>
        </div>
        {/* right */}
        <div className='flex flex-col w-[65%]'>
         <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
            10 uses of artificial intelligence in day to day life
         </h1>
         <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@snehasishdev</p>
            <div className="flex space-x-2">
                <p>16/06/2023</p>
                <p>16:45</p>
            </div>
         </div>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus ratione officia modi repellat placeat molestiae vitae? Tempore sed dolore magni asperiores maiores aliquid distinctio accusantium architecto ad odit. Tenetur, earum.</p>
        </div>
    </div>
  )
}

export default HomePosts