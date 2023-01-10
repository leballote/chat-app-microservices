import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

type Translation = {
  translation: {
    app: {
      drawer: {
        // general: {};
        main: {
          newGroup: string;
          logout: string;
          settings: string;
        };
        settings: {
          title: string;
          language: string;
        };
        contacts: {
          title: string;
          friends: string;
          friendRequests: string;
        };
        newGroup: {
          title: string;
          groupName: string;
          groupPhrase: string;
          addParticipantsSubsection: {
            mainAction: string;
          };
        };
      };
      modals: {
        addFriend: {
          title: string;
          mainAction: string;
          friendEmail: string;
          cancel: string;
        };
        chatDetails: {
          addParticipants: string;
          leaveGroup: string;
          addParticipantsSubsection: {
            title: string;
            mainAction: string;
          };
        };
      };
      // chat: {};
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
    settingsSection: {
      languageSubsection: {
        title: string;
      };
    };
  };
};

const resources: { [language: string]: Translation } = {
  es: {
    translation: {
      app: {
        drawer: {
          // general: {},
          main: {
            newGroup: "Nuevo grupo",
            logout: "Cerrar sesión",
            settings: "Ajustes",
          },
          settings: {
            title: "Ajustes",
            language: "Idioma",
          },
          contacts: {
            title: "Amigos",
            friends: "Amigos",
            friendRequests: "Solicitudes de amistad",
          },
          newGroup: {
            title: "Nuevo grupo",
            groupName: "Nombre del grupo",
            groupPhrase: "Frase",
            addParticipantsSubsection: {
              mainAction: "Añadir participantes",
            },
          },
        },
        modals: {
          addFriend: {
            title: "Añadir amigo",
            friendEmail: "Correo de tu amigo",
            mainAction: "Envíar",
            cancel: "Cancelar",
          },
          chatDetails: {
            leaveGroup: "Salir del grupo",
            addParticipants: "Añadir participante",
            addParticipantsSubsection: {
              title: "Añadir participantes al grupo",
              mainAction: "Añadir",
            },
          },
        },
        // chat: {},
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
      settingsSection: {
        languageSubsection: {
          title: "Idioma",
        },
      },
    },
  },
  en: {
    translation: {
      app: {
        drawer: {
          // general: {},
          main: {
            newGroup: "New group",
            logout: "Log out",
            settings: "Settings",
          },
          settings: {
            title: "Settings",
            language: "Language",
          },
          contacts: {
            title: "Friends",
            friends: "Friends",
            friendRequests: "Friend requests",
          },
          newGroup: {
            title: "New group",
            groupName: "Group name",
            groupPhrase: "Phrase",
            addParticipantsSubsection: {
              mainAction: "Add participants",
            },
          },
        },
        modals: {
          addFriend: {
            title: "Add friend",
            friendEmail: "Friend's email",
            mainAction: "Send",
            cancel: "Cancel",
          },
          chatDetails: {
            addParticipants: "Add participant",
            leaveGroup: "Leave group",
            addParticipantsSubsection: {
              title: "Add participants to the group",
              mainAction: "Add",
            },
          },
        },
        // chat: {},
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
      settingsSection: {
        languageSubsection: {
          title: "Language",
        },
      },
    },
  },
  de: {
    translation: {
      app: {
        drawer: {
          // general: {},
          main: {
            newGroup: "Neue Gruppe",
            logout: "Abmelden",
            settings: "Einstellungen",
          },
          settings: {
            title: "Einstellungen",
            language: "Sprachen",
          },
          contacts: {
            title: "Freunde",
            friends: "Freunde",
            friendRequests: "Freundschaftsanfrage",
          },
          newGroup: {
            title: "Neue Gruppe",
            groupName: "Gruppe Name",
            groupPhrase: "Phrase",
            addParticipantsSubsection: {
              mainAction: "Teilnehmer hinzufügen",
            },
          },
        },
        modals: {
          addFriend: {
            title: "Freund hinzufügen",
            friendEmail: "E-Mail des Freundes",
            mainAction: "Senden",
            cancel: "Abbrechen",
          },
          chatDetails: {
            addParticipants: "Teilnehmer hinzufüge",
            leaveGroup: "Gruppe verlassen",
            addParticipantsSubsection: {
              title: "Teilnehmer zur Gruppe hinzufügen",
              mainAction: "Hinzufügen",
            },
          },
        },
        // chat: {},
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
      settingsSection: {
        languageSubsection: {
          title: "Sparchen",
        },
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
