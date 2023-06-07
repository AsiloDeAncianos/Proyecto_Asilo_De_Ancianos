import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    })

    const router = useRouter()

    // console.log(router.query); demuestra que el enrutador es pieza clave al reutilizar componentes

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('creando una campania')

        if (router.query.id) {
            console.log('update');
            const res = await axios.put('/api/instAsilos/' + router.query.id, instAsilo);
            console.log(res);
        } else {
            const res = await axios.post('/api/instAsilos', instAsilo);
            console.log(res);
        }

        router.push('/');
    };

    const handleChange = ({target: {name, value}}) =>
        //console.log(name, value);
        setInstAsilo({...instAsilo, [name]: value});

    useEffect(() => {

        const getInstAsilo = async () => {
            const {data} = await axios.get('/api/instAsilos/' + router.query.id);
            //console.log(res);
            setInstAsilo({Nombre: data.Nombre, NIT: data.NIT, NombreRepresentantePrincipal: data.NombreRepresentantePrincipal, Email: data.Email, Telefono: data.Telefono, Celular: data.Celular, Direccion: data.Direccion, Localizacion: data.Localizacion})
            //setInstAsilo(data)
        }

        if (router.query.id) {
            //console.log(router.query.id);
            getInstAsilo(router.query.id)
        }
    }, [])

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <button className='text-white bg-red-500 hover:bg-red-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold'>x</button>

                <h1 className='text-gray-700'>Crear Institucion/Asilo</h1>

                <label htmlFor='lblNombreInstAsilo' className='text-gray-700'><b>Nombre (Razon social):</b></label>
                <input name='Nombre' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Nombre}/>

                <label htmlFor='lblNit' className='text-gray-700'><b>NIT:</b></label>
                <input name='NIT' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.NIT}/>

                <label htmlFor='representante' className='text-gray-700'><b>Representante:</b></label>
                <input name='NombreRepresentantePrincipal' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.NombreRepresentantePrincipal}/>

                <label htmlFor='lblEmail' className='text-gray-700'><b>Email:</b></label>
                <input name='Email' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Email}/>

                <label htmlFor='lblTelefono' className='text-gray-700'><b>Telefono:</b></label>
                <input name='Telefono' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Telefono}/>

                <label htmlFor='lblCelular' className='text-gray-700'><b>Celular:</b></label>
                <input name='Celular' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Celular}/>

                <label htmlFor='lblDireccion' className='text-gray-700'><b>Direccion:</b></label>
                <textarea name='Direccion' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Direccion}/>

                <label htmlFor='lblLocalizacion' className='text-gray-700'><b>Localizacion:</b></label>
                <input name='Localizacion' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700' value={instAsilo.Localizacion}/>

                <button className='text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none 
                    focus:shadow-outline font-bold'>
                        { router.query.id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
}
