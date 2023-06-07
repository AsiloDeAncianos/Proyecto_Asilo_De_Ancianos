import { pool } from "../../../../config/db";

export default async function handler(req, res) {
    // return res.status(200).json('Getting id campania: ' + req.query.id);
    switch (req.method) {
        case 'GET':
            return await obtenerInstAsilo(req, res);
        case 'DELETE':
            return await eliminarInstAsilo(req, res);
        case 'PUT':
            return await actualizarInstAsilo(req, res);
        default:
            break;
    }
}

const obtenerInstAsilo = async (req, res) => {
    const { id } = req.query;
    const [result] = await pool.query('SELECT * FROM InstitucionAsilo WHERE ID = ?', [id]);
    //console.log(result);
    return res.status(200).json(result[0]);
    //return res.status(200).json(id)
};

const eliminarInstAsilo = async (req, res) => {
    const { id } = req.query;
    const result = await pool.query('DELETE FROM InstitucionAsilo WHERE ID = ?', [id]);
    return res.status(204).json();
};

const actualizarInstAsilo = async (req, res) => {
    const { id } = req.query;
    //const { Nombre, ....} = req.body
    try {
        //await pool.query('UPDATE InstitucionAsilo SET Nombre = ?, ... WHERE ID = ?', [Nombre, ...., id]);
        await pool.query('UPDATE InstitucionAsilo SET ? WHERE ID = ?', [req.body, id]);
        return res.status(204).json();
    } catch (error) {
        console.error(error.message);
    }
};
