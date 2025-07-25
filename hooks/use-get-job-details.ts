import axiosInstance from '@/lib/axios';
import { Job } from '@/types/job-type';
import { useQuery } from '@tanstack/react-query';

export function useGetJobDetails(id: string) {
  return useQuery({
    queryKey: ['job-details', id],
    queryFn: async () => {
      const response = await axiosInstance.get<Job>(`/jobs/${id}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
