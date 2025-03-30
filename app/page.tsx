import EventsLayout from "@/components/events-layout"
import { getEvents } from "@/lib/events"

export default async function Home() {
  const events = await getEvents()

  return (
      <div className="flex-1 overflow-hidden">
        <EventsLayout events={events} />
      </div>
  )
}

