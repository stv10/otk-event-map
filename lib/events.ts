export interface SocialLinks {
  website?: string
  instagram?: string
  twitter?: string
  facebook?: string
  youtube?: string,
  twitch?: string
}

export interface Team {
  id: string
  name: string
  logo: string
}

export interface Map {
  result: string
  map: "Ascent" | "Haven" | "Split" | "Icebox" | "Breeze" | "Fracture" | "Pearl" | "Lotus" | "Bind"
}

export interface Match {
  id: string
  instance: "R1" | "R2" | "R3" | "R4" | "R5" | "CUARTOS" | "SEMIS" | "FINAL" | "SHOWMATCH"
  rival: Team
  maps: Map[]
  vlr?: string
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  description?: string
  latitude: number
  longitude: number
  socialLinks?: SocialLinks
  ticketLink?: string
  status?: "upcoming" | "finished" | "canceled" | "inprogress"
  matches?: Match[]
}

// This function would typically fetch data from an API or database
// For now, we'll return mock data
export async function getEvents(): Promise<Event[]> {
  // Simulate API call
  return [
    {
      id: "1",
      title: "Jaque al Rey",
      date: "2025-03-29T19:00:00Z",
      location: "IFEZA, Zamora",
      description: "El roster de Otakar se prepara para derrocar al rey eterno.",
      latitude: 41.5196032,
      longitude: -5.715893,
      socialLinks: {
        website: "https://www.ifeza.es/calendario-eventos/",
        instagram: "https://www.instagram.com/ifeza_zamora/?hl=es",
        twitter: "https://x.com/CylGamesShow",
        twitch: "https://www.twitch.tv/mixwell",
        youtube: "https://youtu.be/ZewYz55mWLE?si=Acc32SNiqBt8HaHt"
      },
      ticketLink: "https://t.co/VICW8U1v5z",
      status: "finished",
      matches: [
        {
          id: "1",
          instance: "SHOWMATCH",
          rival: {
            id: "1",
            name: "Mix Friends",
            logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/6d3b4513-6824-4912-848c-dc046ee262ad-profile_image-70x70.png",
          },
          maps: [
            {
              "map": "Bind",
              result: "11-13"
            }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "PLAY CÓRDOBA GENERATION CUP FINAL",
      date: "2025-03-30T12:00:00Z",
      location: "CEFC - Centro Exposiciones, Ferias y Convenciones de Córdoba",
      description: "Jugamos nuestra primer final presencial en PlayCordobaGenerationCup por el Circuito Tormenta.",
      latitude: 37.8751225,
      longitude: -4.8180788,
      socialLinks: {
        website: "https://circuitotormenta.riotgames.com/competition/tournament/play-cordoba-generation-cup-or-fase-final-lan",
        instagram: "https://www.instagram.com/somoslatormenta/",
        twitter: "https://x.com/TormentaVALes",
        twitch: "https://www.twitch.tv/mixwell",
        youtube: "https://youtu.be/VASUt1jneLk?si=LJHYXyKP_B-9crgP"
      },
      ticketLink: "https://playgeneration.es/home-3/play-cordoba-game-fest-2025/",
      status: "finished",
      matches: [
        {
          id: "1",
          instance: "FINAL",
          vlr: "https://www.vlr.gg/459163/otakar-esports-vs-lotus-knights-cordoba-generation-cup-2025-gf",
          rival: {
            id: "2",
            name: "Lotus Knights",
            logo: "https://pbs.twimg.com/profile_images/1891637979459792896/V-wXXn-S_400x400.jpg",
          },
          maps: [
            {
              "map": "Lotus",
              result: "13-2"
            },
            {
              "map": "Split",
              result: "13-5"
            }
          ]
        }
      ]
    },
    {
      id: "3",
      title: "FINAL TOLEDO MATSURI | LAN",
      date: "2025-04-05T10:00:00Z",
      location: "Polideportivo Salto del Caballo (Toledo)",
      description: "Tercera parada del Circuito Tormenta, y volemos a enfrentarnos a Lotus Knights en la final presencial de Matsuri.",
      latitude: 39.8685321,
      longitude: -4.0165749,
      socialLinks: {
        website: "https://circuitotormenta.riotgames.com/competition/tournament/toledo-matsuri-or-fase-final",
        twitter: "https://x.com/Toledo_Matsuri",
        twitch: "https://www.twitch.tv/mixwell",
      },
      ticketLink: "https://entradasytickets.com/entradas/35",
      status: "upcoming",
      matches: [{
        id: "1",
        instance: "FINAL",
        rival: {
          id: "2",
          name: "Lotus Knights",
          logo: "https://pbs.twimg.com/profile_images/1891637979459792896/V-wXXn-S_400x400.jpg",
        },
        maps: []
      }]
    },
  ]
}

