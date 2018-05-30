exports.init = (db, aql) => {
  return {
    getUser: async (key, token) => {
      const cursor = await db.query(aql`
        FOR u IN users
        FILTER u._key == ${key} && ${token} IN u.token
        RETURN u`
      );
      return await cursor.next();
    },
    insertUser: async (userDocument) => {
      const cursor = await db.query(aql`INSERT ${userDocument.newGuest()} IN users RETURN NEW`);
      return await cursor.next();
    },
  }
}