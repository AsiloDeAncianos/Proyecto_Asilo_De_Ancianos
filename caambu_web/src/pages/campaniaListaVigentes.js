import {Layout} from "../components/Layout";
import Link from "next/link";
import { format } from "date-fns";
import {useRouter} from 'next/router';
import { getAllCampania, getCampaniaById, updateCampania } from './api/backend';
import { useEffect, useState} from 'react';

function ListaVigentesCampanias() {

  const router = useRouter();

  const [campaniaAll, setCampania] = useState([]);

  useEffect(() => {
      async function loadData(){
        const res = await getAllCampania();
        setCampania(res.data);
      }
      loadData();
  }, [])

  const campaniasVigentes = campaniaAll.filter((campania) => campania.Estado === true);

  const handleEditView = async (id) => {
    try {
      const response = await getCampaniaById(id);
      console.log(response.data.id);
      router.push(`/campania/edit/${id}`);

    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  };

  const handleState = async (id) => {
    try {
      const { data } = await getCampaniaById(id);
      const updatedCampania = {
        ...data,
        Estado: false
      };
  
      await updateCampania(id, updatedCampania);
      console.log(updatedCampania);
      router.push('/campaniaListaCerradas');
  
    } catch (error) {
      console.error('Error updating campaign state:', error);
    }
  };

  const formatearFecha = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

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
              {campaniasVigentes.map((campania) => (
                <tr key={campania.id}>
                  <td className="border border-gray-700 p-3">{campania.Nombre}</td>
                  <td className="border border-gray-700 p-3">{formatearFecha(campania.FechaInicio)}</td>
                  <td className="border border-gray-700 p-3">{formatearFecha(campania.FechaCierre)}</td>
                  <td className="border border-gray-700 p-3">
                    <Link href={`/campania/${campania.id}`} key={campania.id}>
                      <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver</button>
                    </Link>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button onClick={() => handleEditView(campania.id)} className="text-white bg-yellow-500 hover:bg-yellow-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button>
                  </td>
                  <td className="border border-gray-700 p-3">
                    <button className="text-white bg-red-500 hover:bg-red-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleState(campania.id)}>Cerrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
    </>
  );
}

export default ListaVigentesCampanias