/**
 * It's necesary use the middleware ValidateJWT before
 * use any of these functions
 */

const isAdminRole = (req, res, next) => {
  // Verify if was use middleware validateJWT
  if (!req.user) {
    return res.status(500).json({
      msg: 'You try to verify the user role without verifying the token',
    });
  }

  // Verify the role
  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `You need Admin role. ${name} current role: ${role}`,
    });
  }

  next();
};

const isCEORole = (req, res, next) => {
  // Verify if was use middleware validateJWT
  if (!req.user) {
    return res.status(500).json({
      msg: 'You try to verify the user role without verifying the token',
    });
  }

  // Verify the role
  const { role, name } = req.user;

  if (role !== 'CEO_ROLE' && role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `You need CEO role or higher. ${name} current role: ${role}`,
    });
  }

  next();
};

const isManagerRole = (req, res, next) => {
  // Verify if was use middleware validateJWT
  if (!req.user) {
    return res.status(500).json({
      msg: 'You try to verify the user role without verifying the token',
    });
  }

  // Verify the role
  const { role, name } = req.user;

  if (role !== 'CEO_ROLE' && role !== 'ADMIN_ROLE' && role !== 'MANAGER_ROLE') {
    return res.status(401).json({
      msg: `You need Manager role or higher. ${name} current role: ${role}`,
    });
  }

  next();
};

module.exports = {
  isCEORole,
  isManagerRole,
  isAdminRole,
};
