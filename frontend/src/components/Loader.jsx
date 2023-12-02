
import loading from "../assets/animation2.gif"
const Loader = () => {
  return (
    <div className='flex h-[100vh] w-[100vw] justify-center items-center'>
        <img className="my-3 h-[30vh]" src={loading} alt="loading" />
      </div>
  )
}

export default Loader