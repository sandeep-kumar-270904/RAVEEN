import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/Logo';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.register(name, email, password);
      setAuth(res.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-raven-bg-base p-4">
      <div className="mb-8">
        <Logo />
      </div>
      
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-raven-text-primary">Analyst Registration</h1>
          <p className="text-sm text-raven-text-secondary mt-1">Create your demonstration account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Full Name</label>
            <Input 
              type="text" 
              placeholder="e.g. Jane Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Email Address</label>
            <Input 
              type="email" 
              placeholder="analyst@soc.local" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Confirm Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded bg-raven-severity-critical/10 border border-raven-severity-critical/20 text-raven-severity-critical text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading} size="large">
            {isLoading ? 'Registering...' : 'Complete Registration'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-raven-text-tertiary">
          Already have an account? <Link to="/login" className="text-raven-accent hover:text-raven-accent-hover transition-colors">Sign In</Link>
        </div>
      </Card>
      
      <div className="mt-8 font-mono text-xs text-raven-text-tertiary text-center max-w-xs">
        <span className="text-raven-severity-medium">NOTICE:</span> UNCLASSIFIED DEMONSTRATION ENVIRONMENT. DO NOT ENTER REAL CREDENTIALS.
      </div>
    </div>
  );
}
