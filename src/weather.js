import dummydata from './dummydata.json'
import dt from 'date-and-time'

import goodIcon from './1.png'
import midIcon from './2.png'
import badIcon from './3.png'

const getWeatherData = async () => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(dummydata)
  }
  
  try {
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast'
    const params = {
      appid: process.env.REACT_APP_OPENWEATHERMAP,
      id: '658225',
      exclude: 'minutely,hourly',
      units: 'metric',
    }

    const url = new URL(API_URL)
    url.search = new URLSearchParams(params)
    const response = await fetch(url)

    const data = await response.json()

    return data
  } catch (err) {
    console.error('Failed fetching weather data', err)
  }
}

const calcCumulativePop = (list, date) => {
  try {
    return list
      .filter(c => dt.isSameDay(date, new Date(c.dt_txt)))
      .reduce((a, c) => a + c.pop, 0)
  } catch (err) {
    console.error('Failed processing results', err)
  }
}

export const wannaClimb = async date => {
  const data = await getWeatherData()

  const pop = calcCumulativePop(data.list, date)

  if (pop === 0) return 1
  if (pop < 20) return 2
  return 3
}

export const wannaClimbText = status => {
  switch (status) {
    case 1:
      return 'hyvä'
    case 2:
      return 'vähän riski'
    default:
      return 'huono'
  }
}

export const wannaClimbIcon = status => {
  switch(status) {
    case 1:
      return goodIcon
    case 2:
      return midIcon
    default:
      return badIcon
  }
}
