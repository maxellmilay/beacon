'use client'

import { handleSignIn } from '@/db/auth';
import { useUserContext } from '@/context/UserContext';

export default function Home() {
  const { user, setUser } = useUserContext();

  const handleLoginButtonClick = () => {
    handleSignIn(setUser);
  }

  return (
    <main>
      <button className="py-3 px-5 bg-gray-500" onClick={handleLoginButtonClick}>Login using Google</button>
      <p>NAME: {user.name}</p>
      <p>EMAIL: {user.email}</p>
    </main>
  );
}
