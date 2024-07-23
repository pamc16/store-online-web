import React, { ReactNode, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../root-reducer";
import Login from "../login";
import { setOpenModalLogin } from "../slice/login.slice";

const LoginModal: React.FC = () => {
  const openModal = useSelector(
    (state: RootState) => state.login.openModalLogin
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenModalLogin(false));
  };

  return (
    <div>
      <Modal
        open={openModal}
        onOk={handleClose}
        onCancel={handleClose}
        destroyOnClose={false}
        style={{zIndex: 10000}}
        okButtonProps={{ style: { display: 'none' } }} // Oculta el botón Ok
        cancelButtonProps={{ style: { display: 'none' } }} // Oculta el botón Cancel
      >
        <Login />{" "}
      </Modal>
    </div>
  );
};

export default LoginModal;
