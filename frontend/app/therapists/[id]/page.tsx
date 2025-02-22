import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClientOnly } from "@/components/client-only"

const therapists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    expertise: "Anxiety, Depression",
    bio: "Experienced therapist specializing in anxiety and depression treatment.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    expertise: "PTSD, Trauma",
    bio: "Trauma specialist with a focus on PTSD and recovery.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    expertise: "Relationships, Couples Therapy",
    bio: "Dedicated to improving relationships and communication between couples.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function TherapistProfile({ params }: { params: { id: string } }) {
  const therapist = therapists.find((t) => t.id === Number.parseInt(params.id))

  if (!therapist) {
    return <div>Therapist not found</div>
  }

  return (
    <ClientOnly>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={therapist.image} alt={therapist.name} />
              <AvatarFallback>
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{therapist.name}</CardTitle>
              <p className="text-lg text-muted-foreground">{therapist.expertise}</p>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="mb-6">{therapist.bio}</p>
            <Link href={`/chat?therapistId=${therapist.id}`}>
              <Button>Chat with {therapist.name}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  )
}

