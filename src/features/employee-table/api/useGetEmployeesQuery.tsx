import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { IGetEmployeesQuery } from '../types';
import axios from 'axios';

export const useGetEmployeesQuery = (
  queries?: IGetEmployeesQuery,
  options?: UseQueryOptions<unknown, unknown, any, unknown[]>,
) => {
  return useQuery({
    queryKey: ['employees', queries],
    queryFn: async () => {
      const employees = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}employee`,
        {
          params: queries,
        },
      );
      return {
        data: employees.data.data,
        length: employees.data.length,
        totalPage: employees.data.totalPage,
      };
    },
    initialData: [],
    ...options,
  });
};
