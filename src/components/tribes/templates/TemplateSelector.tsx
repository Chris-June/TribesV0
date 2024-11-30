import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TribeTemplate, tribeTemplates, getDefaultTemplate } from './TribeTemplates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: TribeTemplate) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const defaultTemplate = getDefaultTemplate();
  const allTemplates = [defaultTemplate, ...tribeTemplates];

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const Icon = template.icon;

          return (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
