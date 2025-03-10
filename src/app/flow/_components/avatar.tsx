'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Upload, User, X } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';

interface AvatarUploadProps {
  onUpload: (file: File) => void;
  onDelete?: () => void;
  url?: string | null;
  size?: number;
}

export function AvatarUpload({
  onUpload,
  onDelete,
  url = null,
  size = 128,
}: AvatarUploadProps) {
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

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      setAvatarUrl(URL.createObjectURL(file)); // Show preview immediately
      onUpload(file);
    } catch (error: unknown) {
      alert(`Error selecting image: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering the file input
    setAvatarUrl(null);
    if (onDelete) onDelete();
  };

  return (
    <div className='relative'>
      <label
        htmlFor='avatar-upload'
        className='group relative block cursor-pointer'>
        {avatarUrl ? (
          <>
            <Image
              width={size}
              height={size}
              src={avatarUrl}
              alt='Avatar'
              className='rounded-full object-cover shadow-lg transition-opacity group-hover:opacity-75'
              style={{ height: size, width: size }}
            />
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className='absolute -right-1 -top-1 z-10 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black group-hover:opacity-100'
              aria-label='Remove avatar'>
              <X className='size-4' />
            </button>
          </>
        ) : (
          <div
            className='flex items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors group-hover:bg-gray-200'
            style={{ height: size, width: size }}>
            <User className='size-16' />
          </div>
        )}

        {/* Upload Overlay */}
        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100'>
          {uploading ? (
            <svg
              className='size-8 animate-spin'
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
          ) : (
            <Upload className='size-8' />
          )}
        </div>
      </label>

      <input
        className='hidden'
        type='file'
        id='avatar-upload'
        accept='image/*'
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  );
}
