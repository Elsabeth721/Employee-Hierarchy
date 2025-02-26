'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch(); // Redux dispatch

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.data()?.role;

        // Dispatch to Redux store
        dispatch(loginSuccess({ user: { uid: user.uid, email: user.email }, role }));

        // Redirect based on role
        if (role === 'admin') {
          router.push('/dashboard');
        } else if (role === 'manager') {
          router.push('/manager-dashboard');
        } else {
          router.push('/viewer-dashboard');
        }
      } else {
        setError('Failed to retrieve user ID.');
      }

    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
