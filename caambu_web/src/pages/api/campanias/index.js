import {pool} from "../../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await obtenerCampania(req, res);
        case 'POST':
            return await guardarCampania(req, res);
        default:
            break;
    }
}

const obtenerCampania = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Campania');
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }

    
};

const guardarCampania = async (req, res) => {
    console.log('Creando una campaña');
    console.log(req.body);

    const {Nombre, Requerimiento, Imagenes, FechaInicio, FechaCierre, InstitucionAsiloID} = req.body;

    try {
        const [result] = await pool.query('INSERT INTO Campania SET ?',{
            Nombre,
            Requerimiento,
            Imagenes,
            FechaInicio,
            FechaCierre,
            InstitucionAsiloID
        });
    
        console.log(result);
        return res.status(200).json('Creando campaña:' + {Nombre, Requerimiento, Imagenes, FechaInicio, FechaCierre, InstitucionAsiloID, id: result.insertId});

    } catch (error) {
        return res.status(500).json({message: error.messa});
    }
};