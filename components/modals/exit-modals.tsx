'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useExitModal } from '@/store/use-exit-modal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../ui/button';

const ExitModals = () => {
  const router = useRouter();
  const { isOpen, open, close } = useExitModal();
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
    return () => {};
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image
              src='/mascot_sad.svg'
              alt='Sad Mascot'
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              variant='primary'
              className='w-full'
              onClick={close}
              size='lg'
            >
              Keep Learning
            </Button>
            <Button
              variant='dangerOutline'
              className='w-full'
              onClick={() => {
                close();
                router.push('/learn');
              }}
              size='lg'
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModals;
