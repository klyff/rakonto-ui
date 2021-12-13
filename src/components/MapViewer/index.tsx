import React, { useRef, useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L, { Map, LatLngExpression } from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

interface iMapViewer {
  position?: LatLngExpression
  markers: LatLngExpression[]
}

const MapViewer: React.FC<iMapViewer> = ({ position, markers }) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<Map | null>(null)

  const icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
  })

  useEffect(() => {
    if (!mapElement.current) return
    const element = L.map(mapElement.current)
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGhpbGlwZWNhcnJhenpvbmkiLCJhIjoiY2tyMWhmMmhmMjF2djJvcGF0NDEwbXE5eCJ9.F30oIQhfwLRHrl5pRgdz4g',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }
    ).addTo(element)
    element.setView([0, 0], 1)
    setMap(element)
  }, [mapElement])

  useEffect(() => {
    if (!map) return
    if (!position) {
      map.setView([0, 0], 1)
      return
    }
    map.setView(position, 20)
  }, [position])

  useEffect(() => {
    if (!map) return
    if (markers.length) markers.forEach(marker => L.marker(marker, { icon }).addTo(map))
  }, [markers])

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
}

export default MapViewer
