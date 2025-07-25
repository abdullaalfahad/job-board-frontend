'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { User, Mail, FileText, Upload, Send, CheckCircle } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

import {
  applicationSchema,
  type ApplicationSchema,
} from '@/schemas/application-schema';
import { useCrateApplication } from '@/hooks/use-create-application';
import { toast } from 'sonner';
import BackToHome from './back-to-home';

export default function ApplyForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id: jobId } = useParams();

  const { mutate, isPending } = useCrateApplication();

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      cv: '',
    },
  });

  const watchedFields = form.watch();
  const filledFields = Object.values(watchedFields).filter(
    (value) => value && value.trim() !== ''
  ).length;
  const progress = (filledFields / 3) * 100;

  const onSubmit = async (data: ApplicationSchema) => {
    mutate(
      { ...data, jobId: jobId as string },
      {
        onSuccess: () => {
          form.reset();
          setIsSubmitted(true);
          toast('Application submitted successfully!', {
            description:
              "We'll review your application and get back to you soon.",
          });
        },
        onError: (error) => {
          console.error('Error submitting application:', error);
          toast('Submission failed', {
            description: 'Please try again later.',
          });
          setIsSubmitted(false);
        },
      }
    );
  };

  if (isSubmitted) {
    return <BackToHome />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Application Progress
              </span>
              <span className="font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Main form */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Submit Your Application</CardTitle>
          <CardDescription>
            Fill out the form below to apply for this position. All fields are
            required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-medium">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-medium">CV & Cover Letter</h3>
                </div>

                <FormField
                  control={form.control}
                  name="cv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CV / Cover Letter</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Textarea
                            placeholder="You can either:&#10;• Paste a link to your CV/resume&#10;• Write a brief cover letter&#10;• Include both"
                            className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Upload className="w-3 h-3" />
                            <span>
                              Tip: Include links to your portfolio, LinkedIn, or
                              GitHub
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isPending || progress < 100}
                  className="flex-1 sm:flex-none sm:min-w-[200px] h-11 transition-all duration-200"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p>
                  <strong>Privacy Notice:</strong> Your information will only be
                  used for this job application and will be handled according to
                  our privacy policy.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
