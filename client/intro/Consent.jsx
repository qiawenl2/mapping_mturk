import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";

export default class Consent extends React.Component {
  render() {
    return (
      <Centered>
        <div className="consent">
          <h1 className="bp3-heading"> Consent Form </h1>
          <p className="bp3-ui-text">
            <h3>By answering the following questions, you are participating in a study being performed by researchers at Wharton.
			If you have questions about this research, please contact John McCoy at jpmccoy@wharton.upenn.edu. Your participation in this research is voluntary.
			You may decline to answer any or all of the following questions. 
			Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.
			<br />
			
			<br />
			I am at least 18 years of age, have read and understand the explanation provided to me, and voluntarily agree to participate in this study.</h3>
          </p>
          <br />
          <ConsentButton text="I AGREE" />
        </div>
      </Centered>
    );
  }
}
