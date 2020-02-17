import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import LikeButton from "./LikeButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";
import MyButton from "../utils/MyButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const ScreamDialog = props => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");
  const {
    UI: { loading },
    getScream,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments
    }
  } = props;

  const handleOpen = () => {
    let oldPathUrl = window.location.pathname;

    const { userHandle, screamId } = props;
    const newPathUrl = `/users/${userHandle}/scream/${screamId}`;
    if (oldPathUrl === newPathUrl) oldPathUrl = `/users/${userHandle}`;
    setOldPath(oldPathUrl);
    window.history.pushState(null, null, newPathUrl);
    setNewPath(newPathUrl);
    setOpen(true);
    getScream(props.screamId);
  };

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  }, []);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
  ) : (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/user/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <Typography variant="body1" color="primary">
          {body}
        </Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Expand scream">
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="close" onClick={handleClose}>
          <CloseIcon />
        </MyButton>
        <DialogContent>{dialogMarkup}</DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

export default connect(mapStateToProps, { getScream })(ScreamDialog);
