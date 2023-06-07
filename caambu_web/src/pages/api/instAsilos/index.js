import {pool} from "../../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await obtenerInstAsilo(req, res);

        case 'POST':
            return await guardarInstAsilo(req, res);
        default:
            break;
    } 
}

const obtenerInstAsilo = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM InstitucionAsilo');
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ error });
    }
};

const guardarInstAsilo = async (req, res) => {
    console.log('creando institucion');
    console.log(req.body);

    const {Nombre, NIT, NombreRepresentantePrincipal, Email, Telefono, Celular, Direccion, Localizacion} = req.body;

    try {
        const [result] = await pool.query('INSERT INTO InstitucionAsilo SET ?',{
            Nombre,
            NIT,
            NombreRepresentantePrincipal,
            Email,
            Telefono,
            Celular,
            Direccion,
            Localizacion
        });
    
        console.log(result);
    
        return res.status(200).json('Creando institución:' + {Nombre, NIT, NombreRepresentantePrincipal, Email, Telefono, Celular, Direccion, Localizacion, id: result.insertId});
    } catch (error) {
        return res.status(500).json({message: error.messa});
    }
};