import React from "react";
import styles from "../page.module.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileSidebar from "./profile-sidebar";
import ProfileEdit from "./profile-edit";
import ProfileOrders from "./profile-orders";

const ProfilePage = () => {
  const { path } = useRouteMatch();

  return (
    <div className={styles.profileContainer}>
      <ProfileSidebar />
      <Switch>
        <Route path={`${path}`} exact>
          <ProfileEdit />
        </Route>
        <Route path={`${path}/orders/`} exact>
          <ProfileOrders />
        </Route>
      </Switch>
    </div>
  );
};

export default ProfilePage;
