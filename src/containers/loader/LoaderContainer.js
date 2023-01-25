import React from "react";
import LoaderCreate from "../../components/Loader/LoaderCreate";

class CreateLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "TailSpin",
      color: "#0078bc",
      height: "70",
      width: "70",
    };
  }

  render() {
    return (
      <div>
        <LoaderCreate
          type={this.state.type}
          color={this.state.color}
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    );
  }

}

export default CreateLoader;