'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { createClient } from '@/utils/supabase/client';

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(`Error uploading avatar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt='Avatar'
          className='rounded-full object-cover shadow-lg'
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className='flex items-center justify-center rounded-full bg-purple-100 text-purple-600'
          style={{ height: size, width: size }}>
          <svg className='size-24' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4 0-2.208 1.79-4 3.998-4 2.208 0 3.998 1.792 3.998 4z' />
          </svg>
        </div>
      )}
      <div className='w-full'>
        <label
          className='flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-colors focus-within:border-purple-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 hover:border-purple-400 hover:bg-purple-50'
          htmlFor='single'>
          {uploading ? (
            <div className='flex items-center space-x-2'>
              <svg
                className='size-5 animate-spin'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
              <span>Uploading...</span>
            </div>
          ) : (
            <div className='flex items-center space-x-2'>
              <svg
                className='size-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                />
              </svg>
              <span>Upload new image</span>
            </div>
          )}
        </label>
        <input
          className='hidden'
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
