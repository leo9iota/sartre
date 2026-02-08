import { createSignal } from 'solid-js';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { authClient } from '@/lib/auth/auth-client';

import { SocialButton } from '../social-button';
import * as styles from './sign-in.css';

export interface SignInProps {
  /** Callback when email/password sign in is submitted */
  onSubmit?: (email: string, password: string) => Promise<{ error?: string }>;
  /** Callback for social auth */
  onSocialAuth?: (provider: 'github' | 'google') => Promise<void>;
}

/**
 * Sign in form component.
 * Note: Auth logic should be passed via props for Astro compatibility.
 */
export const SignIn = (props: SignInProps) => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (props.onSubmit) {
      const result = await props.onSubmit(email(), password());
      setLoading(false);
      if (result.error) {
        setError(result.error);
      }
    } else {
      const { error: authError } = await authClient.signIn.email({
        email: email(),
        password: password(),
        callbackURL: '/'
      });

      if (authError) {
        setError(authError.message || 'An error occurred during sign in');
        setLoading(false);
      } else {
        // Redirect handled by callbackURL
      }
    }
  };

  const handleSocialAuth = async (provider: 'github' | 'google') => {
    if (props.onSocialAuth) {
      await props.onSocialAuth(provider);
    } else {
      await authClient.signIn.social({
        provider,
        callbackURL: '/'
      });
    }
  };

  return (
    <div class={styles.authContainer}>
      <div class={styles.authCard}>
        <h1 class={styles.authTitle}>Welcome back</h1>
        <p class={styles.authSubtitle}>Sign in to your account</p>

        <form class={styles.authForm} onSubmit={handleSubmit}>
          <div class={styles.formGroup}>
            <label class={styles.label} for='email'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='you@example.com'
              value={email()}
              onInput={e => setEmail(e.currentTarget.value)}
              required
            />
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label} for='password'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password()}
              onInput={e => setPassword(e.currentTarget.value)}
              required
            />
          </div>

          {error() && <p class={styles.errorText}>{error()}</p>}

          <Button type='submit' variant='solid' loading={loading()}>
            Sign In
          </Button>
        </form>

        <div class={styles.divider}>
          <span>or continue with</span>
        </div>

        <div class={styles.socialButtons}>
          <SocialButton provider='github' onAuth={handleSocialAuth} />
          <SocialButton provider='google' onAuth={handleSocialAuth} />
        </div>

        <div class={styles.footerText}>
          Don't have an account?{' '}
          <a href='/sign-up' class={styles.footerLink}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
