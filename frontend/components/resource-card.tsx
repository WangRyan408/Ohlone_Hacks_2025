import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, FileAudio, FileIcon } from "lucide-react"

interface Resource {
  id: number
  title: string
  type: string
  link: string
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "article":
        return <FileText className="w-6 h-6" />
      case "video":
        return <Video className="w-6 h-6" />
      case "audio":
        return <FileAudio className="w-6 h-6" />
      default:
        return <FileIcon className="w-6 h-6" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        {getIcon(resource.type)}
        <div>
          <CardTitle>{resource.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{resource.type}</p>
        </div>
      </CardHeader>
      <CardContent>
        <a href="https://newsinhealth.nih.gov/2016/03/understanding-anxiety-disorders" className="text-primary hover:underline">
          Access Resource
        </a>
      </CardContent>
    </Card>
  )
}

