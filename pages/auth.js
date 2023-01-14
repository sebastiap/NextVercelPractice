import { useRouter } from 'next/router';
// import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

// import AuthForm from '../src/components/auth/auth-form';
import AuthForm from '../src/components/auth/auth';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

//   useEffect(() => {
//     getSession().then((session) => {
//       if (session) {
//         router.replace('/');
//       } else {
//         setIsLoading(false);
//       }
//     });
//   }, [router]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

  return <AuthForm />;
}

export default AuthPage;