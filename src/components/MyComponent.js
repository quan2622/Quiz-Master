import React from "react";

class MyComponent extends React.Component {
  state = {
    name: 'Quan xau trai',
    address: 'Can Tho',
    age: 21,
  }

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
      </div>
    )
  }
}

export default MyComponent;