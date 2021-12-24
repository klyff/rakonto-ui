import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import './map.css'
import L, { LatLngExpression } from 'leaflet'
import { markerType } from '../../lib/types'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import selectedMarkerIcon from './marker-icon-red.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const CustomMarker: React.FC<{ m: markerType; isActive: boolean }> = ({ m, isActive }) => {
  const markerRef = useRef<L.Marker>()
  const icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
  })

  const selectedIcon = L.icon({
    iconUrl: selectedMarkerIcon,
    shadowUrl: markerShadow
  })

  useEffect(() => {
    const marker = markerRef.current
    if (marker != null && isActive) {
      marker.openPopup()
    }
  }, [isActive])

  return (
    <Marker
      ref={marker => {
        // @ts-ignore
        markerRef.current = marker
      }}
      icon={isActive ? selectedIcon : icon}
      position={m.marker}
    >
      {m.content && <Popup>{m.content}</Popup>}
    </Marker>
  )
}

interface iMapViewer {
  position?: LatLngExpression
  markers: markerType[]
  initialZoom?: number
  openMarker?: string
}

const MapViewer: React.FC<iMapViewer> = ({ openMarker, initialZoom = 0, position = [0, 0], markers }) => {
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (!map) return
    map.setView([0, 0], 0)
    map.setView(position, initialZoom)
  }, [initialZoom, position, map])

  const Map = useMemo(
    () => (
      <MapContainer center={position} zoom={initialZoom} maxZoom={18} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          accessToken="pk.eyJ1IjoicGhpbGlwZWNhcnJhenpvbmkiLCJhIjoiY2tyMWhmMmhmMjF2djJvcGF0NDEwbXE5eCJ9.F30oIQhfwLRHrl5pRgdz4g"
        />
        {markers.map(m => (
          <CustomMarker key={m.id} m={m} isActive={m.id === openMarker} />
        ))}
      </MapContainer>
    ),
    [markers, openMarker, position]
  )
  return <>{Map}</>
}

export default MapViewer
