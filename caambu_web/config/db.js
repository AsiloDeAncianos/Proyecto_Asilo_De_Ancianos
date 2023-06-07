import { createPool } from "mysql2/promise";

const pool = createPool({
    host:'localhost',
    user: 'root',
    password: 'Univallecri5jh0el',
    port: 3306,
    database: 'bdcaambu'
})

export { pool };