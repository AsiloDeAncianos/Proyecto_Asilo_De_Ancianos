import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";

function InstAsiloLista({instAsilos}) {
  return (
    <>
        <Layout>
          <Link href="/institucionAsiloMenu">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          {instAsilos.map((instAsilo) => (
          <Link href={`/institucionAsilo/${instAsilo.ID}`} key={instAsilo.ID}>
              <div className="border border-gray-200 shadow-md p-6 mx-12 my-3">
              <h1 className="text-gray-700">{instAsilo.Nombre}</h1>
              <p className="text-gray-700">{instAsilo.NIT}</p>
              <p className="text-gray-700">{instAsilo.NombreRepresentantePrincipal}</p>
              </div>
          </Link>
          ))}
        </Layout>
    </>
  );
}

export const getServerSideProps = async context => {
  const {data: instAsilos} = await axios.get(
    'http://localhost:3000/api/instAsilos'
  )

  return {
    props: {
      instAsilos,
    },
  };
};

export default InstAsiloLista