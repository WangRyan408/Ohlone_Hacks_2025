import { ResourceCard } from "@/components/resource-card"

const resources = [
  { id: 1, title: "Understanding Anxiety", type: "Article", link: "https://newsinhealth.nih.gov/2016/03/understanding-anxiety-disorders" },
  { id: 2, title: "Mindfulness Meditation Guide", type: "Video", link: "https://www.youtube.com/watch?v=qun9Hyj0hvA" },
  { id: 3, title: "Cognitive Behavioral Therapy Workbook", type: "PDF", link: "https://sa1s3.patientpop.com/assets/docs/55933.pdf" },
  { id: 4, title: "Stress Management Techniques", type: "Audio", link: "https://www.excelatlife.com/downloads/cognitive_self-talk/stress.htm" },
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

