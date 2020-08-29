import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Room from "./pages/Room";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ログインシステム用
import { AuthProvider } from "./AuthService";

// ログイン時のページ
import LoggedInRoute from "./LoggedInRoute";

function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <LoggedInRoute exact path="/" component={Room} />
          <Route exact path="/" component={Room} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
