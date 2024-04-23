import database from 'infra/tabnews-database/database.js';

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResultDetails =
    await database.query('SELECT version();');
  const databaseVersionValueDetails =
    databaseVersionResultDetails.rows[0].version;

  const databaseVersionResult = await database.query('SHOW server_version;');
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    'SHOW max_connections;',
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        service_url:
          process.env.NODE_ENV !== 'development'
            ? process.env.DATABASE_URL
            : 'Local',
        version_details: databaseVersionValueDetails,
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
