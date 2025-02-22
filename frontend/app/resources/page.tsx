import { ResourceCard } from "@/components/resource-card"

const resources = [
  { id: 1, title: "Understanding Anxiety", type: "Article", link: "#" },
  { id: 2, title: "Mindfulness Meditation Guide", type: "Video", link: "#" },
  { id: 3, title: "Cognitive Behavioral Therapy Workbook", type: "PDF", link: "#" },
  { id: 4, title: "Stress Management Techniques", type: "Audio", link: "#" },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Self-Help Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}

