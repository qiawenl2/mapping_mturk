import React from "react";

import TaskResponse from "./TaskResponse";
// import TaskStimulus from "./TaskStimulus";
import SocialExposure from "./SocialExposure"

export default class Task extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    return (
      <div className="task">
        {/* <TaskStimulus round={round} stage={stage} player={player} game={game}/> */}
        {/* <SocialExposure player={player} round={round} stage={stage} game={game} /> */}
		 {stage.name.includes("interactive") ? (
            <SocialExposure
              player={player}
              round={round}
              stage={stage}
              game={game}
            />
          ) : null}
        
		<TaskResponse round={round} stage={stage} player={player} game={game} />
      </div>
    );
  }
}
