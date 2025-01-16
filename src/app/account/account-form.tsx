'use client';

import { useCallback, useEffect, useState } from 'react';

import { type User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error(error);
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error: any) {
      alert(`Error updating the data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='m-4 w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Account Settings</h1>
          <p className='mt-2 text-gray-600'>Update your profile information</p>
        </div>

        <div className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                id='email'
                type='text'
                value={user?.email}
                disabled
                className='mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm'
              />
            </div>

            <div>
              <label
                htmlFor='fullName'
                className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <input
                id='fullName'
                type='text'
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <input
                id='username'
                type='text'
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='website'
                className='block text-sm font-medium text-gray-700'>
                Website
              </label>
              <input
                id='website'
                type='url'
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
          </div>

          <div className='space-y-4'>
            <button
              className='w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50'
              onClick={() =>
                updateProfile({ fullname, username, website, avatar_url })
              }
              disabled={loading}>
              {loading ? 'Loading ...' : 'Update Profile'}
            </button>

            <form action='/auth/signout' method='post'>
              <button
                type='submit'
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
