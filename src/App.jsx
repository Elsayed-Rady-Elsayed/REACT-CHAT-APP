import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notifiactaion/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {});
    return () => {
      unSub();
    };
  }, []);
  const user = false;
  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <Notification />
    </div>
  );
};

export default App;
