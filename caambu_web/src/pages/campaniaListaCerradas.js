import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";

function ListaCerradasCampanias({campanias}) {
  return (
    <>
        <Layout>
          <Link href="/campaniaMenu">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          {campanias.map((campania) => (
          <Link href={`/campania/${campania.ID}`} key={campania.ID}>
            <div className="border border-gray-200 shadow-md p-6 mx-12 my-3">
              <h1 className="text-gray-700">{campania.Nombre}</h1>
              <p className="text-gray-700">{campania.Imagenes}</p>
              {/* <p>{campania.Estado}</p> */}
            </div>
          </Link>
          ))}
        </Layout>
    </>
  );
}

export const getServerSideProps = async context => {
  const {data: campanias} = await axios.get(
    'http://localhost:3000/api/campanias'
  )

  return {
    props: {
        campanias,
    },
  };
};

export default ListaCerradasCampanias