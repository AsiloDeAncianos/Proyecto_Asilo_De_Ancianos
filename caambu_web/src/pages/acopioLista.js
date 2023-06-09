import {Layout} from "../components/Layout";
import { format } from "date-fns";
import {useRouter} from 'next/router';
import { useEffect, useState} from 'react';
import { getAllAcopios, getAcopiosById, getAllDonacion } from "./api/backend";

function ListaAcopios() {

  const router = useRouter();

  const [donacionAll, setDonacionAll] = useState([]);
  const [acopioAll, setAcopio] = useState([]);

  useEffect(() => {
      async function loadData(){
          const A_res = await getAllAcopios();
          const D_res = await getAllDonacion();

          setAcopio(A_res.data);
          setDonacionAll(D_res.data);
      }
      loadData();
  }, [])

  const handleBenefactors = async (id) => {
    try {
      const response = await getAcopiosById(id);
      console.log(response.data.id);
      router.push(`/acopio/${id}`);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  }

  console.log('---------------------');
  console.log(donacionAll);
  console.log('---------------------');

  // const donacionesEnEspera1 = donacionAll.filter((donacion) => donacion.RecogidaPorAsilo === false);
  // const donacionesEnEspera2 = donacionesEnEspera1.filter((donacion) => donacion.RecibidoPorAsilo === false);

  const donacionesEnEspera = donacionAll.filter((donacion) => donacion.RecogidaPorAsilo === false && donacion.RecibidoPorAsilo === false);

  // const recojosPorRealizar = acopioAll.filter(acopio => 
  //   donacionAll.some(donacion => donacion.Campania === acopio.Campania)
  // );
  
  console.log('*********************');
  //console.log(recojosPorRealizar);
  console.log('*********************');

  const formatearFecha = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

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
              {donacionesEnEspera.map((acopio) => (
                <tr key={acopio.id}>
                  <td className="border border-gray-700 p-3">{formatearFecha(acopio.FechaRecoleccion)}</td>
                  <td className="border border-gray-700 p-3">
                    <button onClick={() => handleBenefactors(acopio.id)} className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Enviar</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-green-500 hover:bg-green-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Recibido</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
    </>
  );
}

export default ListaAcopios