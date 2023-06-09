import {Layout} from "../../components/Layout";
import Link from "next/link";
import { getAllBenefactor, getAllDonacion, getCampaniaById } from '../api/backend';
import { useEffect, useState} from 'react';

function InfoAcopio({campania}) {
  const [benefactorAll, setBenefactorAll] = useState([]);
  const [donacionAll, setDonacionAll] = useState([]);

  useEffect(() => {
      async function loadData(){
        const B_res = await getAllBenefactor();
        const D_res = await getAllDonacion();

        setBenefactorAll(B_res.data);
        setDonacionAll(D_res.data);
      }
      loadData();
  }, [])

  const donacionesFiltradas = donacionAll.filter(donacion => campania.id === donacion.Campania);

  const benefactoresFiltrados = benefactorAll.filter(benefactor =>
    donacionesFiltradas.some(donacion => donacion.Benefactor === benefactor.id)
  );

  return (
    <>
        <Layout>
          <Link href="/campaniaListaCerradas">
            <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
          </Link>

          <h1 className="text-black">Información del recojo a realizar</h1>

          <div className="border border-gray-200 shadow-md p-6 mx-12 my-3">
              <h1 className="text-gray-700"><b>Nombre del Benefactor:</b></h1>
              <p className="text-gray-700">
                --------------------- </p>
                <h1 className="text-gray-700"><b>Ubicacion:</b></h1>
                <p className="text-gray-700">
                --------------------- </p>
                <h1 className="text-gray-700"><b>Telefono:</b></h1>
                <p className="text-gray-700">
                --------------------- </p>
                <h1 className="text-gray-700"><b>Email:</b></h1>
                <p className="text-gray-700">
                --------------------- </p>
            </div>

          {/* {benefactoresFiltrados.map((benefactor) => (
            <div className="border border-gray-200 shadow-md p-6 mx-12 my-3">
              <h1 className="text-gray-700"><b>Nombre:</b></h1>
              <p className="text-gray-700">
                {benefactor.Anonimo ? 'Donacion Anonima' : benefactor.NombreCompleto}</p>
            </div>
          ))} */}
        </Layout>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const { id } = context.query;

//   try {
//     const { data: campania } = await getCampaniaById(id);
//     //console.log(campania.id);

//     return {
//       props: {
//         campania,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching campaign details:', error);
//     return {
//       props: {
//         campania: null,
//       },
//     };
//   }
// };

export default InfoAcopio