import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ICreateEmployee, IEmployee } from '../types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useCreateEmployeeMutation = (
  options?: UseMutationOptions<IEmployee, AxiosError<any>, ICreateEmployee>,
) => {
  return useMutation({
    mutationFn: async (payload: ICreateEmployee): Promise<IEmployee> => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee`,
        payload,
      );
    },
    ...options,
    onSuccess: () => {
      window.location.reload();
      toast.success(`Employee successfuly created`);
    },
    onError: (e: AxiosError<any>) => {
      toast.error(`Employee creation error, ${e.response?.data?.message}`);
    },
  });
};
