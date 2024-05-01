'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Flex, Table as MantineTable, Text, Tooltip } from '@mantine/core';
import { Input } from '@/components/cores/Input';
import { FaX } from 'react-icons/fa6';
import { FaSave, FaTrash } from 'react-icons/fa';
import { IEmployee } from '../types';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

interface ITableRowProps {
  employees: IEmployee[];
  editEmployeeId: string;
  setEditEmployeeId: Dispatch<SetStateAction<string>>;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setPosition: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  type: 'create' | '' | undefined;
  onUpdateEmployee: () => Promise<void>;
  onCancelUpdateEmployee: () => void;
  deleteEmployee: UseMutateFunction<
    IEmployee,
    AxiosError<any, any>,
    string,
    unknown
  >;
}

const TableRow: React.FC<ITableRowProps> = ({
  employees,
  editEmployeeId,
  setEditEmployeeId,
  setFirstName,
  setLastName,
  setPosition,
  setPhone,
  setEmail,
  type,
  onUpdateEmployee,
  onCancelUpdateEmployee,
  deleteEmployee,
}) => {
  const searchParams = useSearchParams();
  const [emailError, setEmailError] = useState<string>('');
  const [reset, setReset] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setEmail(email);
      setEmailError('');
    } else {
      setEmail('');
      setEmailError('Invalid email format');
    }
  };

  useEffect(() => {
    setEditEmployeeId('');
  }, [searchParams]);

  return employees?.map((item: any, index: number) => {
    const isEditable = item.id === editEmployeeId;
    return (
      <MantineTable.Tr key={item.id} style={{ cursor: 'pointer' }}>
        <MantineTable.Td
          onClick={() => {
            setEditEmployeeId(item.id);
            setEmailError('');
            setReset(false);
          }}
        >
          {isEditable && type !== 'create' && !reset ? (
            <Input
              name='firstName'
              defaultValue={item.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <Text size='14px'>{item.firstName}</Text>
          )}
        </MantineTable.Td>
        <MantineTable.Td
          onClick={() => {
            setEditEmployeeId(item.id);
            setEmailError('');
          }}
        >
          {isEditable && type !== 'create' && !reset ? (
            <Input
              name='lastName'
              defaultValue={item.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <Text size='14px'>{item.lastName}</Text>
          )}
        </MantineTable.Td>
        <MantineTable.Td
          onClick={() => {
            setEditEmployeeId(item.id);
            setEmailError('');
          }}
        >
          {isEditable && type !== 'create' && !reset ? (
            <Input
              name='position'
              defaultValue={item.position}
              onChange={(e) => setPosition(e.target.value)}
            />
          ) : (
            <Text size='14px'>{item.position}</Text>
          )}
        </MantineTable.Td>
        <MantineTable.Td
          onClick={() => {
            setEditEmployeeId(item.id);
            setEmailError('');
          }}
        >
          {isEditable && type !== 'create' && !reset ? (
            <Input
              name='phone'
              defaultValue={item.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <Text size='14px'>{item.phone}</Text>
          )}
        </MantineTable.Td>
        <MantineTable.Td
          onClick={() => {
            setEditEmployeeId(item.id);
            setEmailError('');
          }}
        >
          {isEditable && type !== 'create' && !reset ? (
            <Input
              name='email'
              defaultValue={item.email}
              onChange={handleEmailChange}
              error={emailError}
            />
          ) : (
            <Text size='14px'>{item.email}</Text>
          )}
        </MantineTable.Td>
        <MantineTable.Td>
          {isEditable && type !== 'create' && !reset ? (
            <Flex gap='25px' justify='center'>
              {!emailError ? (
                <Tooltip label='Save'>
                  <Box
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setEditEmployeeId(item.id);
                      onUpdateEmployee();
                      setReset(true);
                    }}
                  >
                    <FaSave size='18px' style={{ cursor: 'pointer' }} />
                  </Box>
                </Tooltip>
              ) : (
                <Box style={{ cursor: 'not-allowed' }}>
                  <FaSave size='18px' style={{ cursor: 'not-allowed' }} />
                </Box>
              )}
              <Tooltip label='Cancel'>
                <Box
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setEditEmployeeId('');
                    onCancelUpdateEmployee();
                  }}
                >
                  <FaX size='18px' style={{ cursor: 'pointer' }} />
                </Box>
              </Tooltip>
            </Flex>
          ) : (
            <Flex justify='center'>
              <Tooltip label='Delete'>
                <Box
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteEmployee(item.id)}
                >
                  <FaTrash size='18px' />
                </Box>
              </Tooltip>
            </Flex>
          )}
        </MantineTable.Td>
      </MantineTable.Tr>
    );
  });
};

export default TableRow;
