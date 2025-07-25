'use client';

import { useGetAllJobs } from '@/hooks/use-get-all-jobs';
import JobCard from './job-card';

export default function ShowAllJobs() {
  const { data: jobs, isLoading, isError } = useGetAllJobs();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🧰 Available Jobs</h1>

      {isLoading && <p>Loading jobs...</p>}

      {isError && <p className="text-red-500">Failed to load jobs.</p>}

      {!isLoading && !isError && jobs?.length === 0 && (
        <p className="text-muted-foreground">No jobs found at the moment.</p>
      )}

      {!isLoading && jobs && jobs.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}
