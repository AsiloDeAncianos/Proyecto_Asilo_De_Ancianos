import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";
import { format } from "date-fns";

function ListaDonaciones({donaciones}) {

  const formatearFecha = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  //const donacionesRecibidas = donaciones.filter((donacion) => donacion.RecogidaPorAsilo === 1);

  return (
    <>
        <Layout>

          <h1 className="text-black my-12">Reporte de Donaciones Recibidas</h1>

          <table className="border-collapse border border-gray-700 shadow-md mx-12 my-3 bg-gray-200 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-3">Fecha de Recoleccion</th>
                <th className="border border-gray-700 p-3">Benefactor</th>
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
                  <td className="border border-gray-700 p-3">Jorge Lopez</td>
                </tr>
            </tbody>
          </table>

          <div className="my-5">
            <label htmlFor='lblRango' className='text-gray-700'><b>Rango de fechas:</b></label>
          </div>
          <div className="my-5">
            <label htmlFor='lblCantDonaciones' className='text-gray-700'><b>Cantidad de donaciones:</b></label>
          </div>
          <div className="my-5">
            <label htmlFor='lblBenefactor' className='text-gray-700'><b>Benefactor más frecuente:</b></label>
          </div>

          <button 
                className='bg-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded my-5'>Opcion 1</button>
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

export default ListaDonaciones