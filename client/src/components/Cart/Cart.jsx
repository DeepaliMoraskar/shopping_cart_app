import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./CartStyle.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import lowestPrice from "../../static/images/lowest-price.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({

}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const open = false;

  const handleClose = () => {
    props.closeDialog(false);
  };

  return (
    <div className="cart-dialog-container">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDialog ? props.openDialog : open}
        className="cart-container-box"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className="cart-title-style"
        >
          My Cart
        </BootstrapDialogTitle>
        {props.cartItemList && props.cartItemList.length > 0 ? (
          props.cartItemList.map((item, i) => {
            return (
              <DialogContent className="cart-content-style" key={i}>
                <div className="cart-content-container">
                  <div className="cart-item-content">
                    <div className="cart-item-img">
                      <img
                        src={item.imageURL}
                        alt="logo"
                        height={80}
                        width={80}
                      />
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-title">
                        <p>{item.name}</p>
                      </div>

                      <div className="cart-item-add-remove-section">
                        <div className="cart-item-add-remove">
                          <IconButton
                            aria-label="add"
                            onClick={() => props.incrementClick(item, i)}
                          >
                            <AddIcon />
                          </IconButton>
                          <p>{item.quantity}</p>
                          <IconButton
                            aria-label="remove"
                            onClick={() => props.decreamentClick(item, i)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <p>X {item.unitPrice}</p>
                        </div>
                        <div className="item-total-value">
                          <p>Rs. {item.totalItemPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            );
          })
        ) : (
          <div className="cart-no-items-container">
            <p>No items in your cart</p>
            <p>Your favourite items are just a click away</p>
          </div>
        )}

        {props.cartItemList && props.cartItemList.length > 0 && (
          <div className="cart-lowest-price-container">
            <img src={lowestPrice} alt="lowest price" />
            <p>You won't find it cheaper anywhere</p>
          </div>
        )}

        {props.cartItemList && props.cartItemList.length > 0 && (
          <div className="cart-dialog-footer">
            <p>Promo code can be applied on payment page</p>
            {props.cartItemList && props.cartItemList.length > 0 && (
              <Button onClick={props.proceedToCheckout}>
                <p>Proceed to Checkout</p>
                <p>
                  Rs.{" "}
                  {props.cartItemList &&
                    props.cartItemList.length > 0 &&
                    props.totalPrice}
                </p>
              </Button>
            )}
          </div>
        )}
      </BootstrapDialog>
    </div>
  );
}
