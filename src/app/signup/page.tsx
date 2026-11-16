'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [password, setPassword] = useState('');

  const passwordRules = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    minLength: password.length >= 6,
  };
  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    // Password validation
    const hasUppercase = /[A-Z]/.test(user.password);
    const hasLowercase = /[a-z]/.test(user.password);
    const hasMinLength = user.password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      toast.error('Please meet all password requirements.');
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success(
        'Account registered successfully! Welcome to Better Together!',
      );
      redirect('/');
    }
  };

  return (
    <div className={'flex flex-col gap-6 max-w-7xl mx-auto my-8'}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join the community and start driving social change</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>            

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Image Url</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter your image url"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="space-y-1 text-xs">
                  <p
                    className={
                      passwordRules.uppercase
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }
                  >
                    ✓ At least one uppercase letter (A-Z)
                  </p>

                  <p
                    className={
                      passwordRules.lowercase
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }
                  >
                    ✓ At least one lowercase letter (a-z)
                  </p>

                  <p
                    className={
                      passwordRules.minLength
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }
                  >
                    ✓ Minimum 6 characters
                  </p>
                </div>
              </Field>

              <Field>
                <Button type="submit">Sign Up</Button>
                <FieldDescription className="text-center">
                  Have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
