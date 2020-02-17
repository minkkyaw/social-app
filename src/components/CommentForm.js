import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { postComment } from "../redux/actions/dataActions";

const CommentForm = ({ authenticated, UI, screamId, postComment }) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setBody(e.target.value);
  };

  useEffect(() => {
    if (UI.errors) setErrors(UI.errors);
  }, [UI.errors]);

  const handleSubmit = e => {
    e.preventDefault();
    postComment(screamId, { body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.error ? true : false}
          helperText={errors.error}
          value={body}
          onChange={handleChange}
          fullWidth
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  postComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { postComment })(CommentForm);
