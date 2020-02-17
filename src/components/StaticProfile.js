import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkSharp from "@material-ui/icons/LinkSharp";
import EditDetails from "./EditDetails";

const StaticProfile = props => {
  const {
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;
  return (
    <Paper>
      <div>
        <div className="image-wrapper">
          <img src={imageUrl} className="profile-image" alt="profile" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            commponent={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
            onClick={props.changedUser}
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkSharp color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {"  "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />
          {"  "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          <hr />
        </div>
        <EditDetails />
      </div>
    </Paper>
  );
};

export default StaticProfile;
