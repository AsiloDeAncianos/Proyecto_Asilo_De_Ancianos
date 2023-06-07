import { pool } from "../../../../config/db";

export default async function handler(req, res) {
    // return res.status(200).json('Getting id campania: ' + req.query.id);
    switch (req.method) {
        case 'GET':
            return await obtenerInstAsilo(req, res);
        case 'DELETE':
            return await eliminarInstAsilo(req, res);
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
}

const eliminarInstAsilo = async (req, res) => {
    const { id } = req.query;
    const result = await pool.query('DELETE FROM InstitucionAsilo WHERE ID = ?', [id]);
    return res.status(200).json();
}
