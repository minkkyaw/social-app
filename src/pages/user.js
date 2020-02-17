import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/Scream";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/StaticProfile";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const User = props => {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState("");

  const changedUser = () => {
    const screamId = props.match.params.screamId;
    console.log(screamId);
    setScreamIdParam(screamId);
  };

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    if (screamId) setScreamIdParam(screamId);
    props.getUserData(handle);
    axios.get(`/user/${handle}`).then(res => {
      setProfile(res.data.user);
    });
  }, [screamIdParam]);

  const { screams, loading } = props.data;
  const screamsMarkup = loading ? (
    <p>Loading data ...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam)
        return (
          <Scream
            key={scream.screamId}
            scream={scream}
            changedUser={changedUser}
          />
        );
      else
        return (
          <Scream
            key={scream.screamId}
            scream={scream}
            changedUser={changedUser}
            openDialog
          />
        );
    })
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? (
          <StaticProfile profile={profile} changedUser={changedUser} />
        ) : (
          <p>Loading profile ...</p>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(mapStateToProps, { getUserData })(User);
