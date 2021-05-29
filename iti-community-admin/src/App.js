import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { ContextProvider } from "./userDataContext";
import UsersRequests from "./views/Users/usersRequests/usersRequests";
import { db, auth } from "src/firebase";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  const [userData, setUserData] = useState(null);
  let sub1, sub2;
  useEffect(async () => {
    sub1 = await auth.onAuthStateChanged(async (res) => {
      if (res != null || res != undefined) {
        console.log(res);
        // if (location.pathname == "/login") history.push("/dashboard");
        sub2 = await db
          .collection("admins")
          .doc(res.uid)
          .onSnapshot((user) => {
            let d = {
              id: res.uid,
              firstName: user.data().firstName,
              lastName: user.data().lastName,
              avatar: user.data().avatar,
              email: user.data().email,
            };
            if (d.avatar == undefined || d.avatar == null) {
              d.avatar =
                "https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/nav-img.png?alt=media&token=c9c9cc3e-e650-4b5d-a56a-e7db7ba69c36";
            }
            setUserData(d);
          });
      } else {
        localStorage.removeItem("adminToken");
        setUserData(null);
        // history.push("/login");
      }
    });
    return () => {
      sub1();
      sub2();
    };
  }, []);

  return (
    <ContextProvider value={{ userData, setUserData }}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          {/* <AuthRoute> */}
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/userReq"
                name="Login Page"
                render={(props) => <UsersRequests {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </BrowserRouter>
          {/* </AuthRoute> */}
        </React.Suspense>
      </HashRouter>
    </ContextProvider>
  );
}

export default App;
