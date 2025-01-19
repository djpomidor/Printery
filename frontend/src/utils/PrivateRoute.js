import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, userGroups } = useContext(AuthContext);

  // Определяем целевой маршрут на основе групп пользователя
  const getRedirectPath = () => {
    if (!user) return "/login"; // Если пользователь не авторизован

    if (userGroups.includes("admins")) {
      return "/admin-dashboard"; // Администратор
    }
    if (userGroups.includes("managers")) {
      return "/manage"; // Менеджер
    }
    if (userGroups.includes("techologists")) {
      return "/tech"; // технолог
    }
    if (userGroups.includes("ctp_operators")) {
      return "/ctp"; // Оператор
    }

    return "/"; // Базовая страница, если группа не распознана
  };

  const redirectPath = getRedirectPath();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          // Если пользователь авторизован, отображаем переданный компонент
          <Component {...props} />
        ) : (
          // Иначе перенаправляем на нужный маршрут
          <Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
