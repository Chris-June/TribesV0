import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TEST_CREDENTIALS, validateCredentials } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

interface SignInFormProps {
  onToggleView: () => void;
}

export default function SignInForm({ onToggleView }: SignInFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (validateCredentials(values.email, values.password)) {
        await signIn(values.email, values.password);
        toast({
          title: 'Success',
          description: 'You have successfully signed in.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Use demo@tribes.com / Demo123!',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    form.setValue('email', TEST_CREDENTIALS.email);
    form.setValue('password', TEST_CREDENTIALS.password);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="demo@tribes.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Demo123!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center space-y-2">
        <Button
          variant="link"
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={fillTestCredentials}
        >
          Use test credentials
        </Button>

        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button
            variant="link"
            className="text-primary hover:text-primary/90 p-0"
            onClick={onToggleView}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}