"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import EventMap from "@/components/event-map"
import EventsSidebar from "@/components/events-sidebar"
import type { Event } from "@/lib/events"

interface EventsLayoutProps {
  events: Event[]
}

export default function EventsLayout({ events }: EventsLayoutProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const mapRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  // Use useCallback to prevent this function from changing on every render
  const handleMapReady = useCallback((map: any) => {
    mapRef.current = map
    setMapReady(true)
  }, [])

  const handleEventSelect = useCallback((event: Event) => {
    setSelectedEvent(event)
  }, [])

  // Center map when selected event changes and map is ready
  useEffect(() => {
    if (selectedEvent && mapRef.current && mapReady) {
      // Add a small delay to ensure the map is fully rendered
      setTimeout(() => {
        mapRef.current.setView(
          [selectedEvent.latitude, selectedEvent.longitude],
          13, // Zoom level
          {
            animate: true,
            duration: 1,
          },
        )
      }, 100)
    }
  }, [selectedEvent, mapReady])

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-57px)] overflow-hidden">
      {/* Sidebar with events list */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r overflow-hidden flex flex-col">
        <EventsSidebar events={events} selectedEvent={selectedEvent} onEventSelect={handleEventSelect} />
      </div>

      {/* Map container */}
      <div className="w-full md:w-2/3 lg:w-3/4 h-full relative">
        <EventMap
          events={events}
          selectedEvent={selectedEvent}
          onEventSelect={handleEventSelect}
          onMapReady={handleMapReady}
        />
      </div>
    </div>
  )
}

