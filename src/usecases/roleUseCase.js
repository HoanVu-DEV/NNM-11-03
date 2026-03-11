const roleRepo = require('../repositories/roleRepository');

const createRole = async (roleData) => {
  return await roleRepo.createRole(roleData);
};

const getAllRoles = async () => {
  return await roleRepo.getAllRoles();
};

const getRoleById = async (id) => {
  return await roleRepo.getRoleById(id);
};

const updateRole = async (id, fields) => {
  return await roleRepo.updateRole(id, fields);
};

const deleteRole = async (id) => {
  return await roleRepo.deleteRole(id);
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};