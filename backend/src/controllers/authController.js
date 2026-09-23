const memoryStore = require("../data/memoryStore");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      let user = await memoryStore.getUserByEmail(email);

      // If user doesn't exist, create demo user or use default
      if (!user) {
        user = await memoryStore.createUser({
          name: email.split("@")[0].replace(/[._]/g, " ") || "Demo User",
          email,
        });
      }

      res.json({
        success: true,
        message: "Login successful",
        token: `demo-jwt-token-${user.id}-${Date.now()}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and password are required",
        });
      }

      const existing = await memoryStore.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const user = await memoryStore.createUser({ name, email });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: `demo-jwt-token-${user.id}-${Date.now()}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const userId = req.query.userId || "user-1";
      const user = await memoryStore.getUser(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  }
}

module.exports = new AuthController();
