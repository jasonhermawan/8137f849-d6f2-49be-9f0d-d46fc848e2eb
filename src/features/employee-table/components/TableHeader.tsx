import React from 'react';
import { Flex, Table as MantineTable, Text } from '@mantine/core';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface ITableHeaderProps {
  handlePagination: (sortBy: string, sortOrder: string) => void;
  currentSortBy: string;
  currentSortOrder: string;
  title: string;
  value: string;
}

const TableHeader: React.FC<ITableHeaderProps> = ({
  handlePagination,
  currentSortBy,
  currentSortOrder,
  title,
  value,
}) => {
  return (
    <MantineTable.Th
      style={{ cursor: 'pointer' }}
      onClick={() =>
        handlePagination(
          value,
          currentSortBy === value && currentSortOrder === 'asc'
            ? 'desc'
            : 'asc',
        )
      }
    >
      <Flex gap='20px'>
        <Text fw='600' size='15px'>
          {title}
        </Text>
        {currentSortBy === value && currentSortOrder === 'asc' ? (
          <FaArrowUp color='gray' />
        ) : currentSortBy === value && currentSortOrder === 'desc' ? (
          <FaArrowDown color='gray' />
        ) : (
          ''
        )}
      </Flex>
    </MantineTable.Th>
  );
};

export default TableHeader;
