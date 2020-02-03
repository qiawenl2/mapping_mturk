import React from "react";

import Timer from "./Timer.jsx";
import { Card, Icon } from "@blueprintjs/core";

export default class PlayerProfile extends React.Component {
  renderProfile() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <h3 className="bp3-heading">Your Profile</h3>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.stage.submitted
                ? "bp3-intent-success"
                : "bp3-intent-primary"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.stage.submitted ? "bp3-icon-tick" : "bp3-icon-refresh"
              }`}
            />
          </span>

          <img className="profile-avatar" src={player.get("avatar")} />
        </span>
      </div>
    );
  }

  renderScore() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <h4 className="bp3-heading">Total score</h4>
        <Icon icon="dollar" iconSize={20} title={"dollar-sign"} />
        <span>{player.get("cumulativeScore") || 0}</span>
      </div>
    );
  }

  render() {
    const { game, round, stage } = this.props;

    const feedbackTime = round.get("displayFeedback");
    const selfFeedback = game.treatment.selfFeedback;

    return (
      <Card className={"player-profile"}>
        <aside>
          {/* {this.renderProfile()} */}
          {/*We only show individual level feedback if it is feedback time & we show individual feedback*/}
          {/* {feedbackTime && selfFeedback ? this.renderScore() : null} */}
          <br />
		  <Timer stage={stage} />
        </aside>
      </Card>
    );
  }
}
