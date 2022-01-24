import React from "react";
import styles from "./profile.module.css";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import ProfileSidebar from "./profile-sidebar";
import ProfileEdit from "./profile-edit";
import ProfileOrders from "./profile-orders";
import OrderInfo from "../../components/order-modal-info/order-modal-info";
import Modal from "../../components/modal/modal";
import { TLocationState } from "../../types/data";

const ProfilePage = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const action = history.action === "PUSH" || history.action === "REPLACE";
  const modalOrderOpen = action && location.state && location.state.background;

  return (
    <>
      <div className={styles.profileContainer}>
        <Switch location={modalOrderOpen || location}>
          <Route path={`${path}`} exact>
            <ProfileSidebar />
            <ProfileEdit />
          </Route>
          <Route path={`${path}/orders/`} exact>
            <ProfileSidebar />
            <ProfileOrders />
          </Route>
          <Route path={`${path}/orders/:id`} exact>
            <OrderInfo />
          </Route>
        </Switch>
      </div>
      {modalOrderOpen && (
        <Route path="/orders/:id">
          <Modal visible={!!modalOrderOpen} setFunc={history.goBack}>
            <OrderInfo isModal />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default ProfilePage;
