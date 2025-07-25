import { Job } from '@/types/job-type';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-sm text-muted-foreground">{job.company}</p>
        <p className="text-sm">{job.location}</p>
        <Link
          href={`/jobs/${job._id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
}
