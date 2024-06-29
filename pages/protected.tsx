import { useAuthSession } from '../hooks/useAuthSession';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading, signout } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Protected Page</h1>
      {user && <p>Welcome, {user.username}</p>}
      <button onClick={signout}>Logout</button>
    </div>
  );
}
