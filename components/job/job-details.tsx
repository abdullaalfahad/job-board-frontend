'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import Link from 'next/link';
import { useGetJobDetails } from '@/hooks/use-get-job-details';

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
};

export default function JobDetails() {
  const { id } = useParams();

  const { data: job, isLoading, isError } = useGetJobDetails(id as string);

  if (isLoading) return <p>Loading job...</p>;
  if (isError || !job) return <p className="text-red-500">Job not found.</p>;

  return (
    <main className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground text-sm">
        {job.company} • {job.location}
      </p>
      <hr />
      <div className="text-base whitespace-pre-line">{job.description}</div>
      <div className="pt-6">
        <Link
          href={`/apply/${job._id}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Apply Now
        </Link>
      </div>
    </main>
  );
}
