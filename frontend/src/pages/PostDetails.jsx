import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
const PostDetails = () => {
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center space-x-3">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 uses of artificial intelligence in day to day life
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              <BiEdit />
            </p>
            <p className="cursor-pointer">
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@sneshasisdev</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>
        <img
          src="https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg"
          className="w-full mx-auto mt-8"
          alt=""
        />
        <p className="mx-auto mt-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod esse,
          voluptas quidem libero iure vitae laborum facere. Facilis sit enim
          necessitatibus quasi quas ullam nobis fugiat voluptas? At aperiam
          placeat nihil accusantium dolorem voluptatibus, dolorum deserunt
          similique doloribus! Culpa commodi ut quas eveniet aspernatur a
          molestias expedita illum quaerat aperiam, labore, tempora facere
          provident? Animi dolore dolorem ratione nobis iure saepe veniam
          placeat soluta excepturi corporis. Fugiat, autem illo omnis quis
          praesentium maiores accusamus illum recusandae quam. Odio quam iste
          maiores animi voluptates similique omnis repellendus sapiente
          cupiditate culpa numquam debitis qui, eligendi obcaecati dolorem
          dolores voluptatibus vero ratione nulla excepturi, reprehenderit
          commodi est repellat minus. Unde cupiditate optio temporibus
          voluptatibus aliquid sint officiis repellendus, provident ipsam,
          deleniti itaque quia perspiciatis qui quidem et voluptates animi cum!
          Sequi eum neque, quaerat rem laborum error beatae facere aliquam
          accusamus! Nemo amet, facere consequatur, aliquam aliquid corporis
          explicabo, consequuntur magnam quisquam accusantium iure. Voluptatibus
          ab alias impedit sit minus nostrum laborum aliquam facilis dignissimos
          vitae, ut iure! Assumenda quaerat sint mollitia dolore recusandae,
          maxime voluptatibus rerum, neque quae a ipsam dicta magni esse
          accusantium possimus commodi? Sed quae animi, itaque natus ipsum
          consectetur amet at adipisci eius commodi explicabo iusto iste debitis
          corporis tenetur assumenda eum perspiciatis incidunt ab asperiores
          nobis quia officiis. Dolorum facilis unde inventore, debitis
          consectetur, placeat est praesentium rerum nemo vitae perferendis odio
          assumenda voluptatum sapiente sequi iure minima labore quas? Facilis
          iure, inventore laudantium impedit nesciunt adipisci dolor culpa, esse
          eveniet corporis reiciendis enim alias saepe ab magnam ut deleniti
          molestiae incidunt exercitationem commodi, architecto laboriosam vel
          ea quae. Minima, laudantium possimus tempora earum corrupti provident
          laborum soluta iusto, tenetur reprehenderit maiores consectetur rem
          officia odio. Reprehenderit libero, atque quia neque quasi error
          eligendi fuga vel consequuntur quos at, eveniet assumenda sint eaque
          nam. Ipsa necessitatibus nihil sint sed ullam, neque modi ad
          aspernatur quasi ducimus fugiat, nesciunt minus ipsam. Atque nihil
          consequatur eaque repellat pariatur vitae, qui ratione non. Architecto
          eligendi ea repellat, delectus, beatae molestiae fugiat reiciendis
          excepturi molestias dolor voluptates impedit cum. Labore fuga aut
          magnam molestias asperiores sit obcaecati nostrum itaque, placeat
          rerum eligendi ipsam alias cupiditate. Itaque dolore temporibus
          perferendis ut recusandae reprehenderit commodi nobis, ipsum, sapiente
          deleniti officiis eligendi labore veritatis accusamus harum quis quod
          iure repellat molestias incidunt quaerat ratione repellendus aut
          laudantium. Officiis sunt enim placeat sit. Quasi optio, eius sapiente
          nostrum asperiores ipsam necessitatibus cum eos dicta assumenda
          voluptas quidem maxime iure sequi suscipit sed. Hic architecto vel,
          suscipit asperiores optio ut earum voluptates, libero molestias iure
          ipsum? Accusantium unde nulla odio illum ducimus nesciunt, vel, sequi
          distinctio sit, eius hic necessitatibus odit reiciendis vero. Ea
          voluptate pariatur, a necessitatibus quo velit facere temporibus
          doloremque libero voluptatum ipsam, ullam deserunt quis quia ipsum
          molestiae? Architecto, voluptate, ut, nulla modi eos sapiente
          doloremque exercitationem quia dolor error amet! Aliquid harum
          asperiores enim id corporis sapiente eveniet, quae cum unde quasi fuga
          obcaecati. Officia incidunt consequuntur a doloremque! Vitae vero
          blanditiis itaque? Consequuntur, ut voluptatibus. Harum aut laboriosam
          sit nesciunt?
        </p>

        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
          </div>
        </div>
        <div className="flex flex-col mt-4 space-y-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          <Comment/>
          <Comment/>
        </div>
        {/* Write a comment  */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
            placeholder="Write a comment"
            type="text"
          />
          <button className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
        {/* Write a comment ends  */}
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;
