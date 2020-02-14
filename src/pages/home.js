import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { getScreams } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const screams = this.props.data.screams;
    let recentScreamsMarkup = screams ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading ...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = { getScreams };

export default connect(mapStateToProps, mapActionsToProps)(Home);
