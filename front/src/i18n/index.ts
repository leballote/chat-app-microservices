import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

type Translation = {
  translation: {
    app: {
      drawer: {
        general: {};
        main: {
          newGroup: string;
          logout: string;
        };
        contacts: {};
      };
      chat: {};
    };
    general: {
      search: string;
    };
    user: {
      user: string;
      username: string;
      password: string;
      fullName: string;
      email: string;
      friends: string;
      chats: string;
    };
    loginPage: {
      title: string;
      loginButton: string;
      dontHaveAnAccount: string;
      signup: string;
    };
    signupPage: {
      title: string;
      haveAnAccount: string;
      signupButton: string;
      confirmPassword: string;
      login: string;
    };
  };
};

const resources: { [language: string]: Translation } = {
  es: {
    translation: {
      app: {
        drawer: {
          general: {},
          main: {
            newGroup: "Nuevo grupo",
            logout: "Cerrar sesión",
          },
          contacts: {},
        },
        chat: {},
      },
      general: {
        search: "Buscar",
      },
      user: {
        user: "Usuario",
        username: "Nombre de usuario",
        password: "Contraseña",
        fullName: "Nombre completo",
        email: "Correo electrónico",
        friends: "Amigos",
        chats: "Conversaciones",
      },
      loginPage: {
        title: "Iniciar sesión",
        loginButton: "Iniciar sesión",
        dontHaveAnAccount: "No tienes cuenta todavía?",
        signup: "Regístrate",
      },
      signupPage: {
        title: "Registrarse",
        haveAnAccount: "Ya tienes cuenta?",
        signupButton: "Registrarse",
        confirmPassword: "Confirmar contraseña",
        login: "Inicia sesión",
      },
    },
  },
  en: {
    translation: {
      app: {
        drawer: {
          general: {},
          main: {
            newGroup: "New group",
            logout: "Log out",
          },
          contacts: {},
        },
        chat: {},
      },
      general: {
        search: "Search",
      },
      user: {
        user: "User",
        username: "Username",
        password: "Password",
        fullName: "Full Name",
        email: "Email",
        friends: "Friends",
        chats: "Chats",
      },
      loginPage: {
        title: "Log in",
        loginButton: "Log in",
        dontHaveAnAccount: "Don't have an account?",
        signup: "Sign up",
      },
      signupPage: {
        title: "Sign Up",
        haveAnAccount: "Have an account?",
        signupButton: "Sign up",
        confirmPassword: "Confirm password",
        login: "Log in",
      },
    },
  },
  de: {
    translation: {
      app: {
        drawer: {
          general: {},
          main: {
            newGroup: "Neue Gruppe",
            logout: "Abmelden",
          },
          contacts: {},
        },
        chat: {},
      },
      general: {
        search: "Suche",
      },
      user: {
        user: "Benutzer",
        username: "Benutzername",
        password: "Passwort",
        fullName: "Vollständiger Name",
        email: "E-Mail",
        friends: "Freunde",
        chats: "Chattet",
      },
      loginPage: {
        title: "Anmelden",
        loginButton: "Anmelden",
        dontHaveAnAccount: "Sie haben noch kein Konto?",
        signup: "Melden Sie sich an",
      },
      signupPage: {
        title: "Registrieren",
        haveAnAccount: "Sie haben ein Konto?",
        signupButton: "Registrieren",
        confirmPassword: "Passwort bestätigen",
        login: "Anmelden",
      },
    },
  },
};

const translationConfig = {
  lng: navigator.language,
  fallbackLng: ["en", "es", "de"],
  resources,
};

i18next
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init(translationConfig);
