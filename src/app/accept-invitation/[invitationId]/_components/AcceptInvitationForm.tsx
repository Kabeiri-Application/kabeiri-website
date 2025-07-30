'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { acceptInvitation } from '../actions';

const acceptInvitationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AcceptInvitationFormData = z.infer<typeof acceptInvitationSchema>;

interface AcceptInvitationFormProps {
  invitation: {
    id: string;
    email: string;
    role: string;
    organizationId: string;
  };
  organizationName: string;
}

export function AcceptInvitationForm({ invitation, organizationName }: AcceptInvitationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationFormData>({
    resolver: zodResolver(acceptInvitationSchema),
  });

  const onSubmit = async (data: AcceptInvitationFormData) => {
    setIsLoading(true);

    try {
      const result = await acceptInvitation(invitation.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        email: invitation.email,
        role: invitation.role,
        organizationId: invitation.organizationId,
      });

      if (result.success) {
        toast.success('Account created successfully! Welcome to ' + organizationName);
        router.push('/dashboard');
      } else {
        toast.error(result.error || 'Failed to accept invitation');
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center dark:text-white">
          Create Your Account
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Complete your profile to join {organizationName}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="dark:text-white">First Name</Label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="dark:text-white">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="username" className="dark:text-white">Username</Label>
            <Input
              id="username"
              type="text"
              {...register('username')}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="dark:text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={invitation.email}
              disabled
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="password" className="dark:text-white">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="dark:text-white">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account & Join Organization'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
