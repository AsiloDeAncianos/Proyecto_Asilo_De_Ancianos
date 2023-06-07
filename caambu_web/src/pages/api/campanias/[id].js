export default function handler(req, res) {
    console.log(req.url);
    console.log(req.query);
    /**Infor del metodo */
    console.log(req.method);
    return res.status(200).json('Getting id campania: ' + req.query.id);
}