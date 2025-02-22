import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Therapist {
  id: number
  name: string
  expertise: string
  image: string
}

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={therapist.image} alt={therapist.name} />
          <AvatarFallback>
            {therapist.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{therapist.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{therapist.expertise}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Click to view profile and connect</p>
      </CardContent>
    </Card>
  )
}

