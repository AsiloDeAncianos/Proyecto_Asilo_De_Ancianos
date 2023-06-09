import axios from 'axios';
import {Layout} from '../../components/Layout';
import {useRouter} from 'next/router';
import Link from "next/link";
import { deleteCampania, getCampaniaById } from '../../pages/api/backend';

/* VISTA DE UNA SOLA CAMPAÑA */

function CampaniaPageView({campania}) {

    const router = useRouter();

    const handleDelete = async (id) => {
        try {
            await deleteCampania(id);
            router.push('/campaniaListaCerradas');
        } catch (error) {
            //console.log(error.response.data.message); 
        }
    };

  return (
    <>
        <Layout>
            <Link href="/campaniaListaVigentes">
                <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
            </Link>

            <div>
                <h1 className='text-gray-700'>{campania.Nombre}</h1>
                <p className='text-gray-700'>{campania.Requerimiento}</p>
                <p className='text-gray-700'>{campania.Imagenes}</p>
            </div>

            <button 
                className='bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded my-5' 
                onClick={() => handleDelete(campania.id)}>Eliminar</button>

            <button
                className='bg-yellow-500 hover:bg-yellow-700 text-white px-5 py-2 rounded ml-2'
                onClick={() => router.push("/campania/edit/" + campania.id)}>Editar</button>
        </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {

    const {data: campania} = await getCampaniaById(context.query.id);

    return {
        props: {
            campania,
        },
    };
};

export default CampaniaPageView;