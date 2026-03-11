const userUseCase = require('../usecases/userUseCase');

const createUser = async (req, res) => {
  try {
    const user = await userUseCase.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userUseCase.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userUseCase.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userUseCase.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const ok = await userUseCase.softDeleteUser(req.params.id);
    if (!ok) return res.status(404).json({ error: 'User not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await userUseCase.enableUser(email, username);
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await userUseCase.disableUser(email, username);
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const users = await userUseCase.getUsersByRoleId(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  enableUser,
  disableUser,
  getUsersByRole,
};