import {Layout} from "../components/Layout";
import { format } from "date-fns";
import {useRouter} from 'next/router';
import { useEffect, useState} from 'react';
import { getAllAcopios, updateDonacion, getAllDonacion, getDonacionById } from "./api/backend";

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
      router.push(`/acopio/${id}`);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  }

  const handleState = async (id) => {
    try {
      const { data } = await getDonacionById(id);
      const updatedDonacion = {
        ...data,
        RecogidaPorAsilo: true,
        RecibidoPorAsilo: true
      };
  
      await updateDonacion(id, updatedDonacion);
      console.log(updatedDonacion);
      window.location.reload()
  
    } catch (error) {
      console.error('Error updating campaign state:', error);
    }
  }

  const donacionesEnEspera = donacionAll.filter((donacion) => donacion.RecogidaPorAsilo === false && donacion.RecibidoPorAsilo === false);

  console.log(donacionesEnEspera);

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
                <tr>
                  <td className="border border-gray-700 p-3">{formatearFecha(acopio.FechaRecoleccion)}</td>
                  <td className="border border-gray-700 p-3">
                    <button onClick={() => handleBenefactors(acopio.Campania)} className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Enviar</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button onClick={() => handleState(acopio.id)} className="text-white bg-green-500 hover:bg-green-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Recibido</button>
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