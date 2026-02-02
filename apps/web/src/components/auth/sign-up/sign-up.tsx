import { createMemo, createSignal, For, Show } from 'solid-js';

import { Check } from 'lucide-solid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress/progress';

import { authClient } from '@/lib/auth/auth-client';
import { checkPasswordStrength } from '@/lib/auth/password-validation';

import { SocialButton } from '../social-button';
import * as styles from './sign-up.css';

export interface SignUpProps {
  /** Callback when email/password sign up is submitted */
  onSubmit?: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  /** Callback for social auth */
  onSocialAuth?: (provider: 'github' | 'google') => Promise<void>;
}

/**
 * Sign up form component.
 * Note: Auth logic should be passed via props for Astro compatibility.
 */
export const SignUp = (props: SignUpProps) => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const passwordStrength = createMemo(() => checkPasswordStrength(password()));

  const isValid = createMemo(() => {
    return (
      name().length > 0 &&
      email().length > 0 &&
      passwordStrength().score >= 3 && // Require at least "Good" strength
      password() === confirmPassword()
    );
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setError('');

    if (!isValid()) {
      return;
    }

    setLoading(true);

    if (props.onSubmit) {
      const result = await props.onSubmit(name(), email(), password());
      setLoading(false);
      if (result.error) {
        setError(result.error);
      }
    } else {
      const { error: authError } = await authClient.signUp.email({
        email: email(),
        password: password(),
        name: name(),
        callbackURL: '/'
      });

      if (authError) {
        setError(authError.message || 'An error occurred during sign up');
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
        <h1 class={styles.authTitle}>Create account</h1>
        <p class={styles.authSubtitle}>Get started with Sartre</p>

        <form class={styles.authForm} onSubmit={handleSubmit}>
          <div class={styles.formGroup}>
            <label class={styles.label} for='username'>
              Username
            </label>
            <Input
              id='username'
              type='text'
              placeholder='Enter your username'
              value={name()}
              onInput={event => setName(event.currentTarget.value)}
              required
            />
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label} for='email'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email()}
              onInput={event => setEmail(event.currentTarget.value)}
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
              placeholder='Enter your password'
              value={password()}
              onInput={event => setPassword(event.currentTarget.value)}
              required
            />

            <Show when={password().length > 0}>
              <div class={styles.passwordRequirements}>
                <ProgressBar
                  value={(passwordStrength().score / 4) * 100}
                  color={passwordStrength().color}
                  size='sm'
                  label={passwordStrength().label}
                  showValue={false}
                />

                <For each={passwordStrength().requirements}>
                  {req => (
                    <div
                      class={
                        req.met
                          ? `${styles.passwordRequirement} ${styles.passwordRequirementMet}`
                          : styles.passwordRequirement
                      }
                    >
                      <div class={styles.requirementIcon}>
                        <Show
                          when={req.met}
                          fallback={
                            <div
                              style={{
                                width: '12px',
                                height: '12px',
                                'border-radius': '50%',
                                border: '1px solid currentColor'
                              }}
                            />
                          }
                        >
                          <Check />
                        </Show>
                      </div>
                      <span>{req.label}</span>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label} for='confirm-password'>
              Confirm Password
            </label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword()}
              onInput={event => setConfirmPassword(event.currentTarget.value)}
              required
            />
            <Show when={confirmPassword().length > 0 && password() !== confirmPassword()}>
              <p class={styles.errorText} style={{ 'font-size': '0.75rem' }}>
                Passwords do not match
              </p>
            </Show>
          </div>

          {error() && <p class={styles.errorText}>{error()}</p>}

          <Button type='submit' variant='solid' loading={loading()} disabled={!isValid()}>
            Create Account
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
          Already have an account?{' '}
          <a href='/sign-in' class={styles.footerLink}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};
