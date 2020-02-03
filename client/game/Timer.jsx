import React from "react";

import { StageTimeWrapper } from "meteor/empirica:core";
import Timer from "./Timer.jsx";
import PlayerProfile from "./PlayerProfile.jsx";
// import ExitSurvey from "./exit/ExitSurvey";
class timer extends React.Component {
  render() {
	const { player, game, remainingSeconds } = this.props;
    const classes = ["timer"];
    if (remainingSeconds == 140) {
	  classes.push("lessThan5");
	//   player.exitStatus.set("finished");
	//   ExitSurvey.push(exitForm);
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h4 className="bp3-heading">Timer</h4>
        <span className="seconds">{remainingSeconds}</span>
      </div>
    );
  }
}

export default (Timer = StageTimeWrapper(timer));
