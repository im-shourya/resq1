"use client"

import { useEffect, useState } from "react"

interface Marker {
  id: number
  lat: number
  lng: number
  status: "critical" | "urgent" | "stable"
  label: string
}

interface VehiclePosition {
  lat: number
  lng: number
}

export function MapShowcase() {
  const [vehiclePos, setVehiclePos] = useState<VehiclePosition>({ lat: 13.02, lng: 80.18 })
  const [lastUpdated, setLastUpdated] = useState(2)

  const markers: Marker[] = [
    { id: 1, lat: 13.08, lng: 80.22, status: "critical", label: "Injured dog" },
    { id: 2, lat: 13.05, lng: 80.25, status: "urgent", label: "Trapped cat" },
    { id: 3, lat: 13.10, lng: 80.28, status: "urgent", label: "Bird rescue" },
    { id: 4, lat: 13.03, lng: 80.21, status: "stable", label: "Recovery" },
  ]

  // Simulate vehicle movement
  useEffect(() => {
    const targetLat = 13.08
    const targetLng = 80.22
    
    const interval = setInterval(() => {
      setVehiclePos(prev => ({
        lat: prev.lat + (targetLat - prev.lat) * 0.08,
        lng: prev.lng + (targetLng - prev.lng) * 0.08,
      }))
      setLastUpdated(prev => (prev >= 10 ? 2 : prev + 2))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "critical": return "#E8281E"
      case "urgent": return "#F59E0B"
      default: return "#1FCC71"
    }
  }

  // Convert lat/lng to percentage position on the map
  const toPosition = (lat: number, lng: number) => {
    const minLat = 13.0
    const maxLat = 13.12
    const minLng = 80.15
    const maxLng = 80.32
    
    return {
      top: `${((maxLat - lat) / (maxLat - minLat)) * 100}%`,
      left: `${((lng - minLng) / (maxLng - minLng)) * 100}%`,
    }
  }

  return (
    <section id="map" className="relative h-[520px] overflow-hidden bg-bg-2">
      {/* Simulated Map Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(rgba(7,10,16,0.4), rgba(7,10,16,0.4)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%230A0E14' width='800' height='600'/%3E%3Cpath d='M0 300 Q200 250 400 320 T800 280' fill='none' stroke='%23162030' stroke-width='40'/%3E%3Cpath d='M0 400 Q300 380 500 420 T800 400' fill='none' stroke='%23162030' stroke-width='50'/%3E%3Cpath d='M200 0 Q220 200 180 400 T250 600' fill='none' stroke='%23162030' stroke-width='35'/%3E%3Cpath d='M500 0 Q480 150 520 300 T480 600' fill='none' stroke='%23162030' stroke-width='30'/%3E%3Cpath d='M100 100 L300 80 L350 200 L200 250 Z' fill='%23131A24' stroke='%23232B3A' stroke-width='1'/%3E%3Cpath d='M400 150 L600 120 L650 280 L500 320 L380 250 Z' fill='%23131A24' stroke='%23232B3A' stroke-width='1'/%3E%3Cpath d='M150 350 L350 330 L400 480 L250 520 L120 450 Z' fill='%23131A24' stroke='%23232B3A' stroke-width='1'/%3E%3Cpath d='M500 350 L700 320 L750 500 L600 550 L480 480 Z' fill='%23131A24' stroke='%23232B3A' stroke-width='1'/%3E%3Ctext x='250' y='180' fill='%23364152' font-size='10' font-family='system-ui'>Anna Nagar</text%3E%3Ctext x='520' y='220' fill='%23364152' font-size='10' font-family='system-ui'>Kilpauk</text%3E%3Ctext x='280' y='420' fill='%23364152' font-size='10' font-family='system-ui'>T Nagar</text%3E%3Ctext x='580' y='450' fill='%23364152' font-size='10' font-family='system-ui'>Adyar</text%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Map Markers */}
      {markers.map((marker) => {
        const pos = toPosition(marker.lat, marker.lng)
        const color = getMarkerColor(marker.status)
        
        return (
          <div
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: pos.top, left: pos.left }}
          >
            {/* Pulse rings */}
            <span 
              className="absolute inset-0 w-4 h-4 rounded-full animate-pulse-ring"
              style={{ backgroundColor: color, animationDelay: '0s' }}
            />
            <span 
              className="absolute inset-0 w-4 h-4 rounded-full animate-pulse-ring"
              style={{ backgroundColor: color, animationDelay: '0.7s' }}
            />
            <span 
              className="absolute inset-0 w-4 h-4 rounded-full animate-pulse-ring"
              style={{ backgroundColor: color, animationDelay: '1.4s' }}
            />
            {/* Center dot */}
            <span 
              className="relative block w-4 h-4 rounded-full border-2 border-bg-2"
              style={{ backgroundColor: color }}
            />
          </div>
        )
      })}

      {/* Rescue Vehicle */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-2000 ease-out"
        style={{ 
          top: toPosition(vehiclePos.lat, vehiclePos.lng).top, 
          left: toPosition(vehiclePos.lat, vehiclePos.lng).left 
        }}
      >
        <span className="block w-5 h-5 bg-status-blue rounded-full border-2 border-white shadow-lg">
          <span className="absolute inset-0 rounded-full bg-status-blue animate-ping opacity-40" />
        </span>
      </div>

      {/* Dashed Route Line (simplified) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        <line
          x1="35%"
          y1="75%"
          x2={toPosition(markers[0].lat, markers[0].lng).left}
          y2={toPosition(markers[0].lat, markers[0].lng).top}
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="8 4"
          opacity="0.6"
        />
      </svg>

      {/* Floating Info Panel */}
      <div className="absolute top-6 left-6 glass rounded-lg p-5 max-w-[280px] z-30">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🗺</span>
          <span className="font-display text-sm font-bold text-text-1 tracking-wide">
            LIVE RESCUE MAP
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-display text-2xl font-bold text-red">4</span>
            <p className="font-mono text-[10px] text-text-3 uppercase tracking-wider">Active Cases</p>
          </div>
          <div>
            <span className="font-display text-2xl font-bold text-status-green">12</span>
            <p className="font-mono text-[10px] text-text-3 uppercase tracking-wider">NGOs Online</p>
          </div>
          <div>
            <span className="font-display text-2xl font-bold text-status-blue">3</span>
            <p className="font-mono text-[10px] text-text-3 uppercase tracking-wider">En Route</p>
          </div>
          <div>
            <span className="font-mono text-sm font-medium text-text-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-live-pulse" />
              {lastUpdated}s ago
            </span>
            <p className="font-mono text-[10px] text-text-3 uppercase tracking-wider">Last Updated</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 glass rounded-lg p-4 z-30">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red" />
            <span className="text-text-2">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-status-orange" />
            <span className="text-text-2">Urgent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-status-green" />
            <span className="text-text-2">Stable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-status-blue" />
            <span className="text-text-2">Rescue Vehicle</span>
          </div>
        </div>
      </div>
    </section>
  )
}
