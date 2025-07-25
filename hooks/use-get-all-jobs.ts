import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export function useGetAllJobs() {
  useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => {
      const response = await axiosInstance('/jobs');
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
