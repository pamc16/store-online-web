import React, { ReactNode, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../root-reducer";
import { setOpenModalShoppingCart } from "../../../layout/slices/layout.slice";
import ShoppingCart from "../shopping-cart";

const ShoppingCartModal: React.FC = () => {
  const openModal = useSelector(
    (state: RootState) => state.layout.openModalShoppingCart
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenModalShoppingCart(false));
  };

  return (
    <div>
      <Modal
        open={openModal}
        title="Carrito de Compras"
        onOk={handleClose}
        onCancel={handleClose}
        destroyOnClose={true}
      >
        <ShoppingCart />{" "}
      </Modal>
    </div>
  );
};

export default ShoppingCartModal;
