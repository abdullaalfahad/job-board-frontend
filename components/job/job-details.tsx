'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Share2,
  Bookmark,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import JobDetailsSkeleton from './job-details-skeleton';
import { useGetJobDetails } from '@/hooks/use-get-job-details';
import { toast } from 'sonner';
import NotFound from './not-found';

export default function JobDetails() {
  const { id } = useParams();

  const { data: job, isLoading, isError } = useGetJobDetails(id as string);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job at ${job?.company}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast('Link copied!', {
        description: 'Job link has been copied to your clipboard.',
      });
    }
  };

  const handleBookmark = () => {
    toast('Job bookmarked!', {
      description: 'You can find this job in your saved jobs.',
    });
  };

  if (isLoading) return <JobDetailsSkeleton />;
  if (isError || !job) return <NotFound />;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/jobs" className="hover:text-foreground transition-colors">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-foreground">{job.title}</span>
      </nav>

      {/* Job Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-4">
              <div>
                <CardTitle className="text-2xl lg:text-3xl mb-2">
                  {job.title}
                </CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Job description */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-base">
                  {job.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Apply section */}
        <div className="space-y-6">
          {/* Apply card */}
          <Card className="sticky top-6 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Ready to Apply?</CardTitle>
              <CardDescription>
                Take the next step in your career with {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg">
                <Link href={`/apply/${job._id}`}>
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <div className="pt-4 border-t space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Job ID:</span>
                  <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                    {job._id.slice(-8)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
