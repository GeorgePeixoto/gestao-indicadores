require('dotenv').config();

// Ponto único de leitura das variáveis de ambiente. Os outros arquivos
// importam daqui em vez de ler process.env diretamente.
module.exports = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  sessionTimeoutMinutes: Number(process.env.SESSION_TIMEOUT_MINUTES) || 30,
  resetTokenExpiresMinutes: Number(process.env.RESET_TOKEN_EXPIRES_MINUTES) || 60,
};
