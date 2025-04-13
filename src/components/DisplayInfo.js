import React from "react";
import "./DisplayInfo.scss"
import logo from "../logo.svg"
class DisplayInfo extends React.Component {
  state = {
    isShowList: false,
  }

  componentDidMount() {
    console.log(">> Call me did mount");
    setTimeout(() => {
      document.title = "Home 3s";
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.users != prevProps.users) {
      if (this.props.users.length >= 5) {
        alert('You got 5 user');
      }
    }
  }

  handleHideListUser = () => {
    this.setState({
      isShowList: !this.state.isShowList,
    })
  }

  render() {
    let { users } = this.props;
    return (
      <div className="display-info-container">
        <img src={logo} alt="Logo-app" />
        <div>
          <span onClick={() => this.handleHideListUser()}> {this.state.isShowList ? "Click to Hidden!" : "Click to Show!"}</span>
        </div>
        {this.state.isShowList &&
          <>
            {users.map((item, index) => {
              return (
                <div key={item.id} className={+item.age >= 18 ? "red" : "green"}>
                  <div>
                    <div>Index: {index + 1}</div>
                    <div>My name {item.name}</div>
                    <div>I'm {item.age}</div>
                  </div>
                  <div>
                    <span>
                      <button onClick={() => this.props.handleDeleteUser(item.id)}>-</button>
                    </span>
                  </div>
                  <hr />
                </div>
              )
            }
            )}
          </>
        }
      </div>
    )
  }
}

export default DisplayInfo;