import Image from "next/image";
import AuthForm from "./component/AuthForm";


export default function Home() {
  return (

    <div
      className=" 
      flex 
      min-h-full 
      flex-col 
      justify-center 
      py-12 
      sm:px-6 
      lg:px-8 
     bg-gray-100
    "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height={'48'}
          width={'48'}
          src='/images/logo.png'
          className="mx-auto w-auto"
        />
      </div>
      <h2
        className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
      >
        登录你的账号
      </h2>
      <AuthForm/>
    </div>
  )
}
