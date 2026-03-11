const { poolPromise, sql } = require('../config/db');

const createRole = async (role) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('name', sql.VarChar(255), role.name)
    .input('description', sql.VarChar(500), role.description || '')
    .query(
      `INSERT INTO [Roles] (name,description)
       OUTPUT INSERTED.*
       VALUES (@name,@description)`
    );
  return result.recordset[0];
};

const getAllRoles = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM [Roles]');
  return result.recordset;
};

const getRoleById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .query('SELECT * FROM [Roles] WHERE id=@id');
  return result.recordset[0];
};

const updateRole = async (id, fields) => {
  const pool = await poolPromise;
  const query = [];
  const request = pool.request();
  if (fields.name) {
    request.input('name', sql.VarChar(255), fields.name);
    query.push('name = @name');
  }
  if (fields.description !== undefined) {
    request.input('description', sql.VarChar(500), fields.description);
    query.push('description = @description');
  }
  if (query.length === 0) return await getRoleById(id);
  const sqlQuery = `UPDATE [Roles] SET ${query.join(', ')} WHERE id=@id; SELECT * FROM [Roles] WHERE id=@id`;
  request.input('id', sql.UniqueIdentifier, id);
  const result = await request.query(sqlQuery);
  return result.recordset[0];
};

const deleteRole = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .query('DELETE FROM [Roles] WHERE id=@id;');
  return result.rowsAffected[0] > 0;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
