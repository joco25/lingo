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
import Image from 'next/image';
import { Button } from '../ui/button';
import { usePracticeModal } from '@/store/use-practice-modal';

const PracticeModal = () => {
  const { isOpen, open, close } = usePracticeModal();
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
            <Image src='/heart.svg' alt='Heart' width={100} height={100} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            Practice lesson
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Use Practice lessons to regain hearts and points. You cannot lose
            hearts or points in Practice lessons.
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
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeModal;
