import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button, ButtonGroup } from "@blueprintjs/core";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { player } = this.props;
    player.set("instructionsCumulativeScore", 11);
  }
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game overview </h1>
          {/* <p>
            After completing the instructions, you will
            begin the game.
          </p> */}
          {/* <p>
            The game consists of{" "}
            <strong>{game.treatment.nRounds} rounds</strong>{" "}
            {game.treatment.playerCount > 1 ? (
              <span>
                and you will play simultaneously{" "}
                <strong>
                  {" "}
                  with another MTurk worker
                </strong>
              </span>
			) : null} */}
			<p>
					You are about to play a game with another MTurk worker. Typically it will last around <strong>15 minutes</strong>.
					<br />
					<br />

					In this game, you'll be either a {"  "}
					<strong>guesser</strong> or a {"  "}
					<strong>thinker</strong>.
					<br />
					At the beginning of each round, the thinker will be prompted to give a common 
					concept (e.g., sun). 
					<br />
					After choosing a concept, the thinker should then enter the category 
					of that concept (e.g., celestial body)
					<br />
					The guesser will be told <strong>only the category</strong> of that concept and will then ask the thinker a
					question like "What would it be, if it were a X (e.g.,profession)?" (Please make sure X <strong>is not the same </strong>as what the thinker just gave.)
					<br />
					The thinker will then respond with a concept that <strong>does not directly
					describe characteristics of that concept </strong>(e.g. saying "it would be astronaut" to a "profession" category, if the concept is "sun"), but rather
					metaphorically describes it (e.g."it would be king")
					<br />
					At the end of each round, the guesser will try to guess the concept.  
					<br />
					You'll see a box in the middle of the screen with your Q & A record which look like this ("sun" is the concept to be guessed):
					 {/* <div className="task-stimulus"> */}
                 		 <img src="/instructions/instruction.jpg" className="task-image" width="900" height="400"/>
						{/* </div> */}
					<br />
					This is a collaborative game, so if the guesser gets it right, then both of you will win!
					{/* The guesser will be prompted to ask a series of <strong>"what would it be, if it were a XXX"</strong> questions.
					<br /> 
					<strong></strong>(e.g., "What would it be, if it were a city?")
					<br />
					The thinker should then give a city that best describes the concept.
					{/* At the beginning of each round, the thinker will be prompted to give a common 
					concept (e.g., New York, Jesus, etc.). After choosing a concept, the thinker should then enter the category 
					of that concept (e.g., city, person, etc.).
					The guesser will be told the category of that concept and will then ask the thinker a
					question like "what would it be, if it were a X(e.g.,profession)?" The thinker will then respond with a concept that does not directly
					describe characteristics of that concept (e.g. saying "President" to a "Profession" category if the concept is "Donald Trump."), but rather
					metaphorically describes it.
					At the end of each round, the guesser will try to guess the concept.   */}
					<br />
					{/* <strong>This is a collaborative game, so if the guesser gets it right, then both of you will win a bonus!</strong> */}
			</p>
          {/* </p> */}

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
