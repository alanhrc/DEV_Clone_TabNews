test('get to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(typeof responseBody.dependencies.database.service_url).toBe('string');
  // expect(responseBody.dependencies.database.version_details).toEqual(
  //   'PostgreSQL 16.1 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit',
  // );
  expect(typeof responseBody.dependencies.database.version_details).toBe(
    'string',
  );
  expect(responseBody.dependencies.database.version).toEqual('16.1');
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
