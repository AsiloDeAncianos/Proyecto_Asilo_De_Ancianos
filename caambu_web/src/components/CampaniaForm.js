import axios from 'axios';
import { useState } from 'react';
;

export function CampaniaForm() {

    const [campania, setCampania] = useState({
        Nombre: '',
        Requerimiento: '',
        Imagenes: '',
        FechaInicio: '',
        FechaCierre: '',
        InstitucionAsiloID: 1
    })

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
        const res = await axios.post('/api/campanias', campania)
        console.log(res);
    };

    const handleChange = ({target: {name, value}}) => {
        setCampania({...campania, [name]: value});
    };

  return (
    <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <button className='text-white bg-red-500 hover:bg-red-700 py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold'>x</button>

            <h1 className='text-gray-700'>Crear Campaña</h1>

            <label htmlFor='lblNombreCampania' className='text-gray-700'><b>Nombre:</b></label>
            <input name='Nombre' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>

            <label htmlFor='lblRequerimiento' className='text-gray-700'><b>Requerimientos o necesidad:</b></label>
            <textarea name='Requerimiento' rows='2' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>

            <label htmlFor='lblImagenesUrl' className='text-gray-700'><b>Urls:</b></label>
            <textarea name='Imagenes' type='text' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>
            <img></img>

            <label htmlFor='lblFechaInicio' className='text-gray-700'><b>Fecha Inicio:</b></label>
            <input name='FechaInicio' type='date' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>

            <label htmlFor='lblFechaCierre' className='text-gray-700'><b>Fecha Cierre:</b></label>
            <input name='FechaCierre' type='date' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>

            <label htmlFor='lblInstitucionAsiloID' className='text-gray-700'><b>Institucion Asilo:</b></label>
            <input name='InstitucionAsiloID' type='number' onChange={handleChange} className='shadow border rounded py-2 px-3 text-gray-700'/>

            <button className='text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold'>Guardar Campaña</button>
        </form>
    </div>
  )
}
