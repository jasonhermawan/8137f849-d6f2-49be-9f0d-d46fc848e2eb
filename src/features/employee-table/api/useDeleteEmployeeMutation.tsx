import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IEmployee } from '../types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useDeleteEmployeeMutation = (
  options?: UseMutationOptions<IEmployee, AxiosError<any>, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<IEmployee> => {
      return await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee/${id}`,
      );
    },
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Employee successfuly deleted`);
    },
    onError: (e: AxiosError<any>) => {
      toast.error(`Employee deletion error, ${e.response?.data?.message}`);
    },
  });
};
