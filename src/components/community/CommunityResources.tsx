import { motion } from 'framer-motion';
import { FileText, Link, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'documentation' | 'template' | 'example';
  link: string;
  downloadable: boolean;
  tags: string[];
};

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    description: 'Everything you need to know to get started with IntelliSync.',
    type: 'guide',
    link: '/docs/getting-started',
    downloadable: true,
    tags: ['Beginner', 'Setup', 'Tutorial'],
  },
  {
    id: '2',
    title: 'API Documentation',
    description: 'Complete API reference for IntelliSync integration.',
    type: 'documentation',
    link: '/docs/api',
    downloadable: false,
    tags: ['API', 'Technical', 'Reference'],
  },
  {
    id: '3',
    title: 'Project Templates',
    description: 'Ready-to-use templates for common AI project types.',
    type: 'template',
    link: '/resources/templates',
    downloadable: true,
    tags: ['Templates', 'Projects', 'Examples'],
  },
];

export default function CommunityResources() {
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide':
        return FileText;
      case 'documentation':
        return FileText;
      case 'template':
        return Link;
      case 'example':
        return Link;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resources</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockResources.map((resource) => {
          const Icon = getResourceIcon(resource.type);
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-primary" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto space-x-2">
                    <Button variant="default" className="w-full">
                      {resource.downloadable ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
