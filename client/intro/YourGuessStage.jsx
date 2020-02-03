import React from "react";

import { Centered } from "meteor/empirica:core";
import {
  Button,
  ButtonGroup,
  Card,
  FormGroup,
  Icon,
  Label
} from "@blueprintjs/core";
import Slider from "meteor/empirica:slider";

export default class YourGuessStage extends React.Component {
  constructor(props) {
    super(props);
    const { player, game } = this.props;

    this.state = {
      guess: player.get("instructionsGuess"),
      submitted: false,
      time: {},
      seconds: game.treatment.stageDuration
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let timeLeftVar = secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  //prevents memory leak: https://egghead.io/lessons/react-stop-memory-leaks-with-componentwillunmount-lifecycle-method-in-react
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.countDown);
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;

    if (!this.state.submitted) {
      // Remove one second, set state so a re-render happens.
      this.setState({
        time: secondsToTime(seconds),
        seconds: seconds
      });
    }

    // Check if we're at zero.
    if (seconds === 0) {
      this.setState({ submitted: true });
    }
  }

  handleChange = num => {
    const value = Math.round(num * 100) / 100;
    this.setState({ guess: value });
  };

  handleRelease = num => {
    const { player } = this.props;
    const value = Math.round(num * 100) / 100;
    player.set("instructionsGuess", value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
  };

  handleReset = event => {
    const { game } = this.props;
    event.preventDefault();
    this.setState({ submitted: false });
    this.setState({ seconds: game.treatment.stageDuration });
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game, player } = this.props;
    const remainingSeconds = this.state.time.s;
    //every game will have at least 1 stage
    let nStages = 1;
    //if there are more than 1 alter, then the game has social interaction
    if (game.treatment.altersCount > 0) {
      nStages += 1;
    }
    //if the game has feedback or is social with either feedback or rewiring (or both) then there will be another stage
    if (
      (game.treatment.altersCount > 0 &&
        (game.treatment.feedbackRate > 0 || game.treatment.rewiring)) ||
      (game.treatment.altersCount === 0 && game.treatment.feedbackRate > 0)
    ) {
      nStages += 1;
    }

    const guess = this.state.guess || player.get("instructionsGuess");

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Round overview </h1>

          <p>
            You will play <strong>{game.treatment.nRounds} rounds</strong> total and each round will consist of a set concept stage,
			 <strong>{game.treatment.stageNum} Question & Answer stage</strong>, a guess concept stage, a check concept stage, and an outcome stage. 
          </p>

          <h3 className="bp3-heading">1. The Set Concept Stage</h3>

          <p>
            In the <strong>Set concept</strong> stage the thinker will be prompted to 
			enter a concept he/she is thinking about (e.g., New York). Also, the thinker should enter the category (e.g., city) of that concept.
			Both of you will be able to click <strong>Submit</strong> whenever you are ready to move on. You can take maximum{" "}
            <strong>{game.treatment.stageDuration}</strong> seconds to submit
            your answer. The <strong>tick mark</strong> by the avatar indicates
            whether a final answer have been submitted for this stage.
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/set_concept.gif" className="task-image" />
                </div>
		  <h3 className="bp3-heading">2. The Question Stages</h3>

          <p>
            In the <strong>Question </strong> stages the guesser will ask the thinker a question about that concept, like 
			"what would it be, if it is a X?" (e.g., color). 
			In this stage, the thinker could feel free to click "submit" anytime. 
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/question.gif" className="task-image" />
                </div>

		  <h3 className="bp3-heading">3. The Answer Stages</h3>

          <p>
            In the <strong>Answer</strong> stage the thinker will be answering the question asked by the guesser. For example, the thinker
			might feel "gold" is the color that New York would be.
			In this stage, the guesser could feel free to click "submit" anytime. 
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/answer.gif" className="task-image" />
                </div>
		  <h3 className="bp3-heading">4. The Guess concept stage</h3>

          <p>
            In the <strong>Guess concept</strong> stage the guesser will be prompted to make a guess about the concept.
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/guess_concept.gif" className="task-image" />
                </div>

		  <h3 className="bp3-heading">5. The Check concept stage</h3>

          <p>
            In the <strong>Check concept</strong> stage, the thinker would be able to see the guesser's answer, 
			and the guesser would be able to see the thinker's concept.
			
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/check_concept.gif" className="task-image" />
                </div>
		  <h3 className="bp3-heading">6. The Round outcome stage</h3>

          <p>
            In the <strong>Round outcome</strong> stage, the guesser would be notified whether he/she is correct. Clicking on "next" would lead to the next round.
          </p>
                <div className="task-stimulus">
                  <img src="/instructions/round_outcome.gif" className="task-image" />
                </div>
          <div className="round">
            <div className="content">
              {/*Here is the playerProfile*/}
              

              <div className="task">
                {/* <div className="task-stimulus">
                  <img src="/instructions/task.png" className="task-image" />
                </div> */}

                <div className="task-response">
                  {/* <form onSubmit={this.handleSubmit}> */}
                    {/* <FormGroup>
                      <Label>
                        Your current guess of the correlation is: {guess}
                      </Label>

                      <Slider
                        min={0}
                        max={1}
                        stepSize={0.01}
                        labelStepSize={0.25}
                        onChange={this.handleChange}
                        onRelease={this.handleRelease}
                        value={guess}
                        hideHandleOnEmpty
                        disabled={this.state.submitted}
                      />
                    </FormGroup> */}

                    {/* {this.state.submitted ? (
                      <FormGroup>
                        <Button
                          icon={"refresh"}
                          minimal={true}
                          intent={"primary"}
                          large={true}
                          fill={true}
                          onClick={this.handleReset}
                        > */}
                          {/* <span>
                            try again (will not be available in the game)
                          </span>
                        </Button>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Button
                          type="submit"
                          icon={"tick"}
                          large={true}
                          fill={true}
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    )} */}
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>

          <ButtonGroup className={"button-group"}>
            <Button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              icon="arrow-left"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              rightIcon="arrow-right"
              intent="primary"
              alignText={"right"}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      </Centered>
    );
  }
}

function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: hours,
    m: minutes,
    s: seconds
  };
  return obj;
}

function renderTimer(remainingSeconds) {
  const classes = ["timer"];
  if (remainingSeconds <= 5) {
    classes.push("lessThan5");
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
