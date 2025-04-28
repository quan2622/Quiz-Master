import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./DashBoard.scss"
import { useEffect, useState } from "react";
import { getOverview } from "../../../../services/dashboardService";
import { toast } from "react-toastify";
import CountUp from "react-countup";

const DashBoard = (props) => {

  const [dataOverView, setDataOverView] = useState({});
  const [dataChart, setDataChart] = useState([]);


  useEffect(() => {
    fetchDataOverview();
  }, [])

  const fetchDataOverview = async () => {
    const res = await getOverview();
    console.log('check data overview: ', res.DT);
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      // process chart data
      let qz = 0, qs = 0, as = 0;
      qz = res?.DT?.others?.countQuiz ?? 0;
      qs = res?.DT?.others?.countQuestions ?? 0;
      as = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          "name": "Quizzes",
          "value": qz,
        },
        {
          "name": "Questions",
          "value": qs,
        },
        {
          "name": "Answers",
          "value": as
        }
      ]
      setDataChart(data);
    } else {
      toast.error(res.EM);
    }
  }
  console.log('>>>check data overview render: ', dataOverView);


  return (
    <div className="dashboard-container">
      <div className="title">
        Analystic DashBoard
      </div>
      <div className="content">
        <div className="left-content">
          <div className="content-child">
            <span className="text-1">Total user</span>
            <span className="text-2">
              {dataOverView && dataOverView.users &&
                dataOverView.users.total ?
                <>
                  <CountUp end={dataOverView.users.total} duration={1.5} redraw={true} />
                </> : <></>}
            </span>
          </div>
          <div className="content-child">
            <span className="text-1">Total quiz</span>
            <span className="text-2">
              {dataOverView && dataOverView.users &&
                dataOverView.users.total ?
                <>
                  <CountUp end={dataOverView.others.countQuiz} duration={1.5} redraw={true} />
                </> : <></>}
            </span>
          </div>
          <div className="content-child">
            <span className="text-1">Total question</span>
            <span className="text-2">
              {dataOverView && dataOverView.users &&
                dataOverView.users.total ?
                <>
                  <CountUp end={dataOverView.others.countQuestions} duration={1.5} redraw={true} />
                </> : <></>}
            </span>
          </div>
          <div className="content-child">
            <span className="text-1">Total answer</span>
            <span className="text-2">
              {dataOverView && dataOverView.users &&
                dataOverView.users.total ?
                <>
                  <CountUp end={dataOverView.others.countAnswers} duration={2} redraw={true} />
                </> : <></>}
            </span>
          </div>
        </div>
        <div className="right-content">
          <ResponsiveContainer width="98%" height="100%">
            <BarChart data={dataChart} isAnimationActive={true}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={40} animationDuration={2000} animationEasing="ease-in-out">
                {
                  dataChart.map((item, index) => {
                    const color_col = ["#ff6585", "#51a3e4", "#ff9f41"];
                    return <Cell key={`cell-${item.name}`} fill={color_col[index]} />
                  })
                }
              </Bar>
              {/* <Bar dataKey="qs" fill= /> */}
              {/* <Bar dataKey="as" fill= /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;