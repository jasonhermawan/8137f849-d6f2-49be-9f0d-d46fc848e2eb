import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { IEmployee, IUpdateEmployee } from '../types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useUpdateEmployeeMutation = (
  id: string,
  options?: UseMutationOptions<IEmployee, AxiosError<any>, IUpdateEmployee>,
) => {
  return useMutation({
    mutationFn: async (payload: IUpdateEmployee): Promise<IEmployee> => {
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee/${id}`,
        payload,
      );
    },
    ...options,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e: AxiosError<any>) => {
      toast.error(`Employee update error, ${e.response?.data?.message}`);
    },
  });
};
