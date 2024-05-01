'use client';
import React, { useState } from 'react';
import { Table as MantineTable } from '@mantine/core';
import { useDeleteEmployeeMutation } from '../api/useDeleteEmployeeMutation';
import CreateEmployeeFormRow from './CreateEmployeeFormRow';
import { useUpdateEmployeeMutation } from '../api/useUpdateEmployeeMutation';
import { Formik } from 'formik';
import { useCreateEmployeeMutation } from '../api/useCreateEmployeeMutation';
import { CreateEmployeeSchema } from '../schemas/CreateEmployeeSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { IEmployee } from '../types';

interface IEmployeeTableProps {
  employees: IEmployee[];
  type?: 'create' | '';
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setTableType: React.Dispatch<React.SetStateAction<'' | 'create'>>;
}

const Table: React.FC<IEmployeeTableProps> = ({
  employees,
  type,
  reset,
  setReset,
  setTableType,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const currentTake = searchParams.get('take') || '5';
  const currentSortBy = searchParams.get('sortBy') || '';
  const currentSortOrder = searchParams.get('sortOrder') || '';

  const [editEmployeeId, setEditEmployeeId] = useState<string>('1');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { mutate: deleteEmployee } = useDeleteEmployeeMutation();
  const { mutate: updateEmployee } = useUpdateEmployeeMutation(editEmployeeId);
  const { mutate: createEmployee } = useCreateEmployeeMutation();

  const onUpdateEmployee = async () => {
    const payload = {
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(position ? { position } : {}),
      ...(phone ? { phone } : {}),
      ...(email ? { email } : {}),
    };
    updateEmployee(payload);
  };

  const onCancelUpdateEmployee = () => {
    setFirstName('');
    setLastName('');
    setPosition('');
    setPhone('');
    setEmail('');
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    email: '',
  };

  const handlePagination = (sortBy: string, sortOrder: string) => {
    router.push(
      `?page=${currentPage}&take=${currentTake}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
  };

  return (
    <MantineTable verticalSpacing='lg'>
      <MantineTable.Thead>
        <MantineTable.Tr>
          <TableHeader
            handlePagination={handlePagination}
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            title='First Name'
            value='firstName'
          />
          <TableHeader
            handlePagination={handlePagination}
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            title='Last Name'
            value='lastName'
          />
          <TableHeader
            handlePagination={handlePagination}
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            title='Position'
            value='position'
          />
          <MantineTable.Th>Phone</MantineTable.Th>
          <TableHeader
            handlePagination={handlePagination}
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            title='Email'
            value='email'
          />
          <MantineTable.Th>Action</MantineTable.Th>
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>
        {type === 'create' && !reset ? (
          <Formik
            initialValues={initialValues}
            validationSchema={CreateEmployeeSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createEmployee({ ...values });
              resetForm();
              setSubmitting(false);
              setReset(true);
              setTableType('');
            }}
          >
            <CreateEmployeeFormRow />
          </Formik>
        ) : (
          <></>
        )}
        <TableRow
          employees={employees}
          editEmployeeId={editEmployeeId}
          setEditEmployeeId={setEditEmployeeId}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPosition={setPosition}
          setPhone={setPhone}
          setEmail={setEmail}
          type={type}
          onUpdateEmployee={onUpdateEmployee}
          onCancelUpdateEmployee={onCancelUpdateEmployee}
          deleteEmployee={deleteEmployee}
        />
      </MantineTable.Tbody>
    </MantineTable>
  );
};

export default Table;
