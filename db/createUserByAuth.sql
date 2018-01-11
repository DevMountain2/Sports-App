INSERT INTO users(authId, name) VALUES ($1, $2);
SELECT * from users where authId = $1;
