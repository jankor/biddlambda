exports.init = (db, userMapper) => {
  return {
    getUser: async (token) => {
      const result = await db.execute('SELECT * FROM users WHERE token = ?', [token]);
      if (!result[0][0]) {
        // if user has a token but they don't exist just create a new user for them
        const result = await db.execute('INSERT INTO users (token) VALUES(?)', [token]);
        return {token};
      }
      return result[0][0];
    },
    insertUser: async (token) => {
      const result = await db.execute('INSERT INTO users (token) VALUES(?)', [token]);
      return {token};
    },
    authFacebook: async (token, id, fbToken, facebook) => {
      if (id === undefined || fbToken === undefined) return {isGuest: 1};
      const isFacebookValid = await facebook(id, fbToken);
      if (false === isFacebookValid) return {isGuest: 1};
      const result = await db.execute('SELECT * FROM users WHERE facebook_id = ?', [id]);
      if (!result[0][0]) {
        // upgrade user to member if it's their first time
        await db.execute('UPDATE users SET facebook_id = ?, isGuest = 0 WHERE token = ?', [id, token]);
        return {isGuest: 0};
      } else {
        // if user is registered from before just switch his session
        const result = await db.execute('SELECT * from users where  facebook_id= ?', [id]);
        return result[0][0];
      }
    },
  }
}