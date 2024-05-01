import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IEmployee, IUpdateEmployee } from '../types';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useUpdateEmployeeMutation = (
  id: string,
  options?: UseMutationOptions<IEmployee, AxiosError<any>, IUpdateEmployee>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IUpdateEmployee): Promise<IEmployee> => {
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee/${id}`,
        payload,
      );
    },
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Employee successfuly updated`);
    },
    onError: (e: AxiosError<any>) => {
      toast.error(`Employee update error, ${e.response?.data?.message}`);
    },
  });
};
