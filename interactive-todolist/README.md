📂 **Project Structure**

```
/src
 ├── /contexts
 │    ├── AuthContext.js
 │    ├── TaskContext.js
 │    ├── ProfileContext.js
 ├── /reducers
 │    ├── authReducer.js
 │    ├── taskReducer.js
 │    ├── profileReducer.js
 ├── constants.js
 ├── AppProvider.js
 ├── App.js
```

---

### 1️⃣ **constants.js** (Keeps action types in one place)
```javascript
export const ACTION = Object.freeze({
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  SAVE_USERNAME_UPDATE: "SAVE_USERNAME_UPDATE",

  ADD_NEW_TASK: "ADD_NEW_TASK",
  MARK_TASK_COMPLETE: "MARK_TASK_COMPLETE",
  DELETE_TASK: "DELETE_TASK",

  SHOW_PROFILE_MODAL: "SHOW_PROFILE_MODAL",
  CLOSE_PROFILE_MODAL: "CLOSE_PROFILE_MODAL",
  UPDATE_USERNAME: "UPDATE_USERNAME",
  CHANGE_PASSWORD_MODAL: "CHANGE_PASSWORD_MODAL",
});
```

---

### 2️⃣ **reducers/authReducer.js**
```javascript
import { ACTION } from "../constants";

const loginInitialState = {
  userName: localStorage.getItem("username") || "",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

export function authReducer(state, action) {
  switch (action.type) {
    case ACTION.LOGIN_USER:
      return { ...state, userName: action.payload, isAuthenticated: true };
    case ACTION.SAVE_USERNAME_UPDATE:
      return { ...state, userName: saveUserNameUpdate(action.payload) };
    case ACTION.LOGOUT_USER:
      return { ...state, userName: "", isAuthenticated: false };
    default:
      return state;
  }
}

function saveUserNameUpdate(username) {
  localStorage.setItem("username", username);
  return username;
}

export { loginInitialState };
```

---

### 3️⃣ **reducers/taskReducer.js**
```javascript
import { ACTION } from "../constants";

const taskInitialState = [];

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_NEW_TASK:
      return [...state, action.payload];
    case ACTION.MARK_TASK_COMPLETE:
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case ACTION.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

export { taskInitialState };
```

---

### 4️⃣ **reducers/profileReducer.js**
```javascript
import { ACTION } from "../constants";

const profileInitialState = {
  activeProfileModal: null,
  showProfileModal: false,
  isUpdatingUsername: false,
  showOverlay: false,
};

export function profileReducer(state, action) {
  switch (action.type) {
    case ACTION.SHOW_PROFILE_MODAL:
      return { ...state, activeProfileModal: "profilemodal", showOverlay: true, showProfileModal: true };
    case ACTION.CLOSE_PROFILE_MODAL:
      return { ...state, showOverlay: false, showProfileModal: false, activeProfileModal: null };
    case ACTION.UPDATE_USERNAME:
      return { ...state, isUpdatingUsername: true };
    case ACTION.SAVE_USERNAME_UPDATE:
      return { ...state, isUpdatingUsername: false };
    case ACTION.CHANGE_PASSWORD_MODAL:
      return { ...state, activeProfileModal: "changepassword" };
    default:
      return state;
  }
}

export { profileInitialState };
```

---

### 5️⃣ **contexts/AuthContext.js**
```javascript
import { createContext, useReducer } from "react";
import { authReducer, loginInitialState } from "../reducers/authReducer";
import { ACTION } from "../constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, loginInitialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch, ACTION }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
```

---

### 6️⃣ **contexts/TaskContext.js**
```javascript
import { createContext, useReducer } from "react";
import { taskReducer, taskInitialState } from "../reducers/taskReducer";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskState, taskDispatch] = useReducer(taskReducer, taskInitialState);

  return (
    <TaskContext.Provider value={{ taskState, taskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext };
```

---

### 7️⃣ **contexts/ProfileContext.js**
```javascript
import { createContext, useReducer } from "react";
import { profileReducer, profileInitialState } from "../reducers/profileReducer";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileState, profileDispatch] = useReducer(profileReducer, profileInitialState);

  return (
    <ProfileContext.Provider value={{ profileState, profileDispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext };
```

---

### 8️⃣ **AppProvider.js** (Wraps everything)
```javascript
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { ProfileProvider } from "./contexts/ProfileContext";

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </TaskProvider>
    </AuthProvider>
  );
}
```

---

### 9️⃣ **App.js** (Uses AppProvider)
```javascript
import { AppProvider } from "./AppProvider";

function App() {
  return (
    <AppProvider>
      <div> {/* Your App Components Go Here */} </div>
    </AppProvider>
  );
}

export default App;
