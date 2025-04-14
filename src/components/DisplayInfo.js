import React, { useState } from "react";
import "./DisplayInfo.scss"
import logo from "../logo.svg"
// class DisplayInfo extends React.Component {

//   handleHideListUser = () => {
//     this.setState({
//       isShowList: !this.state.isShowList,
//     })
//   }

//   render() {
//     let { users } = this.props;
//     return (
//       <div className="display-info-container">
//         {true &&
//           <>
//             {users.map((item, index) => {
//               return (
//                 <div key={item.id} className={+item.age >= 18 ? "red" : "green"}>
//                   <div>
//                     <div>Index: {index + 1}</div>
//                     <div>My name {item.name}</div>
//                     <div>I'm {item.age}</div>
//                   </div>
//                   <div>
//                     <span>
//                       <button onClick={() => this.props.handleDeleteUser(item.id)}>-</button>
//                     </span>
//                   </div>
//                   <hr />
//                 </div>
//               )
//             }
//             )}
//           </>
//         }
//       </div>
//     )
//   }
// }

const DisplayInfo = (props) => {
  let { users } = props;

  const [isShowHideListUser, setShowHideListUser] = useState(true);

  const handleShowHideListUser = () => {
    // alert('click me');
    setShowHideListUser(!isShowHideListUser);
  }

  return (
    <div className="display-info-container">
      <div>
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser === true ? 'Hide List Users' : 'Show List Users'}
        </span>
      </div>
      {isShowHideListUser &&
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
                    <button onClick={() => props.handleDeleteUser(item.id)}>-</button>
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

export default DisplayInfo;