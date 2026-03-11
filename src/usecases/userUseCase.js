const userRepo = require('../repositories/userRepository');

const createUser = async (userData) => {
  // could add business logic like hashing password
  return await userRepo.createUser(userData);
};

const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

const getUserById = async (id) => {
  return await userRepo.getUserById(id);
};

const updateUser = async (id, fields) => {
  return await userRepo.updateUser(id, fields);
};

const softDeleteUser = async (id) => {
  return await userRepo.softDeleteUser(id);
};

const enableUser = async (email, username) => {
  const user = await userRepo.getUserByEmailAndUsername(email, username);
  if (!user) return null;
  return await userRepo.setStatus(user.id, true);
};

const disableUser = async (email, username) => {
  const user = await userRepo.getUserByEmailAndUsername(email, username);
  if (!user) return null;
  return await userRepo.setStatus(user.id, false);
};

const getUsersByRoleId = async (roleId) => {
  return await userRepo.getUsersByRoleId(roleId);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  enableUser,
  disableUser,
  getUsersByRoleId,
};