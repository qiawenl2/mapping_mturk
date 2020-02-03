import React from "react";
import Slider from "meteor/empirica:slider";
import {
  HTMLTable,
  Button,
  Callout,
  FormGroup,
  Label,
  RangeSlider,
  EditableText
} from "@blueprintjs/core";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    // console.log("player.round._id", this.props.player.round._id);
    //
    // const { player } = this.props;
    //
    // this.throttledGuessUpdate = _.throttle(value => {
    //   player.round.set("guess", value);
    // }, 50);
    //
    // this.state = { guess: null };
  }

  handleChange = num => {
    const { game, stage, player } = this.props;
    if (stage.name !== "outcome") {
      const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      // this.throttledGuessUpdate(value);
      player.round.set("guess", value);
    }
  };

  handleRelease = num => {
    const { game, stage, player } = this.props;
    if (stage.name !== "outcome") {
       const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
       player.round.set("guess", value);
    //   player.stage.append("guess", value);
    }
  };

  handleEditTextConceptChange = str => {
    const { round, player } = this.props;
    // if (stage.name !== "outcome") {
    //   const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      //this.throttledGuessUpdate(value);
	//   player.round.set("question", str);
	//   if(0 === player.get("p_id")){
		player.round.set("set_concept", str);
	  	round.set("concept", str);
	//   }
    // }
  };

  handleEditTextConceptRelease = str => {
	const { round, player } = this.props;
    // const { stage, player } = this.props;
    // if (stage.name !== "outcome") {
	//   player.round.set("question", str);
	  
	// 	if(0 === player.get("p_id")){
		player.round.set("set_concept", str);
		round.set("concept", str);
		// }
    // }
  };

   handleEditTextChange = str => {
    const { stage, player } = this.props;
    if (stage.name !== "outcome") {
    //   const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      //this.throttledGuessUpdate(value);
	  player.round.set("question", str);
	//   if(0 === player.get("p_id")){
	// 	player.round.set("set_concept", str);
	//   	round.set("concept", str);
	//   }
    }
  };

  handleEditTextRelease = str => {
    const { stage, player } = this.props;
    if (stage.name !== "outcome") {
	  player.round.set("question", str);
	  
		// if(0 === player.get("p_id")){
		// 	player.round.set("set_concept", str);
		// 	round.set("concept", str);
		// }
    }
  };


  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted = () => {
    return (
      <div className={"task-response"}>
        <Callout
          className={"call-out"}
          title={"Waiting on other players..."}
          icon={"automatic-updates"}
        >
          Please wait until all players are ready
        </Callout>
      </div>
    );
  };

  renderCurrentGuess = (round, player) => {
	  if(round.index === 0)
		{
			return (
				
			<Label>
				Your current concept round 0 is:{player.round.get("guess")}
			</Label>

			);
		}
		else
		{
			return (
			<Label>
				Your current guess of the correlation is: {player.round.get("guess")}
				
			</Label>
			);
		}
    
  };
  
  renderCurrentChoice = (round, player) => {
	//   const { game } = this.props;
    //   if(round.index === 0)
	// 	{
	// 		return (
				
	// 		<Label>
	// 			Your current concept round 0 is:{player.round.get("question")}
	// 		</Label>

	// 		);
	// 	}
	// 	else
	// 	{
	// 		return (
	// 		<Label>
	// 			{/* Your current choice of the correlation is: {player.round.get("choice")} */}
	// 			Your current question of the correlation is: {round.get("question")}
	// 			{/* player 1 guess of the correlation is: {game.player[0].round.get("guess")} */}
	// 		</Label>
	// 		);
	// 	}
  };

renderEditableTextConceptCatalog(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	const isSetConcept = stage.name === "Set concept" ;
	// const isQuestion = stage.displayName === "Question Phases1" || stage.name === "Question Phases2" || stage.name === "Question Phases3";

    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextConceptChange}
            onRelease={this.handleEditTextConceptRelease}
            value={round.get("concept")}
            disabled={!isSetConcept}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextConceptChange}
            onRelease={this.handleEditTextConceptRelease}
            value={round.get("concept")}
            disabled={!isSetConcept}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }


  renderEditableText(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	// const isSetConcept = stage.name === "Set concept" ;
	const isQuestion = stage.displayName === "Question Phases1" || stage.name === "Question Phases2" || stage.name === "Question Phases3";

    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isQuestion}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isQuestion}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }

  renderEditableText_player1(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	const isSetConcept = stage.name === "Set concept" ;
	const isAnswer = stage.displayName === "Answer Phases1" || stage.name === "Answer Phases2" || stage.name === "Answer Phases3";
    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }

  renderSlider(game, player, round, isOutcome) {
    const feedbackTime = round.get("displayFeedback");
    const correctAnswer = round.get("task").correctAnswer;
    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <RangeSlider
            className={"range-slider"}
            disabled={true}
            min={0}
            max={1}
            stepSize={0.01}
            labelStepSize={0.25}
            value={
              player.round.get("guess") === null
                ? [correctAnswer, correctAnswer]
                : [player.round.get("guess"), correctAnswer].sort()
            }
          />
        ) : (
          <Slider
            min={0}
            max={1}
            stepSize={0.01}
            labelStepSize={0.25}
            onChange={this.handleChange}
            onRelease={this.handleRelease}
            value={player.round.get("guess")}
            disabled={isOutcome}
            hideHandleOnEmpty
          />
        )}
      </FormGroup>
    );
  }

  renderFeedback = (player, round) => {
    const { game } = this.props;
    const peersFeedback = game.treatment.peersFeedback;

    return (
      <div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Your guess</th>
              <th>Actual correlation</th>
              <th>Score increment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                {player.round.get("guess_concept") === undefined ||
                player.round.get("guess_concept") === null
                  ? "No guess given"
                  : player.round.get("guess_concept")}
              </td>
              <td>{round.get("concept").correctAnswer}</td>
              <td>
                <strong
                  style={{
                    color: peersFeedback
                      ? player.round.get("scoreColor")
                      : "black"
                  }}
                >
                  +{player.round.get("score")}
                </strong>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </div>
    );
  };

  render() {
    const { game, stage, round, player } = this.props;
    //todo: add this back after the experiment
	
    //if the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    const feedbackTime = round.get("displayFeedback");
	const isOutcome = stage.name === "outcome" ;
	// const isOutcome = round.index === 5;
	const selfFeedback = game.treatment.selfFeedback;
	

	if(0 === player.get("p_id")){
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>
			{/* <FormGroup>
				{!isOutcome ? this.renderCurrentGuess(round, player) : null}
				{this.renderSlider(game, player, round, isOutcome)}
			</FormGroup> */}

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{this.renderEditableText(player, round, isOutcome)}
			</FormGroup>

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{this.renderEditableTextConceptCatalog(player, round, isOutcome)}
			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isOutcome && feedbackTime && selfFeedback
				? this.renderFeedback(player, round)
				: null}

			<FormGroup>
				<Button type="submit" icon={"tick"} large={true} fill={true}>
				{isOutcome ? "Next" : "Submit"}
				</Button>
			</FormGroup>
			</form>
		</div>
		);
	}
	else
	{
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>
			<FormGroup>
				{!isOutcome ? this.renderCurrentGuess(round, player) : null}
				{this.renderSlider(game, player, round, isOutcome)}
			</FormGroup>

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{this.renderEditableText_player1(player, round, isOutcome)}
			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isOutcome && feedbackTime && selfFeedback
				? this.renderFeedback(player, round)
				: null}

			<FormGroup>
				<Button type="submit" icon={"tick"} large={true} fill={true}>
				{isOutcome ? "Next" : "Submit"}
				</Button>
			</FormGroup>
			</form>
		</div>
		);
	}
  }
}
