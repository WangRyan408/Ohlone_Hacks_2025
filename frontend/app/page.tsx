import Link from "next/link"
import { TherapistCard } from "@/components/therapist-card"

const therapists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    expertise: "Anxiety, Depression",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: 2, name: "Dr. Michael Chen", expertise: "PTSD, Trauma", image: "/placeholder.svg?height=100&width=100" },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    expertise: "Relationships, Couples Therapy",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Therapist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <Link key={therapist.id} href={`/therapists/${therapist.id}`}>
            <TherapistCard therapist={therapist} />
          </Link>
        ))}
      </div>
    </div>
  )
}

