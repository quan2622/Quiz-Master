import React from "react";

class MyComponent extends React.Component {
  state = {
    name: 'Quan xau trai',
    address: 'Can Tho',
    age: 21,
    position: {
      X: 0,
      Y: 0,
    }
  }

  handleClick(event) {
    // alert('CLick me!');
    console.log(event);
  }

  handlePosition = (event) => {
    this.setState({
      position: {
        X: event.screenX,
        Y: event.screenY,
      }
    })
    console.log(">>> Position mouse: " + "X: " + event.screenX + " - Y:" + event.screenY);
  }

  render() {
    return (
      <>
        <div>
          <div>
            My name is {this.state.name} and I'm from {this.state.address}
          </div>
          <div>
            <button onClick={this.handleClick} onMouseOver={this.handlePosition}>Click here</button>
          </div>
          <div>
            <span>Position Mouse on Screen: X: {this.state.position.X} - Y: {this.state.position.Y}</span>
          </div>
        </div>
      </>
    )
  }
}

export default MyComponent;