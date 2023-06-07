import axios from 'axios';
import {Layout} from '../../components/Layout';
import {useRouter} from 'next/router';

function InstAsiloView({instAsilo}) {

    const router = useRouter();

    //console.log(instAsilo);
    const handleDelete = async (id) => {
        //console.log(id);
        await axios.delete('/api/instAsilos/' + id)
        //console.log(res);
        router.push('/');
    };

  return (
    <Layout>
        <h1 className='text-gray-700'>{instAsilo.Nombre}</h1>
        <p className='text-gray-700'>{instAsilo.NIT}</p>
        <p className='text-gray-700'>{instAsilo.NombreRepresentantePrincipal}</p>

        <button 
            className='bg-red-500 hover:bg-red-700 text-white px-3 py-2' 
            onClick={() => handleDelete(instAsilo.ID)}>Eliminar</button>
    </Layout>
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

export default InstAsiloView;