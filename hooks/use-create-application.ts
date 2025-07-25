import axiosInstance from '@/lib/axios';
import { Application } from '@/types/application-type';
import { useMutation } from '@tanstack/react-query';

export function useCrateApplication() {
  return useMutation({
    mutationFn: async (applicationData: Application) => {
      const response = await axiosInstance.post(
        '/applications',
        applicationData
      );
      return response.data;
    },
  });
}
