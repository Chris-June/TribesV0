import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTribes } from '@/contexts/TribesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  TRIBE_CATEGORIES, 
  PRIVACY_OPTIONS, 
  MEMBER_APPROVAL_OPTIONS,
  COMMON_FEATURES 
} from '@/config/tribeConfig';
import { validateTribeName, TRIBE_NAME_ERROR_MESSAGES } from '@/utils/nameValidation';
import { formatTribeName } from '@/utils/tribeUtils';
import TemplateSelector from './templates/TemplateSelector';
import { TribeTemplate } from './templates/TribeTemplates';

const formSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .refine((name) => {
      const validation = validateTribeName(name);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
      return true;
    }, {
      message: TRIBE_NAME_ERROR_MESSAGES.INVALID_CHARACTERS
    }),
  description: z.string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(500, { message: 'Description must not exceed 500 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  privacy: z.enum(['public', 'private']),
  memberApproval: z.enum(['automatic', 'manual']),
  features: z.array(z.string()).optional(),
  rules: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

interface CreateTribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateTribeDialog({
  open,
  onOpenChange,
}: CreateTribeDialogProps) {
  const navigate = useNavigate();
  const { createTribe } = useTribes();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<TribeTemplate | null>(null);
  const [activeTab, setActiveTab] = useState('template');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      privacy: 'public',
      memberApproval: 'automatic',
      features: [],
      rules: [],
      tags: [],
    },
  });

  useEffect(() => {
    if (selectedTemplate) {
      const template = selectedTemplate.template;
      form.reset({
        ...form.getValues(),
        category: selectedTemplate.category,
        privacy: template.privacy || 'public',
        memberApproval: template.memberApproval || 'automatic',
        features: selectedTemplate.features,
        rules: selectedTemplate.rules,
        tags: selectedTemplate.tags,
      });
    }
  }, [selectedTemplate, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to create a tribe.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const formattedName = formatTribeName(values.name);
      const tribeData = {
        ...values,
        name: formattedName,
        owner: {
          id: user.id,
          name: user.displayName || user.email || 'Anonymous',
          role: 'Owner',
          avatar: user.photoURL || undefined,
        },
        members: [{
          id: user.id,
          name: user.displayName || user.email || 'Anonymous',
          role: 'Owner',
          avatar: user.photoURL || undefined,
          level: 'founder',
          joinedAt: new Date().toISOString(),
          contributions: 0,
          achievements: ['Tribe Founder']
        }],
        stats: {
          growth: 0,
          activeMembers: 1,
          postsPerWeek: 0,
          engagementRate: 0
        },
        engagement: {
          totalPosts: 0,
          totalEvents: 0,
          totalPolls: 0,
          weeklyGrowth: 0,
          recentMilestones: []
        }
      };

      const newTribe = await createTribe(tribeData);
      if (newTribe) {
        onOpenChange(false);
        navigate(`/app/tribes/${newTribe.id}`);
      }
      toast({
        title: 'Success!',
        description: 'Your tribe has been created.',
      });
    } catch (error) {
      console.error('Error creating tribe:', error);
      toast({
        title: 'Error',
        description: 'Failed to create tribe. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a New Tribe</DialogTitle>
          <DialogDescription>
            Create a tribe to build your community and connect with others.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="details">Tribe Details</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="mt-4">
            <TemplateSelector
              selectedTemplate={selectedTemplate?.id || ''}
              onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                setActiveTab('details');
              }}
            />
          </TabsContent>

          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tribe name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your tribe's display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your tribe"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your tribe's purpose and goals.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TRIBE_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Privacy</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select privacy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PRIVACY_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="memberApproval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Approval</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select approval type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEMBER_APPROVAL_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose how new members are approved.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Create Tribe</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}