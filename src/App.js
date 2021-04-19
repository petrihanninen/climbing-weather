import React, {useState, useEffect, useMemo} from 'react'

import dt from 'date-and-time'

import './App.css';

import Footer from './Footer'

import {wannaClimb, wannaClimbText, wannaClimbIcon} from './weather'

const App = () => {
  const [weatherStatus, setWeatherStatus] = useState(null)
  const [weatherStatuses, setWeatherStatuses] = useState([])

  const now = useMemo(() => new Date())

  useEffect(() => {
    const fetchData = async () => {
      const s = await wannaClimb(dt.addDays(now, 0))
      setWeatherStatus(s)
    }
    fetchData()
  }, [now])

  useEffect(() => {
    const fetchData = async () => {
      let statuses = []

      for (var i = 0; i < 5; i++) {
        const s = await wannaClimb(dt.addDays(now, i))
        statuses.push(s)
      }

      setWeatherStatuses(statuses)
    }
    fetchData()
  }, [now])

  if (!weatherStatus) {
    return <div className="App"><p>...</p></div>
  }

  return (
    <div className="app">
      <div className="content">
        <h1>Tänään on {wannaClimbText(weatherStatus)} sää kiipeillä.</h1>

        <table>
          <thead>
            <tr>
              <td>{dt.format(dt.addDays(now, 0), 'D.M.')}</td>
              <td>{dt.format(dt.addDays(now, 1), 'D.M.')}</td>
              <td>{dt.format(dt.addDays(now, 2), 'D.M.')}</td>
              <td>{dt.format(dt.addDays(now, 3), 'D.M.')}</td>
              <td>{dt.format(dt.addDays(now, 4), 'D.M.')}</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              {weatherStatuses && weatherStatuses.map((s, i) => (
                <td key={i}>
                  <img src={wannaClimbIcon(s)} alt="" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <Footer />
    </div>

  );
}

export default App;
