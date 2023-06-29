'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import AuthSocialButton from './AuthSocialButton';
type Variant = 'LOGIN' | 'REGISTER'
const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoaing, setIsLoading] = useState(false)

  useEffect(()=>{
    if(session.status === 'authenticated'){
      // console.log(session)
      router.push('/users')
    }
  }, [session.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then((callback) => {

          if (callback?.error) {
            toast.error('密码或邮箱有误')
          }
          if (callback?.ok && !callback.error)
            toast.success('登陆成功')
            router.push('/users')
        })
        .finally(() => setIsLoading(false))

    } else if (variant === 'REGISTER') {
      axios
        .post('api/register', data)
        .then(() =>{ 
          toast.success('注册成功')
          setVariant('LOGIN')
        })
        .catch(() => toast.error('请输入完整信息'))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('登录失败')
        }
        if (callback?.ok && !callback.error)
          toast.success('登陆成功')
      })
      .finally(() => setIsLoading(false))
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
            onClick={() => socialAction('github')}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction('google')}
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
            {variant === 'LOGIN' ? '注册' : '登录'}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;