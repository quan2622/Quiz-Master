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
    this.setState({
      name: 'QuanAP',
      age: Math.floor(Math.random() * 100),
    })
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

  handleInput = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div>
          <div>
            My name is {this.state.name} and I'm from {this.state.address}. I'm {this.state.age}
          </div>
          <div>
            <button onClick={(event) => this.handleClick(event)}>Click here</button>
          </div>
          <div>
            <span>Position Mouse on Screen: X: {this.state.position.X} - Y: {this.state.position.Y}</span>
          </div>
          <form onSubmit={(event) => this.handleSubmitForm(event)}>
            <input type="text" onChange={(event) => this.handleInput(event)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    )
  }
}

export default MyComponent;