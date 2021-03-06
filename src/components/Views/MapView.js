import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Map from '../Map'
import Page from '../Page'
import InfoContainer from '../InfoContainer'
import Carousel from '../Carousel'
import PointDescription from '../PointDescription'
import { getAdventure } from '../../api'

const slides = [
  {
    title: 'Route 1',
    distance: 10.5,
    elevation: 150,
    locations: 5
  },
  {
    title: 'Route 2',
    distance: 10.5,
    elevation: 150,
    locations: 5
  },
  {
    title: 'Route 3',
    distance: 10.5,
    elevation: 150,
    locations: 5
  }
]

const MapView = () => {
  const [selectedRoute, setSelectedRoute] = useState(0)
  const [showPicker, setShowPicker] = useState(true)
  const [init, setInit] = useState(false)
  const [adventures, setAdventures] = useState(null)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const history = useHistory()

  const fetchAdventure = async d => {
    const data = await getAdventure(d)
    setAdventures(data)
  }

  useEffect(() => {
    if (history.location.state && history.location.state.difficulty) {
      fetchAdventure(history.location.state.difficulty)
    }
  }, [history.location.state])

  const getPoints = () => {
    //const points = [{lat: 60.278168, lng: 24.596941, icon:'location.svg', text: 'Muinaisluola'}, {lat: 60.275972, lng:24.597269, icon:'cave.png',text: 'Hieno kivi'}, {lat:60.277539, lng:24.602004, icon:'location.svg', text:'Hieno kuusi'}]
    const points = []
    if (adventures) {
      adventures[selectedRoute].adventure.res.forEach((p, i) => {
        const getIcon = (i) => {
          if (i === 1) return 'kys.png'
          else if (i === 3) return 'cave.svg'
          else return 'location3.png'
        }
        if (!p) return
        points.push({
          lat: Number(p.lat),
          lng: Number(p.lng),
          icon: getIcon(i),
          size: i == 1 ? '14px' : null,
          text: 'test',
          id: p['Mjtunnus,N,10,0']
        })
      })
    }
    return points
  }

  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 100)
  }, [])

  /* const selected = adventures[selectedRoute].adventure.res.find(p => p['Mjtunnus,N,10,0'] === selectedPoint)
  console.log('selected', selected) */

  return (
    <Page>
      <Map onPointClick={id => setSelectedPoint(id)} points={getPoints()} />
      {init && adventures && (
        <>
          {!showPicker ? (
            <PointDescription
              point={
                !selectedPoint
                  ? adventures[selectedRoute].adventure.res[0]
                  : adventures[selectedRoute].adventure.res.find(p => p['Mjtunnus,N,10,0'] === selectedPoint)
              }
            />
          ) : (
            <Carousel
              finish={() => setShowPicker(false)}
              options={adventures}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
          )}
        </>
      )}
    </Page>
  )
}

export default MapView
