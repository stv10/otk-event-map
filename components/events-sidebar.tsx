"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EventDetails from "@/components/event-details"
import type { Event } from "@/lib/events"

interface EventsSidebarProps {
  events: Event[]
  selectedEvent: Event | null
  onEventSelect: (event: Event) => void
}

export default function EventsSidebar({ events, selectedEvent, onEventSelect }: EventsSidebarProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const handleEventClick = (event: Event) => {
    onEventSelect(event)
    setShowDetails(true)
  }

  const handleBackClick = () => {
    setShowDetails(false)
  }

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold">{showDetails && selectedEvent ? "Detalle del evento" : "Próximos eventos"}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {showDetails && selectedEvent ? (
          <div className="p-4">
            <Button variant="ghost" size="sm" className="mb-4" onClick={handleBackClick}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a eventos
            </Button>

            <EventDetails event={selectedEvent} onClose={() => setShowDetails(false)} inSidebar={true} />
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isSelected={selectedEvent?.id === event.id}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

interface EventCardProps {
  event: Event
  isSelected: boolean
  onClick: () => void
}

function EventCard({ event, isSelected, onClick }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

    // Status indicator colors
    const statusColors = {
      upcoming: "bg-blue-500",
      finished: "bg-green-500",
      canceled: "bg-red-500",
      inprogress: "bg-yellow-500",
    }
  
    // Status labels
    const statusLabels = {
      upcoming: "Proximamente",
      finished: "Terminado",
      canceled: "Cancelado",
      inprogress: "En progreso",
    }

  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-accent/50 ${isSelected ? "border-primary" : ""}`}
      onClick={onClick}
    >
      {event.status && (
        <CardHeader className="p-2 pb-0 flex flex-row items-center space-y-0">
          <div className={`h-2 w-2 rounded-full mr-2 ${statusColors[event.status]}`}></div>
          <span className="text-xs font-medium text-muted-foreground">{statusLabels[event.status]}</span>
        </CardHeader>
      )}
      <CardContent className={`p-3 ${event.status ? "pt-2" : ""}`}>
        <h3 className="font-medium">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{event.location}</span>
        </div>
        {event.matches && event.matches.length > 0 && (
          <Badge variant="outline" className="mt-2 text-xs">
            {event.matches.length} {event.matches.length === 1 ? "match" : "matches"}
          </Badge>
        )}
        <div className="flex justify-end mt-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

