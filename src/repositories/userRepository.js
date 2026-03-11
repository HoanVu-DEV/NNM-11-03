const { poolPromise, sql } = require('../config/db');

const createUser = async (user) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('username', sql.VarChar(255), user.username)
    .input('password', sql.VarChar(255), user.password)
    .input('email', sql.VarChar(255), user.email)
    .input('fullName', sql.VarChar(255), user.fullName || '')
    .input('avatarUrl', sql.VarChar(500), user.avatarUrl || 'https://i.sstatic.net/l60Hf.png')
    .input('status', sql.Bit, user.status === true)
    .input('role', sql.UniqueIdentifier, user.role)
    .query(
      `INSERT INTO [Users] (username,password,email,fullName,avatarUrl,status,role,loginCount)
       OUTPUT INSERTED.*
       VALUES (@username,@password,@email,@fullName,@avatarUrl,@status,@role,0)`
    );
  return result.recordset[0];
};

const getAllUsers = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM [Users] WHERE status<>2');
  return result.recordset;
};

const getUserById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .query('SELECT * FROM [Users] WHERE id = @id AND status<>2');
  return result.recordset[0];
};

const updateUser = async (id, fields) => {
  const pool = await poolPromise;
  const query = [];
  const request = pool.request();
  if (fields.username) {
    request.input('username', sql.VarChar(255), fields.username);
    query.push('username = @username');
  }
  if (fields.password) {
    request.input('password', sql.VarChar(255), fields.password);
    query.push('password = @password');
  }
  if (fields.email) {
    request.input('email', sql.VarChar(255), fields.email);
    query.push('email = @email');
  }
  if (fields.fullName !== undefined) {
    request.input('fullName', sql.VarChar(255), fields.fullName);
    query.push('fullName = @fullName');
  }
  if (fields.avatarUrl !== undefined) {
    request.input('avatarUrl', sql.VarChar(500), fields.avatarUrl);
    query.push('avatarUrl = @avatarUrl');
  }
  if (fields.status !== undefined) {
    request.input('status', sql.Bit, fields.status);
    query.push('status = @status');
  }
  if (fields.role) {
    request.input('role', sql.UniqueIdentifier, fields.role);
    query.push('role = @role');
  }

  if (query.length === 0) return await getUserById(id);

  const sqlQuery = `UPDATE [Users] SET ${query.join(', ')} WHERE id = @id; SELECT * FROM [Users] WHERE id=@id`;
  request.input('id', sql.UniqueIdentifier, id);
  const result = await request.query(sqlQuery);
  return result.recordset[0];
};

// soft delete: set status=2 (deleted)
const softDeleteUser = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .query('UPDATE [Users] SET status = 2 WHERE id=@id;');
  return result.rowsAffected[0] > 0;
};

const getUserByEmailAndUsername = async (email, username) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('email', sql.VarChar(255), email)
    .input('username', sql.VarChar(255), username)
    .query('SELECT * FROM [Users] WHERE email=@email AND username=@username');
  return result.recordset[0];
};

const setStatus = async (id, status) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .input('status', sql.Bit, status)
    .query('UPDATE [Users] SET status=@status WHERE id=@id; SELECT * FROM [Users] WHERE id=@id');
  return result.recordset[0];
};

const getUsersByRoleId = async (roleId) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('role', sql.UniqueIdentifier, roleId)
    .query('SELECT * FROM [Users] WHERE role=@role AND status<>2');
  return result.recordset;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  getUserByEmailAndUsername,
  setStatus,
  getUsersByRoleId,
};
