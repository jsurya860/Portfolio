import { useState } from 'react';
import { Lock, Mail, Loader, X, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const { isDark, toggle } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (error) {
        setError(error.message);
      } else {
        setResetMessage('Check your email for the password reset link');
      }
    } catch {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
        } else {
          setError('Check your email to confirm your account');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
        } else {
          onLoginSuccess();
        }
      }
    } catch {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-center px-6 relative">
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-6 right-6 p-2 bg-[rgba(240,253,244,0.5)] dark:bg-[rgba(19,28,46,0.5)] hover:bg-[#F1F5F9] dark:hover:bg-[#111827] text-[#475569] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] rounded-full transition-all duration-300 hover:rotate-90 z-50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)]"
        aria-label="Back to Home"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="fixed top-6 left-6 p-2 bg-[rgba(240,253,244,0.5)] dark:bg-[rgba(19,28,46,0.5)] hover:bg-[#F1F5F9] dark:hover:bg-[#111827] text-[#475569] dark:text-[#9CA3AF] hover:text-[#22c55e] dark:hover:text-emerald-400 rounded-full transition-all z-50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)]"
        title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md">
        <div className="bg-[#F1F5F9] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] rounded-lg p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-[#0F172A] dark:text-[#E5E7EB]">
            {isReset ? 'Reset Password' : 'Admin Access'}
          </h1>
          <p className="text-center text-[#475569] dark:text-[#9CA3AF] mb-8">
            {isReset
              ? 'Enter your email to receive a reset link'
              : (isSignUp ? 'Create your admin account' : 'Sign in to manage content')
            }
          </p>

          {(error || resetMessage) && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${error
              ? 'bg-red-900/30 border border-red-500 text-red-200'
              : 'bg-green-900/30 border border-green-500 text-green-200'
              }`}>
              {error || resetMessage}
            </div>
          )}

          <form onSubmit={isReset ? handleResetPassword : handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#475569] dark:text-[#D1D5DB] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#6B7280] dark:text-[#6B7280]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] rounded-lg text-[#0F172A] dark:text-[#E5E7EB] focus:outline-none focus:border-green-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {!isReset && (
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-[#D1D5DB] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[#6B7280] dark:text-[#6B7280]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] rounded-lg text-[#0F172A] dark:text-[#E5E7EB] focus:outline-none focus:border-green-500"
                    placeholder="*******"
                  />
                </div>
                {!isSignUp && (
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsReset(true);
                        setError('');
                        setResetMessage('');
                      }}
                      className="text-xs text-green-400 hover:text-green-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {isReset ? 'Sending Link...' : (isSignUp ? 'Creating account...' : 'Signing in...')}
                </>
              ) : (
                isReset ? 'Send Reset Link' : (isSignUp ? 'Create Account' : 'Sign In')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {isReset ? (
              <button
                type="button"
                onClick={() => {
                  setIsReset(false);
                  setError('');
                  setResetMessage('');
                }}
                className="text-[#9CA3AF] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] text-sm"
              >
                Back to Login
              </button>
            ) : (
              <p className="text-[#475569] dark:text-[#9CA3AF] text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="ml-1 text-green-400 hover:text-green-300 font-semibold"
                >
                  {isSignUp ? 'Sign in' : 'Create one'}
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-[#374151] dark:text-[#6B7280] text-sm">
          <p>This area is for authorized users only.</p>
          <p>Only registered admin users can access this panel.</p>
        </div>
      </div>
    </div>
  );
}
