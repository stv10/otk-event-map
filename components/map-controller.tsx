"use client"

import { useEffect } from "react"
import { useMap } from "react-leaflet"
import type { Event } from "@/lib/events"

interface MapControllerProps {
  selectedEvent: Event | null
}

export function MapController({ selectedEvent }: MapControllerProps) {
  const map = useMap()

  useEffect(() => {
    if (selectedEvent && map) {
      map.setView(
        [selectedEvent.latitude, selectedEvent.longitude],
        13, // Zoom level
        {
          animate: true,
          duration: 1,
        },
      )
    }
  }, [selectedEvent, map])

  return null
}

