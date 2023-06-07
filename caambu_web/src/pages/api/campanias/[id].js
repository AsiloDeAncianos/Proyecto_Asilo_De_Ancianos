import { pool } from "../../../../config/db";

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return await obtenerCampania(req, res);
        case 'DELETE':
            return await eliminarCampania(req, res);
        case 'PUT':
            return await actualizarCampania(req, res);
    
        default:
            break;
    }

    // console.log(req.url);
    // console.log(req.query);
    // /**Infor del metodo */
    // console.log(req.method);
    // return res.status(200).json('Getting id campania: ' + req.query.id);
}

const obtenerCampania = async (req, res) => {
    try {
        const { id } = req.query;
        const [result] = await pool.query('SELECT * FROM Campania WHERE ID = ?', [id]);
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const eliminarCampania = async (req, res) => {
    try {
        const { id } = req.query;
        await pool.query('DELETE FROM Campania WHERE ID = ?', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const actualizarCampania = async (req, res) => {
    const { id } = req.query;
    try {
        await pool.query('UPDATE Campania SET ? WHERE ID = ?', [req.body, id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};