import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { createInstitucion, updateInstitucion, getInstitucionById } from '@/pages/api/backend';
;

export function InstAsiloForm() {

    const [instAsilo, setInstAsilo] = useState({
        Nombre: '',
        NIT: '',
        NombreRepresentantePrincipal: '',
        Email: '',
        Telefono: '',
        Celular: '',
        Direccion: '',
        Localizacion: ''
    });

    const router = useRouter();

    // console.log(router.query); demuestra que el enrutador es pieza clave al reutilizar componentes
    // console.log(router.query);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (router.query.id) {
                await updateInstitucion(router.query.id, instAsilo);
            } else {
                await createInstitucion(instAsilo);
            }

            router.push('/institucionAsiloLista');

        } catch (error) {
           //console.log(error.response.data.message); 
        }
    };

    const handleChange = ({target: {name, value}}) =>
        //console.log(name, value);
        setInstAsilo({...instAsilo, [name]: value});

    useEffect(() => {

        const getInstAsilo = async () => {
            const {data} = await getInstitucionById(router.query.id);
            //console.log(res);
            setInstAsilo({
                Nombre: data.Nombre, 
                NIT: data.NIT, 
                NombreRepresentantePrincipal: data.NombreRepresentantePrincipal, 
                Email: data.Email, 
                Telefono: data.Telefono, 
                Celular: data.Celular, 
                Direccion: data.Direccion, 
                Localizacion: data.Localizacion,
                Estado: data.Estado,
            });
            //setInstAsilo(data)
        };

        if (router.query.id) {
            //console.log(router.query.id);
            getInstAsilo(router.query.id);
        }
    }, []);

    const returnLinkHref = router.query.id ? '/institucionAsiloLista' : '/institucionAsiloMenu';

    return (
        <div className="w-full max-w-xs my-12">
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <Link href={returnLinkHref}>
                    <button className='text-white bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold'>Volver</button>
                </Link>

                <h1 className='text-gray-700 my-1'>Crear Institucion/Asilo</h1>

                <div className='my-2'>
                    <label htmlFor='lblNombreInstAsilo' className='text-gray-700'><b>Nombre (Razon social):</b></label>
                    <input name='Nombre' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Nombre}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='lblNit' className='text-gray-700'><b>NIT:</b></label>
                    <input name='NIT' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.NIT}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='representante' className='text-gray-700'><b>Representante:</b></label>
                    <input name='NombreRepresentantePrincipal' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.NombreRepresentantePrincipal}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='lblEmail' className='text-gray-700'><b>Email:</b></label>
                    <input name='Email' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Email}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='lblTelefono' className='text-gray-700'><b>Telefono:</b></label>
                    <input name='Telefono' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Telefono}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='lblCelular' className='text-gray-700'><b>Celular:</b></label>
                    <input name='Celular' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Celular}/>
                </div>

                <div className='my-2'>
                    <label htmlFor='lblDireccion' className='text-gray-700'><b>Direccion:</b></label>
                    <textarea name='Direccion' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Direccion}/>
                </div>

                <div className='my-2'> 
                    <label htmlFor='lblLocalizacion' className='text-gray-700'><b>Localizacion:</b></label>
                    <input name='Localizacion' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Localizacion}/>
                </div>

                <button className='text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none 
                    focus:shadow-outline font-bold my-1'>
                        { router.query.id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
}

