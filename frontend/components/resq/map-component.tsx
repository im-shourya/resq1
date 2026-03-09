"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Marker {
  id: number
  lat: number
  lng: number
  status: "critical" | "urgent" | "stable"
  species: string
  location: string
}

interface MapComponentProps {
  markers: Marker[]
  rescuerPath?: { lat: number; lng: number }[]
  newRescuerPosition?: { lat: number; lng: number } | null
  fullHeight?: boolean
  showHeatmap?: boolean
  heatmapZones?: { coords: number[][]; risk: "high" | "moderate" | "low" }[]
}

const statusColors = {
  critical: "#D72638",
  urgent: "#F5A623", 
  stable: "#22C55E",
}

export function MapComponent({ 
  markers, 
  rescuerPath, 
  newRescuerPosition,
  fullHeight = false,
  showHeatmap = false,
  heatmapZones = []
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const rescuerMarkerRef = useRef<L.Marker | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [19.0760, 72.8777], // Mumbai
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    })

    // Dark tile layer
    L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Add zoom control to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map)

    mapInstanceRef.current = map

    // Add heatmap zones if enabled
    if (showHeatmap && heatmapZones.length > 0) {
      heatmapZones.forEach(zone => {
        const color = zone.risk === "high" ? "#D72638" : zone.risk === "moderate" ? "#F5A623" : "#22C55E"
        L.polygon(zone.coords as [number, number][], {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          weight: 2,
        }).addTo(map)
      })
    }

    // Add markers with pulse effect
    markers.forEach((marker, index) => {
      const color = statusColors[marker.status]
      
      // Create custom pulse icon
      const pulseIcon = L.divIcon({
        className: "custom-pulse-marker",
        html: `
          <div class="marker-container" style="position: relative; width: 24px; height: 24px;">
            <div class="pulse-ring" style="
              position: absolute;
              inset: -8px;
              border: 2px solid ${color};
              border-radius: 50%;
              opacity: 0.6;
              animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              animation-delay: ${index * 200}ms;
            "></div>
            <div class="pulse-ring" style="
              position: absolute;
              inset: -8px;
              border: 2px solid ${color};
              border-radius: 50%;
              opacity: 0.4;
              animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              animation-delay: ${index * 200 + 400}ms;
            "></div>
            <div class="pulse-ring" style="
              position: absolute;
              inset: -8px;
              border: 2px solid ${color};
              border-radius: 50%;
              opacity: 0.2;
              animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              animation-delay: ${index * 200 + 800}ms;
            "></div>
            <div class="marker-dot" style="
              width: 24px;
              height: 24px;
              background: ${color};
              border-radius: 50%;
              border: 3px solid rgba(255,255,255,0.3);
              box-shadow: 0 0 20px ${color}80;
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const m = L.marker([marker.lat, marker.lng], { icon: pulseIcon }).addTo(map)
      
      // Add popup
      m.bindPopup(`
        <div style="
          background: #12121A;
          color: #F0F4F8;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #2A2A3A;
          font-family: 'DM Sans', sans-serif;
          min-width: 180px;
        ">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="
              display: inline-block;
              padding: 2px 8px;
              background: ${color}20;
              color: ${color};
              border-radius: 4px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">${marker.status}</span>
          </div>
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
            ${marker.species}
          </div>
          <div style="color: #6B7280; font-size: 12px;">
            ${marker.location}
          </div>
        </div>
      `, {
        className: "custom-popup",
        closeButton: false,
      })
    })

    // Add moving rescuer if path exists
    if (rescuerPath && rescuerPath.length > 0) {
      // Draw path trail
      const pathCoords = rescuerPath.map(p => [p.lat, p.lng] as [number, number])
      L.polyline(pathCoords, {
        color: "#3B82F6",
        weight: 2,
        dashArray: "5, 10",
        opacity: 0.5,
      }).addTo(map)

      // Create rescuer marker
      const rescuerIcon = L.divIcon({
        className: "rescuer-marker",
        html: `
          <div style="
            width: 16px;
            height: 16px;
            background: #3B82F6;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 15px #3B82F680;
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      const rescuer = L.marker([rescuerPath[0].lat, rescuerPath[0].lng], { icon: rescuerIcon }).addTo(map)
      rescuerMarkerRef.current = rescuer

      // Animate rescuer along path
      let pathIndex = 0
      const moveRescuer = () => {
        if (pathIndex < rescuerPath.length - 1) {
          pathIndex++
          rescuer.setLatLng([rescuerPath[pathIndex].lat, rescuerPath[pathIndex].lng])
        } else {
          pathIndex = 0
        }
      }
      
      const interval = setInterval(moveRescuer, 2000)
      return () => clearInterval(interval)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mounted, markers, rescuerPath, showHeatmap, heatmapZones])

  // Add new rescuer when report is submitted
  useEffect(() => {
    if (!newRescuerPosition || !mapInstanceRef.current) return

    const newRescuerIcon = L.divIcon({
      className: "new-rescuer-marker",
      html: `
        <div style="
          width: 16px;
          height: 16px;
          background: #3B82F6;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 15px #3B82F680;
          animation: scale-pop 0.3s ease-out;
        "></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    })

    L.marker([newRescuerPosition.lat, newRescuerPosition.lng], { icon: newRescuerIcon }).addTo(mapInstanceRef.current)
  }, [newRescuerPosition])

  if (!mounted) {
    return (
      <div className={`w-full ${fullHeight ? 'h-full' : 'h-full'} bg-[#12121A] flex items-center justify-center`}>
        <span className="text-[#6B7280] font-mono text-sm">Loading map...</span>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-tip {
          display: none !important;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes scale-pop {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
      <div 
        ref={mapRef} 
        className={`w-full ${fullHeight ? 'h-full' : 'h-full'}`}
        style={{ background: '#12121A' }}
      />
    </>
  )
}
