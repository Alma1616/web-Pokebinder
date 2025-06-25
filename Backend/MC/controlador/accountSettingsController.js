const bcrypt = require('bcryptjs');
const userModel = require('../modelo/accountSettingsModel.js');

// POST /api/update-account
async function updateAccount(req, res) {
  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const userId = req.session.usuario.id;
  const { currentPassword, newEmail, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ error: 'Current password is required' });
  }

  try {
    const user = await userModel.getUserCredentials(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(currentPassword, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Incorrect current password' });

    if (!newEmail && !newPassword) {
      return res.status(400).json({ error: 'No new data provided' });
    }

    if (newEmail) {
      await userModel.updateEmail(userId, newEmail);
      req.session.usuario.email = newEmail;
    }

    if (newPassword) {
      await userModel.updatePassword(userId, newPassword);
    }

    res.json({ message: 'Account updated successfully' });
  } catch (err) {
    console.error('Error updating account:', err);
    res.status(500).json({ error: 'Failed to update account' });
  }
}

module.exports = { updateAccount };
