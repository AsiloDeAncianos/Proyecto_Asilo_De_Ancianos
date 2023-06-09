import {Layout} from "../components/Layout";
import Link from "next/link";
import { getAllInstitucion, getInstitucionById } from './api/backend';
import { useEffect, useState} from 'react';
import {useRouter} from 'next/router';

function InstAsiloLista() {

  const router = useRouter();

  const [institucionAll, setInstitucion] = useState([]);

  useEffect(() => {
      async function loadData(){
          const res = await getAllInstitucion();
          setInstitucion(res.data);
      }
      loadData();
  }, [])

  const handleCardClick = async (id) => {
    try {
      const response = await getInstitucionById(id);
      console.log(response.data.id);
      router.push(`/institucionAsilo/${id}`);

    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  };

  return (
    <>
        <Layout>
          <Link href="/institucionAsiloMenu">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          {institucionAll.map((instAsilo) => (
          //<Link key={instAsilo.ID}>
              <div onClick={() => handleCardClick(instAsilo.id)} className="border border-gray-200 shadow-md p-6 mx-12 my-3">
                <h1 className="text-gray-700">{instAsilo.Nombre}</h1>
                <p className="text-gray-700">{instAsilo.NIT}</p>
                <p className="text-gray-700">{instAsilo.NombreRepresentantePrincipal}</p>
              </div>
          //</Link>
          ))}
        </Layout>
    </>
  );
  
}

export default InstAsiloLista