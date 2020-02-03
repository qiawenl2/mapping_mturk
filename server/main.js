import Empirica from "meteor/empirica:core";
import { difficulties } from "./constants";

import "./callbacks.js";
import "./bots.js";

// //this only works if we have 12 participants
// const initial_network = {
//   0: [2, 4, 9],
//   1: [4, 8, 2],
//   2: [4, 10, 3],
//   3: [6, 10, 0],
//   4: [0, 6, 8],
//   5: [6, 9, 11],
//   6: [5, 11, 10],
//   7: [1, 5, 0],
//   8: [3, 1, 7],
//   9: [7, 2, 5],
//   10: [1, 3, 11],
//   11: [9, 7, 8]
// };

function getAlters(player, playerIndex, playerIds, alterCount) {
  //using the initial network structure to create the network, otherwise, a random network

  let alterIds = [];
  if (playerIds.length === 12) {
    alterIds = playerIds.filter(
      (elt, i) => initial_network[playerIndex].indexOf(i) > -1
    );
  } else {
    alterIds = _.sample(_.without(playerIds, player._id), alterCount);
  }

  return alterIds;
}

function getAvatar(player, i, type) {
  if (type === "animals") {
    return i > 16 ? `/avatars/jdenticon/${player._id}` : `/avatars/${i}.png`;
  } else {
    return `/avatars/jdenticon/${player._id}`;
  }
}

// function randomChoice(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

function getDifficulty(player, i, difficultyTypes) {
  let difficulty = null;
  if (difficultyTypes === "equal_mix") {
    //equal number of difficulties .. this can be changed to change the fraction of easy/medium/hard
    difficulty = difficulties[(i + 1) % difficulties.length];
    console.log(
      "my difficulty is ",
      difficulties[(i + 1) % difficulties.length]
    );
  } else {
    //if not equal distribution of difficulties, then we either use what is passed or random if nothing is passed
    difficulty = difficulties.includes(difficultyTypes)
      ? difficultyTypes
      : randomChoice(difficulties);
  }

  return difficulty;
}

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

//TODO: return to this once Nicolas fixes this problem
Empirica.gameInit(game => {
//   const tasks = game.treatment.randomizeTask ? _.shuffle(taskData) : taskData;
  console.log("treatments will start:", game.treatment);


  //prepare players by creating the network
  //game.set("concept", 0);
  const playerIds = _.pluck(game.players, "_id");
  game.players.forEach((player, i) => {
    player.set("cumulativeScore", 0);
    player.set("bonus", 0);
	player.set("p_id", i);
    player.set("avatar", getAvatar(player, i, "abstract"));

    // player.set(
    //   "difficulty",
    //   getDifficulty(player, i, game.treatment.difficultyTypes)
    // );
    const alterIds = getAlters(
      player,
      i,
      playerIds,
      game.treatment.altersCount
    );
    player.set("alterIds", alterIds);
  });

  _.times(game.treatment.nRounds, i => {
    const round = game.addRound();

    // //we set the round with the task data for that round
	// round.set("task", tasks[i]);
	
	// round.set("judgment", null);
	// round.set("round_score", 0);

	//always add the "response stage" which is the independent guess one
	round.addStage({
	  name: "Set concept",
      displayName: "Set concept",
      durationInSeconds: game.treatment.stageDuration
	});

	//only add the interactive stage if it is NOT the solo condition
    if (game.treatment.altersCount > 0) {
		
		// Interactive Q&A stage number setting 
		// console.log("treatments stage phases number:", game.treatment.stageNum);

		var i, n = game.treatment.stageNum; // total Q&A phases in every round
		for (i = 1; i < n+1; i++) {
			var str_ques = "Q ", str_ans = "A ";

			var str_name = "interactive " + i.toString() + "q";
			str_ques += i.toString();
			round.addStage({
				name: str_name,
				displayName: str_ques,
				durationInSeconds: game.treatment.stageDuration
			});
			
			str_name = "interactive " + i.toString() + "a";
			str_ans += i.toString();
			round.addStage({
				name: str_name,
				displayName: str_ans,
				durationInSeconds: game.treatment.stageDuration
			});
		}
	}

      round.addStage({
        name: "Guess concept interactive",
        displayName: "Guess",
        durationInSeconds: game.treatment.stageDuration
      });
	
	  round.addStage({
        name: "Final check interactive",
        displayName: "Check",
        durationInSeconds: game.treatment.stageDuration
      });

    // adding "outcome" might look complicated but basically what we are checking is this:
    // when interactive with others, show the round outcome if there is feedback or rewiring
    // when no interactions with others only show the outcome stage when feedback is given
    if (
      (game.treatment.altersCount > 0 &&
        (game.treatment.feedbackRate > 0 || game.treatment.rewiring)) ||
      (game.treatment.altersCount === 0 && game.treatment.feedbackRate > 0)
    ) {
      round.addStage({
        name: "outcome interactive",
        displayName: "Outcome",
        durationInSeconds: game.treatment.stageDuration
      });
    }
  });
});