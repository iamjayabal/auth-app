import LoginForm from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <>
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className=' w-[460px]'>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
