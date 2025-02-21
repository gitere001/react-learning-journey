import { createContext, useReducer } from "react";

/*contexts*/
const LoginContext = createContext();
const HomePageContext = createContext();
const ProfileContext = createContext();

/*actions*/
const ACTION = {
  LOGINUSER: "successful-login",
  ADDNEWTASK: "add-new-task",
  MARKTASKCOMPLETE: "mark-task-completed",
  DELETETASK: "delete-a-task",
  SHOWPROFILEMODAL: "show-profile-modal",
  SHOWOVERLY: "show-modal-overly",
  CLOSEPROFILEMODAL: "close-profile-modal",
  UPDATINGUSERNAME: "update-username",
  SAVEUSERNAMEUPDATE: "save-username-update",
  CHANGEPASSWORDMODAL: "change-password-modal",
  LOGOUTUSER: "logout-user"
};

/*initial states*/
const loginInitialState = {
  userName: localStorage.getItem("username") || "",
  isAuthenicated: localStorage.getItem("isAuthenticated") === "true",
};
const taskInitialState = [];
const profileInitialState = {
  activeProfileModal: null,
  showProfileModal: false,
  isUpdatingUsername: false,

  showOverly: false,
};

/*reducer functions*/
function loginReducer(state, action) {
  switch (action.type) {
    case ACTION.LOGINUSER:
      return { ...state, userName: action.payload, isAuthenicated: true };
    case ACTION.SAVEUSERNAMEUPDATE:
      return { ...state, userName: saveUserNameUpdate(action.payload) };
    case ACTION.LOGOUTUSER:
      return {...state, userName: "", isAuthenicated: false}

  }
}
function taskReducer(state, action) {
  switch (action.type) {
    case ACTION.ADDNEWTASK:
      return [...state, action.payload];
    case ACTION.MARKTASKCOMPLETE:
      return toggleCompleted(state, action.payload);
    case ACTION.DELETETASK:
      return deleteTask(state, action.payload);
    default:
      return state;
  }
}

function profileReducer(state, action) {
  switch (action.type) {
    case ACTION.SHOWPROFILEMODAL:
      return {
        ...state,
        activeProfileModal: "profilemodal",
        showOverly: true,
        showProfileModal: true,
      };
    case ACTION.CLOSEPROFILEMODAL:
      return {
        ...state,
        showOverly: false,
        showProfileModal: false,
        activeProfileModal: null,
      };
    case ACTION.UPDATINGUSERNAME:
      return { ...state, isUpdatingUsername: true };
    case ACTION.SAVEUSERNAMEUPDATE:
      return { ...state, isUpdatingUsername: false };
    case ACTION.CHANGEPASSWORDMODAL:
      return {...state, activeProfileModal: 'changepassword'}
  }
}

/*helper fuctions*/
function toggleCompleted(allTasks, id) {
  return allTasks.map((task) => {
    return task.id === id ? { ...task, completed: !task.completed } : task;
  });
}
function deleteTask(allTasks, id) {
  return allTasks.filter((task) => task.id !== id);
}

function saveUserNameUpdate(usename) {
  localStorage.setItem("username", usename);
  return usename;
}

export default function AppState({ children }) {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    loginInitialState
  );
  const [taskState, taskDispatch] = useReducer(taskReducer, taskInitialState);
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitialState
  );

  return (
    <ProfileContext.Provider
      value={{ loginState, profileState, profileDispatch, loginDispatch }}
    >
      <HomePageContext.Provider
        value={{ loginState, taskDispatch, tasks: taskState }}
      >
        <LoginContext.Provider value={{ loginDispatch, ACTION, loginState }}>
          {children}
        </LoginContext.Provider>
      </HomePageContext.Provider>
    </ProfileContext.Provider>
  );
}

export { LoginContext, HomePageContext, ProfileContext };
