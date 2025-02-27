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
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.data()?.role;

        dispatch(loginSuccess({ user: { uid: user.uid, email: user.email }, role }));

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

  const handleContinueAsViewer = () => {
    // Redirect to viewer-dashboard directly
    router.push('/viewer-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Continue as Viewer link */}
        <div className="text-center mt-4">
          <button
            onClick={handleContinueAsViewer}
            className="text-blue-500 hover:underline"
          >
            Continue as a Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
