import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../utils/MyButton";
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const DeleteScream = ({ screamId, deleteScream }) => {
  const [open, setOpen] = useState(false);
  const handleDeleteScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <MyButton tip="Delete Scream" onClick={handleOpen}>
        <DeleteOutline color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete the scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteScream}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.proptype = {
  deleteScream: PropTypes.object.isRequired
};
export default connect(null, { deleteScream })(DeleteScream);
