import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ICreateEmployee, IEmployee } from '../types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useCreateEmployeeMutation = (
  options?: UseMutationOptions<IEmployee, AxiosError<any>, ICreateEmployee>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ICreateEmployee): Promise<IEmployee> => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee`,
        payload,
      );
    },
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Employee successfuly created`);
    },
    onError: (e: AxiosError<any>) => {
      toast.error(`Employee creation error, ${e.response?.data?.message}`);
    },
  });
};
