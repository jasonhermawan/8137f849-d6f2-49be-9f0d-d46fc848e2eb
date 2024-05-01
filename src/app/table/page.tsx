import EmployeeTable from '@/features/employee-table';
import { Center } from '@mantine/core';
import React from 'react';

const TablePage = () => {
  return (
    <Center maw='100vw' h='100vh'>
      <EmployeeTable />
    </Center>
  );
};

export default TablePage;
