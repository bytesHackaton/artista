const {
  findUserAuthByEmail,
  createUserAuth,
  findUserAuth,
} = require("../data/auth");
const {
  findUserSessionByToken,
  createUserSession,
} = require("../data/sessions");

//Criar conta
async function addUserAuth(data) {
  const result = await createUserAuth(data);
  return result.insertedId;
}

//Verificar se email e pass estão corretos
async function checkUserPassword(correctPassword, password) {
  return correctPassword === password;
}

//Adicionar uma sessão
async function addAuthSession(uid) {
  const result = await createUserSession({
    uid,
  });
  return result.insertedId;
}

//Devolve todas as sessões ativas
async function validateSession(token) {
  const session = await findUserSessionByToken(token);
  return session;
}

//Encontra o utilizador pelo email
async function getUserByEmail(email) {
  const result = await findUserAuthByEmail(email);
  return result;
}
//Encontra o utilizador pelo id
async function getUser(id) {
  const result = await findUserAuth(id);
  return result;
}
//Encontra o utilizador pelo id
async function getSession(token) {
  const result = await findUserSessionByToken(token);
  return result;
}

module.exports = {
  addUserAuth,
  validateSession,
  addAuthSession,
  checkUserPassword,
  getUserByEmail,
  getUser,
  getSession,
};
