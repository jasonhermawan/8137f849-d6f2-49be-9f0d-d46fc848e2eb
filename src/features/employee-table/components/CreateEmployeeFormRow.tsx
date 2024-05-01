'use client';
import React from 'react';
import { Box, Flex, Table as MantineTable, Tooltip } from '@mantine/core';
import { FaSave } from 'react-icons/fa';
import { FormInput } from '@/components/forms/FormInput';
import { ICreateEmployee } from '../types';
import { useFormikContext } from 'formik';

const CreateEmployeeFormRow = () => {
  const { values, handleSubmit } = useFormikContext<ICreateEmployee>();

  return (
    <MantineTable.Tr>
      <MantineTable.Td>
        <FormInput name='firstName' value={values.firstName} />
      </MantineTable.Td>
      <MantineTable.Td>
        <FormInput name='lastName' value={values.lastName} />
      </MantineTable.Td>
      <MantineTable.Td>
        <FormInput name='position' value={values.position} />
      </MantineTable.Td>
      <MantineTable.Td>
        <FormInput name='phone' value={values.phone} />
      </MantineTable.Td>
      <MantineTable.Td>
        <FormInput name='email' value={values.email} />
      </MantineTable.Td>
      <MantineTable.Td>
        <Flex justify='center'>
          <Tooltip label='Save'>
            <Box style={{ cursor: 'pointer' }}>
              <FaSave
                onClick={() => handleSubmit()}
                size='18px'
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </Tooltip>
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  );
};

export default CreateEmployeeFormRow;
