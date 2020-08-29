import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

// これはRouteComponentsを条件付きで使用するもの
const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);
  return (
    <Route
      {...rest}
      // ここは普段のRouteでProps渡すときと同じ書き方
      // 今回はなにも渡すものがないんだけどね...
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
    // これもでいけるのか？
    // <>
    //   user ?
    //   <Route exact path="/" component={Component} />
    // :
    //   <Redirect to={"/login"} />
    // </>
  );
};

export default LoggedInRoute;