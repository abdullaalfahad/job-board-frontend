import axiosInstance from '@/lib/axios';
import { Job } from '@/types/jobs';
import { useQuery } from '@tanstack/react-query';

export function useGetAllJobs() {
  return useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => {
      const response = await axiosInstance.get<Job[]>('/jobs');
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
