import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import MyButton from "../utils/MyButton";

const PostScream = ({ UI, postScream }) => {
  const { loading } = UI.loading;
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = e => {
    e.preventDefault();
    postScream({ body });
    handleClose();
  };
  const handleChange = e => {
    setBody(e.target.value);
  };

  useEffect(() => {
    if (UI.errors) setErrors(UI.errors);
  }, [UI.errors]);

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="close" onClick={handleClose}>
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAMS!!"
              multiline
              rows="3"
              placeholder="Scream at your placeholder"
              error={errors.body ? true : false}
              helperText={errors.body}
              onChange={handleChange}
            />
            <Button disabled={loading} type="submit" variant="contained">
              Submit
              {loading && <CircularProgress size={30} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream })(PostScream);
