import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";
import {useRouter} from 'next/router';
import { useEffect, useState} from 'react';
import { getAllCampania, getCampaniaById, updateCampania } from './api/backend';

function ListaCerradasCampanias() {

  const router = useRouter();

  const [campaniaAll, setCampania] = useState([]);

  useEffect(() => {
      async function loadData(){
          const res = await getAllCampania();
          setCampania(res.data);
      }
      loadData();
  }, [])

  const handleBenefactors = async (id) => {
    try {
      const response = await getCampaniaById(id);
      console.log(response.data.id);
      router.push(`/benefactor/${id}`);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  }

  const campaniasCerradas = campaniaAll.filter((campania) => campania.Estado === false);

  return (
    <>
        <Layout>
          <Link href="/campaniaMenu">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          <h1 className="text-black">Campaña Cerradas</h1>

          <table className="border-collapse border border-gray-700 shadow-md mx-12 my-3 bg-gray-200 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-3">Nombre de Campaña</th>
                <th className="border border-gray-700 p-3">Benefactores</th>
                <th className="border border-gray-700 p-3">Estado de donaciones</th>
              </tr>
            </thead>
            <tbody>
              {campaniasCerradas.map((campania) => (
                <tr key={campania.id}>
                  <td className="border border-gray-700 p-3">{campania.Nombre}</td>
                  <td className="border border-gray-700 p-3">
                    {/* <Link href="/benefactorLista">
                      <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver despliegue</button>
                    </Link> */}
                    <button onClick={() => handleBenefactors(campania.id)} className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Ver despliegue</button>
                  </td>
                  <td className="border border-gray-700 p-3">recibidas</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
    </>
  );
}

export default ListaCerradasCampanias