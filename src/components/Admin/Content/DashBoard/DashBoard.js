import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import "./DashBoard.scss"
import { Tooltip } from "react-bootstrap";

const DashBoard = (props) => {
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  return (
    <div className="dashboard-container">
      <div className="title">
        Analystic DashBoard
      </div>
      <div className="content">
        <div className="left-content">
          <div className="content-child">Total user</div>
          <div className="content-child">Total quiz</div>
          <div className="content-child">Total question</div>
          <div className="content-child">Total answer</div>
        </div>
        <div className="right-content">
          <div className="chart-container">
            <BarChart width={680} height={330} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#ff6585" />
              <Bar dataKey="uv" fill="#51a3e4" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;