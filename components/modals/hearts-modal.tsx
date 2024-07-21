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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useHeartsModal } from '@/store/use-hearts-modal';

const HeartsModal = () => {
  const router = useRouter();
  const { isOpen, open, close } = useHeartsModal();
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
    return () => {};
  }, []);

  if (!isClient) {
    return null;
  }

  const onClick = () => {
    close();
    router.push('/store');
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image
              src='/mascot_bad.svg'
              alt='Bad Mascot'
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Get Pro for unlimited hearts or purchase them in the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              variant='primary'
              className='w-full'
              onClick={onClick}
              size='lg'
            >
              Get unlimited hearts
            </Button>
            <Button
              variant='primaryOutline'
              className='w-full'
              onClick={close}
              size='lg'
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
