'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import React, { useCallback, useState } from 'react';
import { FieldValue, FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle} from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoaing, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      emial: '',
      name: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === 'LOGIN') {

    } else if (variant === 'REGISTER') {

    }
  }
  const socialAction = (action: string) => {
    setIsLoading(true)
  }
  return (
    <div
      className='
        mt-8
        sm:max-w-md
        sm:w-full
        sm:mx-auto
      '
    >
      <div
        className='
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        '
      >
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && <Input
            id='name'
            label='name'
            register={register}
            errors={errors}
            disabled={isLoaing}
          />}

          <Input
            id='email'
            label='邮箱'
            type='email'
            register={register}
            errors={errors}
            disabled={isLoaing}
          />
          <Input
            id='password'
            label='密码'
            type='password'
            register={register}
            errors={errors}
            disabled={isLoaing}
          />
          <Button
            disabled={isLoaing}
            fullWidth
            type='submit'
          >
            {variant === 'LOGIN' ? '登录' : '注册'}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 mt-6'>
          <AuthSocialButton
            icon={BsGithub}
            onClick={()=>socialAction('github')}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={()=>socialAction('google')}
          />
        </div>

        <div className='
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
        '>
          <div>
            {variant === 'LOGIN' ? '没有账号？' : '已有账号？'}
          </div>
          <div
            onClick={toggleVariant}
            className='underline cursor-pointer'
          >
            {variant === 'LOGIN' ? '注册' : '登录' }
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;