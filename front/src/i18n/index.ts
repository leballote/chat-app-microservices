import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { errorResources, ErrorsTranslation } from "./errors";
import { resourcesResource, ResourcesTranslation } from "./resources";

type Translation = {
  translation: {
    errors: ErrorsTranslation;
    resources: ResourcesTranslation;
    app: {
      notifications: {
        accept: string;
        reject: string;
        sayHi: string;
        friendRequestAccepted: string;
        friendRequestReceived: string;
      };
      warning: {
        closeToMaxMessageLengthReached: string;
      };
      error: {
        default: string;
        loginAgain: string;
        couldNotGetChat: string;
        couldntAddParticipants: string;
        couldntLeaveGroup: string;
        couldntRejectFriendship: string;
        couldntRemoveFriend: string;
        couldntRemoveParticipant: string;
        couldntSendMessage: string;
        maxMessageLengthReached: string;
      };
      success: {
        friendRequestSent: string;
        default: string;
      };
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
        chats: {
          newChat: string;
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
          removeFriend: string;
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
      loading: string;
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
      errors: errorResources.es,
      resources: resourcesResource.es,
      app: {
        notifications: {
          friendRequestAccepted: "{{user}} aceptó tu solicitud de amitad",
          sayHi: "Dile hola!",
          friendRequestReceived: "{{user}} te envió una solicitud de amistad",
          accept: "Aceptar",
          reject: "Rechazar",
        },
        warning: {
          closeToMaxMessageLengthReached:
            "Está cerca de alcanzar el máximo de caracteres",
        },
        error: {
          loginAgain: "Por favor, intenta ingresar de nuevo",
          default: "Ups! algo salió mal",
          couldNotGetChat: "No se pudo obtener esta conversación",
          couldntAddParticipants: "No se pudo añadir participantes",
          couldntLeaveGroup: "No se pudo salir del grupo",
          couldntRejectFriendship: "No se pudo rechazar la solicitud",
          couldntRemoveFriend: "No se pudo remover amigo",
          couldntRemoveParticipant: "No se pudo remover participante",
          couldntSendMessage: "No se pudo enviar el mensaje",
          maxMessageLengthReached:
            "El máximo de caracteres permitido para un mensaje son 1000",
        },
        success: {
          friendRequestSent: "Se envió la solicitud de amistad",
          default: "La operación se completó con éxito",
        },
        drawer: {
          // general: {},
          chats: {
            newChat: "Nueva conversación",
          },
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
            removeFriend: "Eliminar amigo",
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
        loading: "Por favor, espere...",
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
      errors: errorResources.en,
      resources: resourcesResource.en,
      app: {
        notifications: {
          friendRequestAccepted: "{{user}} accepted your friend request",
          sayHi: "Say hi!",
          friendRequestReceived: "{{user}} sent you a friend request",
          accept: "Accept",
          reject: "Reject",
        },
        warning: {
          closeToMaxMessageLengthReached:
            "Close to reaching maximum message size",
        },
        error: {
          default: "Oops! something went wrong",
          loginAgain: "Please, login again",
          couldNotGetChat: "Could not get this conversation",
          couldntAddParticipants: "Could not add participants",
          couldntLeaveGroup: "Could not leave group",
          couldntRejectFriendship: "Could not reject friendship",
          couldntRemoveFriend: "Could not remove friend",
          couldntRemoveParticipant: "Could not remove participant",
          couldntSendMessage: "Could not send message",
          maxMessageLengthReached: "Max message size reached (1000)",
        },
        success: {
          friendRequestSent: "Friend request sent",
          default: "The operation was completed successfully",
        },
        drawer: {
          // general: {},
          chats: {
            newChat: "New chat",
          },
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
            removeFriend: "Remove friend",
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
        loading: "Please, wait...",
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
      errors: errorResources.de,
      resources: resourcesResource.de,
      app: {
        notifications: {
          friendRequestAccepted:
            "{{user}} hat deine Freundschaftsanfrage angenommen",
          friendRequestReceived:
            "{{user}} hat dir eine Freundschaftsanfrage geschickt",
          accept: "Akzeptieren",
          reject: "Ablehnen",
          sayHi: "Sag Hallo!",
        },
        warning: {
          closeToMaxMessageLengthReached:
            "fast maximale Nachrichtengröße erreicht",
        },
        error: {
          loginAgain: "Bitte melden Sie sich erneut an",
          default: "Hoppla! etwas ist schief gelaufen",
          couldNotGetChat: "Konnte nicht chatten",
          couldntAddParticipants: "Teilnehmer konnten nicht hinzugefügt werden",
          couldntLeaveGroup: "Gruppe konnte nicht verlassen werden",
          couldntRejectFriendship: "Konnte Freundschaft nicht ablehnen",
          couldntRemoveFriend: "Freund konnte nicht entfernt werden",
          couldntRemoveParticipant: "Teilnehmer konnte nicht entfernt werden",
          couldntSendMessage: "Nachricht konnte nicht gesendet werden",
          maxMessageLengthReached: "Maximale Nachrichtengröße erreicht (1000)",
        },
        success: {
          friendRequestSent: "Freundschaftsanfrage gesendet",
          default: "Der Vorgang wurde erfolgreich abgeschlossen",
        },
        drawer: {
          // general: {},
          chats: { newChat: "Neuer Chatt" },
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
            removeFriend: "Freund entfernen",
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
        loading: "Warten Sie mal...",
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
