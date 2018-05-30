exports.init = (db, userMapper) => {
  return {
    getUser: async (token) => {
      const result = await db.execute('SELECT * FROM users WHERE token = ?', [token]);
      return result[0];
    },
    insertUser: async (token) => {
      const result = await db.execute('INSERT INTO users (token) VALUES(?)', [token]);
      return {token};
    },
  }
}