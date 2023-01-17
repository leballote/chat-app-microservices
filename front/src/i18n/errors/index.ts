export type ErrorsTranslation = {
  NOT_AUTHENTICATED: string;
  INCORRECT_CREDENTIALS: string;
  TOO_MANY_ATTEMPTS: string;
  ATTEMPT_TOO_SOON: string;
  MISSING_CREDENTIALS: string;
  USERNAME_TAKEN: string;
  DUPLICATE_ERROR: string;
  PASSWORDS_DONT_MATCH: string;
  NOT_FOUND_ERROR: string;
  FRIENDHIP_REQUEST_ALREADY_SENT_ERROR: string;
  FRIENDHIP_REQUEST_ALREADY_RECEIVED_ERROR: string;
  CANNOT_REQUEST_FRIENDSHIP_TO_YOURSELF_ERROR: string;
  YOU_ARE_ALREADY_FRIENDS_ERROR: string;
  fallback: string;
};
export const errorResources: Record<"en" | "es" | "de", ErrorsTranslation> = {
  en: {
    NOT_AUTHENTICATED: "You are not authenticated",
    INCORRECT_CREDENTIALS: "Username or password incorrect",
    TOO_MANY_ATTEMPTS: "Too many attempts. Please try in a while",
    ATTEMPT_TOO_SOON: "Attempted too soon, please try in a second",
    MISSING_CREDENTIALS: "Missing credentials",
    USERNAME_TAKEN: "This username is already taken. Please, try another one",
    DUPLICATE_ERROR: "El {{key}} '{{value}}' ya existe",
    NOT_FOUND_ERROR: "{{meta.resource}} no existe",
    PASSWORDS_DONT_MATCH: "Passwords don't match",
    FRIENDHIP_REQUEST_ALREADY_SENT_ERROR:
      "You already sent friend request to this user",
    FRIENDHIP_REQUEST_ALREADY_RECEIVED_ERROR:
      "This user has already sent you a friend request",
    CANNOT_REQUEST_FRIENDSHIP_TO_YOURSELF_ERROR:
      "You cannot request friendship to yourself",
    YOU_ARE_ALREADY_FRIENDS_ERROR: "You are already friend with this user",
    fallback: "Something went wrong",
  },
  es: {
    NOT_AUTHENTICATED: "No estás autenticado",
    INCORRECT_CREDENTIALS: "Usuario o contraseña incorrectas",
    MISSING_CREDENTIALS: "Por favor, proporcione sus credenciales",
    TOO_MANY_ATTEMPTS: "Demasiados intentos. Por favor intente más tarde",
    ATTEMPT_TOO_SOON:
      "Intentos demasiado seguidos, por favor, espere un momento e inténtelo de nuevo",
    USERNAME_TAKEN: "Este usuario ya existe, por favor pruebe con otro",
    DUPLICATE_ERROR: "The {{key}} '{{value}}' ya existe",
    NOT_FOUND_ERROR: "{{meta.resource}} no existe",
    PASSWORDS_DONT_MATCH: "Las contraseñas no coinciden",
    FRIENDHIP_REQUEST_ALREADY_SENT_ERROR:
      "Ya le envíaste una solicitud de amistad a este usuario",
    FRIENDHIP_REQUEST_ALREADY_RECEIVED_ERROR:
      "Este usuario ya te envió una solicitud de amistad",
    CANNOT_REQUEST_FRIENDSHIP_TO_YOURSELF_ERROR:
      "No puedes envíar solicitud de amistad a ti mismo",
    YOU_ARE_ALREADY_FRIENDS_ERROR: "Ya eres amigo de este usuario",
    fallback: "Algo salio mal",
  },
  de: {
    NOT_AUTHENTICATED: "Sie sind nicht authentifiziert",
    INCORRECT_CREDENTIALS: "Benutzername oder Passwort falsch",
    TOO_MANY_ATTEMPTS:
      "Zu viele Versuche. Bitte versuchen Sie es in einer Weile",
    ATTEMPT_TOO_SOON:
      "Zu früh versucht, bitte versuchen Sie es in einer Sekunde",
    MISSING_CREDENTIALS: "Fehlende Anmeldeinformationen",
    USERNAME_TAKEN:
      "Dieser Benutzername ist bereits vergeben. Bitte versuchen Sie es mit einem anderen",
    DUPLICATE_ERROR: "Die {{key}} {{value}} existiert bereits",
    NOT_FOUND_ERROR: "{{meta.resource}} not found",
    PASSWORDS_DONT_MATCH: "Passwörter stimmen nicht überein",
    fallback: "Etwas ist schief gelaufen",
  },
};
