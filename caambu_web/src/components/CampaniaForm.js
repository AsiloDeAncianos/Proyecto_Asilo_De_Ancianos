import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
;

export function CampaniaForm() {

    const [campania, setCampania] = useState({
        Nombre: '',
        Requerimiento: '',
        Imagenes: '',
        FechaInicio: '',
        FechaCierre: '',
        InstitucionAsiloID: 1
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('creando una campania')
        // const res = await axios.post('/api/campanias', {
        //     Nombre: 'campania 1',
        //     Requerimiento: 'requerimientos 1',
        //     Imagenes: 'url 1; url 2; url 3',
        //     FechaInicio: Date.now(),
        //     FechaCierre: Date.now(),
        //     InstitucionAsiloID: 1
        // })

        try {
            if (router.query.id) {
                await axios.put('/api/campanias/' + router.query.id, campania);
            } else {
                await axios.post('/api/campanias', campania);
            }

            router.push('/campaniaListaVigentes')

        } catch (error) {
            console.log(error.response.data.message); 
        }
    };

    const handleChange = ({target: {name, value}}) =>
        setCampania({...campania, [name]: value});

    useEffect(() => {
        const getCampania = async () => {
            const {data} = await axios.get('/api/campanias/' + router.query.id);

            setCampania({
                Nombre: data.Nombre,
                Requerimiento: data.Requerimiento,
                Imagenes: data.Imagenes,
                FechaInicio: formatoFecha(data.FechaInicio),
                FechaCierre: formatoFecha(data.FechaCierre),
                InstitucionAsiloID: data.InstitucionAsiloID
            });
        };

        if (router.query.id) {
            getCampania(router.query.id);
        }
    }, []);

    const formatoFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        const anio = fecha.getFullYear();
        let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        let dia = fecha.getDate().toString().padStart(2, '0');

        return `${anio}-${mes}-${dia}`;
    };

    const returnLinkHref = router.query.id ? '/campaniaListaVigentes' : '/campaniaMenu';

    return (
        <div className="w-full max-w-xs my-12">
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <Link href={returnLinkHref}>
                    <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold'>Volver</button>
                </Link>
                
                <h1 className='text-gray-700 my-1'>Crear Campaña</h1>

                <div className='my-2'>
                    <label htmlFor='lblNombreCampania' className='text-gray-700'><b>Nombre:</b></label>
                    <input name='Nombre' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.Nombre}/>
                </div>
                <div className='my-2'>
                    <label htmlFor='lblRequerimiento' className='text-gray-700'><b>Requerimientos o necesidad:</b></label>
                    <textarea name='Requerimiento' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.Requerimiento}/>
                </div>
                <div className='my-2'>
                    <label htmlFor='lblImagenesUrl' className='text-gray-700'><b>Urls:</b></label>
                    <textarea name='Imagenes' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.Imagenes}/>
                </div>
                <div className='my-2'>
                    <img></img>
                </div>
                <div className='my-2'>
                    <label htmlFor='lblFechaInicio' className='text-gray-700'><b>Fecha Inicio:</b></label>
                    <input name='FechaInicio' type='date' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.FechaInicio}/>
                </div>
                <div className='my-2'>
                    <label htmlFor='lblFechaCierre' className='text-gray-700'><b>Fecha Cierre:</b></label>
                    <input name='FechaCierre' type='date' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.FechaCierre}/>
                </div>
                <div className='my-2'>
                    <label htmlFor='lblInstitucionAsiloID' className='text-gray-700'><b>Institucion Asilo:</b></label>
                    <input name='InstitucionAsiloID' type='number' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={campania.InstitucionAsiloID}/>
                </div>

                <button className='text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none 
                    focus:shadow-outline font-bold'>
                        { router.query.id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
}
