import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Users,
  Shield,
  MessageSquare,
  Bell,
  Flag,
  Filter,
  Bot,
} from 'lucide-react';

const tribeSettingsSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  category: z.string(),
  privacy: z.enum(['public', 'private']),
  memberApproval: z.enum(['automatic', 'manual']),
  contentModeration: z.enum(['ai', 'manual', 'both']),
  features: z.object({
    challenges: z.boolean(),
    events: z.boolean(),
    aiAssistant: z.boolean(),
    polls: z.boolean(),
  }),
  notifications: z.object({
    newMembers: z.boolean(),
    newPosts: z.boolean(),
    events: z.boolean(),
    challenges: z.boolean(),
  }),
  moderation: z.object({
    profanityFilter: z.boolean(),
    linkRestriction: z.boolean(),
    imageModeration: z.boolean(),
    spamProtection: z.boolean(),
  }),
});

type TribeSettingsFormValues = z.infer<typeof tribeSettingsSchema>;

interface TribeSettingsProps {
  tribe: {
    id: string;
    name: string;
    description: string;
    category: string;
    privacy: 'public' | 'private';
    memberApproval: 'automatic' | 'manual';
  };
}

export default function TribeSettings({ tribe }: TribeSettingsProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TribeSettingsFormValues>({
    resolver: zodResolver(tribeSettingsSchema),
    defaultValues: {
      name: tribe.name,
      description: tribe.description,
      category: tribe.category,
      privacy: tribe.privacy,
      memberApproval: tribe.memberApproval,
      contentModeration: 'both',
      features: {
        challenges: true,
        events: true,
        aiAssistant: true,
        polls: true,
      },
      notifications: {
        newMembers: true,
        newPosts: true,
        events: true,
        challenges: true,
      },
      moderation: {
        profanityFilter: true,
        linkRestriction: false,
        imageModeration: true,
        spamProtection: true,
      },
    },
  });

  const onSubmit = async (data: TribeSettingsFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to update tribe settings
      console.log('Updating tribe settings:', data);
      toast({
        title: 'Settings Updated',
        description: 'Your tribe settings have been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update tribe settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
              <CardDescription>
                Configure the fundamental settings for your tribe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tribe Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Privacy & Access */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Access</CardTitle>
              <CardDescription>
                Control who can join and view your tribe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                          <SelectValue placeholder="Select privacy level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Public tribes are visible to everyone, private tribes require
                      an invitation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          <SelectValue placeholder="Select approval process" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual Approval</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how new members are approved to join your tribe.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Enable or disable specific features for your tribe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="features.challenges"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Challenges</FormLabel>
                        <FormDescription>
                          Allow members to participate in tribe challenges
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features.events"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Events</FormLabel>
                        <FormDescription>
                          Enable event creation and management
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features.aiAssistant"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">AI Assistant</FormLabel>
                        <FormDescription>
                          Enable AI-powered features and assistance
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Moderation */}
          <Card>
            <CardHeader>
              <CardTitle>Moderation</CardTitle>
              <CardDescription>
                Configure content moderation settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contentModeration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moderation Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select moderation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ai">AI Only</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                        <SelectItem value="both">AI + Manual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how content is moderated in your tribe.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="moderation.profanityFilter"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Profanity Filter
                        </FormLabel>
                        <FormDescription>
                          Automatically filter inappropriate language
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moderation.imageModeration"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Image Moderation
                        </FormLabel>
                        <FormDescription>
                          AI-powered image content screening
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moderation.spamProtection"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Spam Protection
                        </FormLabel>
                        <FormDescription>
                          Prevent spam and automated posts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
