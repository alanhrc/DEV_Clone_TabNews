import database from 'infra/tabnews-database/database.js';

async function status(request, response) {
  // await database.query('SELECT 1 + 1 as sum;');
  const result = await database.query('SELECT 1 + 1 as sum;');
  // console.error(result.rows);
  response.status(200).json({ chave: `SELECT 1 + 1 = ${result.rows}` });
}

export default status;
