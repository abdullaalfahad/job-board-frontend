import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Briefcase, Link } from 'lucide-react';
import { Button } from '../ui/button';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                Job Not Found
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                The job you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/jobs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
