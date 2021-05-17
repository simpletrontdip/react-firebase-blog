import React from "react";
import { Heading } from "@chakra-ui/react";

class DynamicText extends React.Component {
  state = {
    value: "Random text",
  };

  changeValue = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <Heading as="h1" w={[300, 400, 560]} textAlign="center">
        {this.state.value}
      </Heading>
    );
  }
}

export default DynamicText;
