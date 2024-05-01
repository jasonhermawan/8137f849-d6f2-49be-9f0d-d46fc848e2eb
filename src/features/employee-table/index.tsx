'use client';
import { Box, Button, Flex, Pagination, Select } from '@mantine/core';
import React, { useState } from 'react';
import Table from './components/Table';
import { useGetEmployeesQuery } from './api/useGetEmployeesQuery';
import { useRouter, useSearchParams } from 'next/navigation';

const EmployeeTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const currentTake = searchParams.get('take') || '5';
  const currentSortBy = searchParams.get('sortBy') || '';
  const currentSortOrder = searchParams.get('sortOrder') || '';
  const [tableType, setTableType] = useState<'create' | ''>('');
  const { data: employees } = useGetEmployeesQuery({
    page: currentPage,
    ITEM_PER_PAGE: currentTake,
    ...(currentSortBy ? { sortBy: currentSortBy } : {}),
    ...(currentSortOrder ? { sortOrder: currentSortOrder } : {}),
  });

  const handlePagination = (page: string, take: string | null) => {
    if (take !== null) {
      router.push(`?page=${page}&take=${take}`);
    } else {
      router.push(`?page=${page}`);
    }
  };

  return (
    <Box w='80%'>
      <Flex justify='end' gap='10px' mb='20px'>
        {tableType === 'create' ? (
          <Button onClick={() => setTableType('')}>Cancel Creation</Button>
        ) : (
          <Flex gap='10px'>
            <Button onClick={() => setTableType('create')}>
              Create Employee
            </Button>
            <Button
              variant='light'
              onClick={() =>
                router.push(`?page=${currentPage}&take${currentTake}`)
              }
            >
              Reset Filter
            </Button>
          </Flex>
        )}
      </Flex>
      <Table employees={employees.data} type={tableType} />
      <Flex mt='20px' justify='space-between'>
        <Select
          defaultValue='5'
          data={[
            { value: '5', label: '5 / Page' },
            { value: '10', label: '10 / Page' },
            { value: '15', label: '15 / Page' },
          ]}
          onChange={(e) => handlePagination('1', e)}
        />
        <Pagination
          total={employees.totalPage || 1}
          onChange={(e) => handlePagination(e.toString(), currentTake)}
          value={Number(currentPage)}
        />
      </Flex>
    </Box>
  );
};

export default EmployeeTable;
