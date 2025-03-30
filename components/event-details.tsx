"use client"
import { Calendar, MapPin, X, Globe, Instagram, Twitter, Facebook, Youtube, Twitch, Ticket, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Event, Match, Map as GameMap } from "@/lib/events"

interface EventDetailsProps {
  event: Event
  onClose: () => void
  inSidebar?: boolean
}

export default function EventDetails({ event, onClose, inSidebar = false }: EventDetailsProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Status indicator colors and labels
  const statusColors = {
    upcoming: "bg-blue-500",
    finished: "bg-green-500",
    canceled: "bg-red-500",
    inprogress: "bg-yellow-500",
  }

  const statusLabels = {
    upcoming: "Proximamente",
    finished: "Finalizado",
    canceled: "Cancelado",
    inprogress: "En progreso",
  }

  // If in sidebar, we don't need the close button and header styling is different
  return (
    <>
      {!inSidebar ? (
        <CardHeader className="relative pb-2">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          {event.status && (
            <div className="flex items-center mt-1">
              <div className={`h-2 w-2 rounded-full mr-2 ${statusColors[event.status]}`}></div>
              <span className="text-sm font-medium text-muted-foreground">{statusLabels[event.status]}</span>
            </div>
          )}
        </div>
      )}

      <div className={inSidebar ? "" : "px-6 pb-6"}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>

          {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}

          {/* Matches Section */}
          {event.matches && event.matches.length > 0 && (
            <>
              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Matches</h3>
                <MatchesList matches={event.matches} />
              </div>
            </>
          )}

          <Separator />

          {(event.socialLinks || event.ticketLink) && (
            <div className="space-y-3">
              {event.socialLinks && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Redes Sociales</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.socialLinks.website && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          <span className="sr-only">Web</span>
                        </a>
                      </Button>
                    )}
                    {event.socialLinks.instagram && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                          <span className="sr-only">Instagram</span>
                        </a>
                      </Button>
                    )}
                    {event.socialLinks.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      </Button>
                    )}
                    {event.socialLinks.facebook && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Facebook</span>
                        </a>
                      </Button>
                    )}
                    {event.socialLinks.youtube && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                          <Youtube className="h-4 w-4" />
                          <span className="sr-only">Youtube</span>
                        </a>
                      </Button>
                    )}
                    {event.socialLinks.twitch && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={event.socialLinks.twitch} target="_blank" rel="noopener noreferrer">
                          <Twitch className="h-4 w-4" />
                          <span className="sr-only">Twitch</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {event.ticketLink && (
                <div className="pt-2">
                  <Button className="w-full gap-2" asChild>
                    <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                      <Ticket className="h-4 w-4" />
                      Entradas
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

interface MatchesListProps {
  matches: Match[]
}

function MatchesList({ matches }: MatchesListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {matches.map((match, index) => (
        <MatchItem key={match.id} match={match} value={`match-${index}`} />
      ))}
    </Accordion>
  )
}

interface MatchItemProps {
  match: Match
  value: string
}

function MatchItem({ match, value }: MatchItemProps) {
  // Get the overall match result
  const getMatchResult = () => {
    if (!match.maps || match.maps.length === 0) return null

    const wins = match.maps.filter((map) => {
      const [teamScore, rivalScore] = map.result.split("-").map(Number)
      return teamScore > rivalScore
    }).length

    const losses = match.maps.filter((map) => {
      const [teamScore, rivalScore] = map.result.split("-").map(Number)
      return teamScore < rivalScore
    }).length

    if (wins > losses) return "win"
    if (wins < losses) return "loss"
    return "tie"
  }

  const matchResult = getMatchResult()

  // Result badge colors
  const resultColors = {
    win: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    loss: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    tie: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  }

  return (
    <AccordionItem value={value} className="border rounded-md mb-2 overflow-hidden">
      <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-accent/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {match.rival.logo ? (
              <img
                src={match.rival.logo || "/placeholder.svg"}
                alt={match.rival.name}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center">
                <Trophy className="h-3 w-3" />
              </div>
            )}
            <div className="text-sm font-medium">{match.rival.name}</div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {match.instance}
            </Badge>

            {matchResult && (
              <Badge className={`text-xs ${resultColors[matchResult]}`}>
                {matchResult === "win" ? "WIN" : matchResult === "loss" ? "LOSS" : "TIE"}
              </Badge>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3 pb-3 pt-1">
        <div className="space-y-2">
          {match.maps && match.maps.length > 0 ? (
            <div className="space-y-2">
              {match.maps.map((map, index) => (
                <MapItem key={index} map={map} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay informacion sobre los mapas</p>
          )}

          {match.vlr && (
            <div className="mt-3">
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <a href={match.vlr} target="_blank" rel="noopener noreferrer">
                  Ver en VLR.gg
                </a>
              </Button>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

interface MapItemProps {
  map: GameMap
}

function MapItem({ map }: MapItemProps) {
  // Parse the result
  const [teamScore, rivalScore] = map.result.split("-").map(Number)
  const result = teamScore > rivalScore ? "win" : teamScore < rivalScore ? "loss" : "tie"

  // Map background colors based on result
  const mapBgColors = {
    win: "bg-green-50 dark:bg-green-950",
    loss: "bg-red-50 dark:bg-red-950",
    tie: "bg-yellow-50 dark:bg-yellow-950",
  }

  // Score text colors based on result
  const scoreColors = {
    win: "text-green-600 dark:text-green-400",
    loss: "text-red-600 dark:text-red-400",
    tie: "text-yellow-600 dark:text-yellow-400",
  }

  return (
    <div className={`flex items-center justify-between p-2 rounded-md ${mapBgColors[result]}`}>
      <div className="text-sm font-medium">{map.map}</div>
      <div className={`text-sm font-bold ${scoreColors[result]}`}>{map.result}</div>
    </div>
  )
}

