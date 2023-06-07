import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";

function ListaVigentesCampanias({campanias}) {

  return (
    <>
        <Layout>
          <Link href="/campaniaMenu">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          <h1 className="text-black">Campaña Vigentes</h1>

          <table className="border-collapse border border-gray-700 shadow-md mx-12 my-3 bg-gray-200 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-3">Nombre de Campaña</th>
                <th className="border border-gray-700 p-3">Fecha de Inicio</th>
                <th className="border border-gray-700 p-3">Fecha de Cierre</th>
                <th className="border border-gray-700 p-3">Ver</th>
                <th className="border border-gray-700 p-3">Editar</th>
                <th className="border border-gray-700 p-3">Cerrar</th>
              </tr>
            </thead>
            <tbody>
              {campanias.map((campania) => (
                <tr key={campania.ID}>
                  <td className="border border-gray-700 p-3">{campania.Nombre}</td>
                  <td className="border border-gray-700 p-3">{campania.FechaInicio}</td>
                  <td className="border border-gray-700 p-3">{campania.FechaCierre}</td>
                  <td className="border border-gray-700 p-3">
                    <Link href={`/campania/${campania.ID}`}>
                      <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver</button>
                    </Link>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <Link href={`/editarCampania/${campania.ID}`}>
                      <button className="text-white bg-green-500 hover:bg-green-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button>
                    </Link>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-red-500 hover:bg-red-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cerrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ListaVigentesCampanias