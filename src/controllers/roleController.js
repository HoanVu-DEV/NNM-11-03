const roleUseCase = require('../usecases/roleUseCase');

const createRole = async (req, res) => {
  try {
    const role = await roleUseCase.createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleUseCase.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await roleUseCase.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await roleUseCase.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const ok = await roleUseCase.deleteRole(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Role not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};