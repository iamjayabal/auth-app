import SignupForm from '@/components/forms/signup-form';

export default function SignupPage() {
  return (
    <>
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className=' w-[460px]'>
          <SignupForm />
        </div>
      </div>
    </>
  );
}
