import React from "react";
import { Card, Elevation, textarea} from "@blueprintjs/core";
import { shuffle } from "shuffle-seed";

// const useStyles = makeStyles({
// 	card: {
// 		minWidth: 275,
// 	},
// 	pos: {
// 		marginBottom: 12,
// 	},
// });

export default class SocialExposure extends React.Component {

  renderSocialInteraction = (otherPlayer, player, stage, round) => {
    // "or 0" here if the user hasn't submitted a guess, defaulting to 0
	const record = round.get("record");
	// var question;
	// if(stage.displayName === "Check concept")
	// {
	// 	if(1 === player.get("p_id"))
	// 		question = "The correct concept by the other player is: " + otherPlayer.round.get("set_concept");
	// 	else
	// 		question = "The guess concept by the other player is: " + otherPlayer.round.get("guess_concept");
	// }
	// else if (stage.name === "interactive 1q")
	// {
	// 	if(1 === player.get("p_id"))
	// 		question = "Your partner is thinking about a particular " + otherPlayer.round.get("category") +". Please start asking questions about it.";
	// 	else
	// 		question = "What would it be, if it is..." + otherPlayer.stage.get("stage_question");
	// 	    // question = "What would it be, if it is..." + otherPlayer.round.get("question");
	// }
	// else if(stage.displayName === "Round Outcome")
	// {
	// 	if(1 === player.get("p_id"))
	// 		question = "Your guess is: " + round.get("judgment") + ". Please click next to continue";
	// 	else
	// 	    question = "please click next to continue..."
	// }
	// else if(1===player.get("p_id"))
	// 	question = player.round.get("interact_des") + " " + otherPlayer.stage.get("stage_answer");
	// 	// question = player.round.get("interact_des") + " " + otherPlayer.round.get("answer");
	// else
	// 	question = player.round.get("interact_des")+ "  " + otherPlayer.stage.get("stage_question");
	//     // question = player.round.get("interact_des")+ "  " + otherPlayer.round.get("question");



    return (
      <Card className={"alter"} elevation={Elevation.TWO} key={otherPlayer._id}>
        {/* <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              otherPlayer.stage.submitted
                ? "bp3-intent-success"
                : "bp3-intent-primary"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                otherPlayer.stage.submitted
                  ? "bp3-icon-tick"
                  : "bp3-icon-refresh"
              }`}
            />
          </span>

          <img src={otherPlayer.get("avatar")} />
        </span> */}

	  <textarea rows = "15" cols ="100" value={record} ></textarea> 
	  {/*<Text id="textId"  rows="50" cols="60" style="font-size: 50pt, fontWeight: 'bold'">{question}</Text>*/}
	  
	  </Card>
    );
  };

  render() {
    const { game, player, round, stage } = this.props;

    const alterIds = player.get("alterIds");
    const feedbackTime = round.get("displayFeedback");

    //all players sorted by performance in descending order if feedback, otherwise, shuffle but seed by player id (the same player will see the same order for the entire game
    const allPlayers =
      feedbackTime && game.treatment.peersFeedback
        ? _.sortBy(game.players, p => p.get("cumulativeScore")).reverse()
        : shuffle(game.players, player._id);

    const alters = allPlayers.filter(p => alterIds.includes(p._id));

    return (
      <div className="social-exposure">
        <p>
          <strong>Round Record:</strong>
        </p>
        {!_.isEmpty(alters)
          ? alters.map(alter => this.renderSocialInteraction(alter, player, stage,round))
          : "You are currently NOT following anyone"}
      </div>
    );
  }
}