import React, { Fragment } from "react";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

import MyButton from "../utils/MyButton";

const LikeButton = props => {
  const {
    user: { authenticated, likes },
    screamId
  } = props;
  const likedScream = () => {
    if (likes && likes.find(like => like.screamId === screamId)) return true;
    else return false;
  };

  const likeScream = () => {
    props.likeScream(screamId);
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId);
  };

  return (
    <Fragment>
      {!authenticated ? (
        <MyButton tip="Like">
          <Link to="/login">
            <FavoriteBorder color="primary" />
          </Link>
        </MyButton>
      ) : likedScream() ? (
        <MyButton tip="UnLike" onClick={unlikeScream}>
          <Favorite color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={likeScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  LikeButton
);
