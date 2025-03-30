"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import type { Event } from "@/lib/events"

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

function MapSkeleton() {
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  )
}

interface EventMapProps {
  events: Event[]
  selectedEvent: Event | null
  onEventSelect: (event: Event) => void
  onMapReady: (map: any) => void
}

export default function EventMap({ events, selectedEvent, onEventSelect, onMapReady }: EventMapProps) {
  // Default center position (can be adjusted based on events)
  const defaultPosition: [number, number] = [40.7128, -74.006] // New York City
  const mapInstanceRef = useRef<any>(null)

  // Update map view when selected event changes
  useEffect(() => {
    if (selectedEvent && mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [selectedEvent.latitude, selectedEvent.longitude],
        13, // Zoom level
        {
          animate: true,
          duration: 1,
        },
      )
    }
  }, [selectedEvent])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Import Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <MapContainer
        center={defaultPosition}
        zoom={5}
        className="map-container"
        ref={(mapInstance) => {
          // This ensures we only set the ref once
          if (mapInstance && !mapInstanceRef.current) {
            mapInstanceRef.current = mapInstance
            onMapReady(mapInstance)
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((event) => (
          <EventMarker
            key={event.id}
            event={event}
            isSelected={selectedEvent?.id === event.id}
            onSelect={onEventSelect}
          />
        ))}
      </MapContainer>
    </div>
  )
}

interface EventMarkerProps {
  event: Event
  isSelected: boolean
  onSelect: (event: Event) => void
}

function EventMarker({ event, isSelected, onSelect }: EventMarkerProps) {
  const formattedDate = new Date(event.date).toLocaleDateString()

  return (
    <Marker
      position={[event.latitude, event.longitude]}
      eventHandlers={{
        click: () => {
          onSelect(event)
        },
      }}
    >
      <Popup>
        <div className="text-sm">
          <h3 className="font-bold">{event.title}</h3>
          <p>{formattedDate}</p>
          <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
        </div>
      </Popup>
    </Marker>
  )
}

