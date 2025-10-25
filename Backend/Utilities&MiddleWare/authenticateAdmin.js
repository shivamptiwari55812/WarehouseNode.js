import { authenticateToken } from './jwt.js';
import { User } from '../model/authentication.js';

export const authenticateAdmin = async (req, res, next) => {
  authenticateToken(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(401).json({ message: 'User not found' });

      // Assuming you have a 'role' field in User schema
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};