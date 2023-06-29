'use client'
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';
import Select from '../inputs/Select';
import Button from '../Button';

const GroupChatModal = ({
  isOpen,
  users,
  onClose
}: {
  isOpen?: boolean,
  users: User[],
  onClose: () => void
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: {
      errors
    },
    setValue,
    watch
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      users: []
    }
  })
  const members = watch('members')
  const submit: SubmitHandler<FieldValues> = (data) => {
    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    }).then(() => {
      router.refresh()
      onClose()
    }).catch(() => {
      toast.error('创建失败')
    })
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(submit)}>
        <div className='space-y-12 '>
          <div className='border-b border-gray-900 pb-12'>
            <h2>
              创建群聊
            </h2>
            <p className='
            text-base
            font-bold
            leading-7
            text-gray-900
          '>
            👦 > 2
            </p>
          </div>

          <div className='
            flex
            mt-10
            flex-col
            gap-y-8
          '>
            <Input
              disabled={isLoading}
              label='群聊名称'
              id='name'
              errors={errors}
              required
              register={register}
            />
            <Select
              disabled={isLoading}
              label="成员"
              options={users.map((user) => ({
                value: user.id,
                label: user.name
              }))}
              onChange={(value) => setValue('members', value, {
                shouldValidate: true
              })}
              value={members}
            />
          </div>
        </div>
        <div className='flex items-center justify-end gap-x-6'>
          <Button
            disabled={isLoading}
            onClick={onClose}
            type='button'
            secondary
          >
            取消
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
          >
            创建
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;