function validateEnvVariables() {
  const environmentalVariables = [
    "JWT_SECRET",
    "MONGODB_CONNECTION_STRING",
    "PORT",
  ];
  const notSet = [];

  for (const env of environmentalVariables) {
    if (!process.env[env]) {
      notSet.push(env);
    }
  }

  if (notSet.length == 0) {
    return;
  }
  console.log(notSet);

  let message = "Env variables not found:\n\n";
  for (const env of notSet) {
    message += `${env}\n`;
  }
  message += "\nPlease set them.";
  throw new Error(message);
}

module.exports = validateEnvVariables;
