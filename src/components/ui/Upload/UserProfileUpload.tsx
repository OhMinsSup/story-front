import React, { useRef } from 'react';
import { Button, Avatar } from '@mantine/core';
import { generateAvatar, getTargetElement } from '@utils/utils';
import { isEmpty } from '@utils/assertion';

export type UserProfileProps = {
  loading?: boolean;
  defaultThumbnail?: boolean;
  thumbnail?: string;
  avatarkey?: string;
  onUpload?: (...args: any[]) => void;
  onRemove?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;
  disabledActions?: boolean;
  accept?: string[];
};

const UserProfile: React.FC<UserProfileProps> = ({
  thumbnail,
  avatarkey,
  onUpload,
  onError,
  onRemove,
  disabledActions,
  loading = false,
  accept = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'],
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const url = thumbnail
    ? thumbnail
    : avatarkey
    ? `data:image/svg+xml;utf8,${encodeURIComponent(generateAvatar(avatarkey))}`
    : null;

  const fileReader = (file: File | Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataURL = e.target?.result as string;
        if (!dataURL) reject('dataURL is null');
        resolve(dataURL);
      };
      reader.readAsDataURL(file);
    });
  };

  const onUploadStart = () => {
    try {
      const ele = getTargetElement(inputRef);
      if (!ele) {
        throw new Error('No target element');
      }
      if (ele instanceof HTMLInputElement) {
        if (ele.value) ele.value = '';
      }

      inputRef.current?.click();
    } catch (error) {
      onError?.(error);
    }
  };

  const onUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || isEmpty(files)) {
        throw new Error('No file');
      }
      const file = files[0];
      if (!file) {
        throw new Error('No file');
      }

      const dataURL = await fileReader(file);
      onUpload?.(file, dataURL);
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <div className="my-6">
      <div className="flex justify-center">
        <Avatar className="w-24 h-24" radius="xl" src={url} />
      </div>
      {!disabledActions && (
        <div className="space-y-2 self-center mt-5">
          <Button
            type="button"
            color="primary"
            fullWidth
            variant="outline"
            loading={loading}
            onClick={onUploadStart}
          >
            이미지 업로드
          </Button>
          <Button
            type="button"
            color="primary"
            fullWidth
            variant="default"
            disabled={loading || !thumbnail}
            onClick={onRemove}
          >
            이미지 제거
          </Button>
        </div>
      )}
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept.join(',')}
        onChange={onUploadChange}
      />
    </div>
  );
};

export default UserProfile;
