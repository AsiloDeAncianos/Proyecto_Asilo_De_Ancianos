import axios from "axios";
import {Layout} from "../components/Layout";
import { format } from "date-fns";

function ListaAcopios({acopios}) {

  const formatearFecha = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  //const acopiosRealizar = acopios.filter((acopio) => acopio.RecogidaPorAsilo === 1);

  return (
    <>
        <Layout>
          <h1 className="text-black my-12">Recojos a realizar</h1>

          <table className="border-collapse border border-gray-700 shadow-md mx-12 my-3 bg-gray-200 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-3">Fecha definida</th>
                <th className="border border-gray-700 p-3">Informacion</th>
                <th className="border border-gray-700 p-3">Enviar notificación</th>
                <th className="border border-gray-700 p-3">Confirmar el recojo</th>
              </tr>
            </thead>
            <tbody>
              {/* {donacionesRecibidas.map((donacion) => (
                // <tr key={donacion.ID}>
                //   <td className="border border-gray-700 p-3">{formatearFecha(donacion.FechaRecoleccion)}</td>
                //   <td className="border border-gray-700 p-3">{donacion.benefactor.NombreCompleto}</td>
                // </tr>
              ))} */}
                <tr className="bg-gray-200">
                  <td className="border border-gray-700 p-3">01/04/23</td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Enviar</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-green-500 hover:bg-green-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Recibido</button>
                  </td>
                </tr>
            </tbody>
          </table>
        </Layout>
    </>
  );
}

// export const getServerSideProps = async context => {
//   const {data: donacion} = await axios.get(
//     'http://localhost:3000/api/donaciones'
//   )

//   return {
//     props: {
//         donaciones,
//     },
//   };
// };

export default ListaAcopios