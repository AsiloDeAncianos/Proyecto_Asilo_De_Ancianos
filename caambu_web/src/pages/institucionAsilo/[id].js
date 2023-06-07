import axios from 'axios';
import {Layout} from '../../components/Layout';
import {useRouter} from 'next/router';
import Link from "next/link";

/* VISTA DE UNA SOLA INSTITUCION/ASILO */

function InstAsiloPageView({instAsilo}) {

    const router = useRouter();

    //console.log(instAsilo);
    const handleDelete = async (id) => {
        try {
            //console.log(id);
            await axios.delete('/api/instAsilos/' + id)
            //console.log(res);
            router.push('/institucionAsiloLista');
        } catch (error) {
            console.log(error.response.data.message); 
        }
    };

  return (
    <>
        <Layout>
            <Link href="/institucionAsiloLista">
                <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold my-12'>Volver</button>
            </Link>

            <div>
                <h1 className='text-gray-700'>{instAsilo.Nombre}</h1>
                <p className='text-gray-700'>{instAsilo.NIT}</p>
                <p className='text-gray-700'>{instAsilo.NombreRepresentantePrincipal}</p>
            </div>

            <button 
                className='bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded my-5' 
                onClick={() => handleDelete(instAsilo.ID)}>Eliminar</button>

            <button
                className='bg-yellow-500 hover:bg-yellow-700 text-white px-5 py-2 rounded ml-2'
                onClick={() => router.push("/institucionAsilo/edit/" + instAsilo.ID)}>Editar</button>
        </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {

    const {data: instAsilo} = await axios.get(
        'http://localhost:3000/api/instAsilos/' + context.query.id
    );
    //console.log(res.data);

    return {
        props: {
            instAsilo,
        },
    };
};

export default InstAsiloPageView;