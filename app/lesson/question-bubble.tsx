import React from 'react';
import Image from 'next/image';

type Props = {
  question: string;
};

const QuestionBubble = ({ question }: Props) => {
  return (
    <div className='flex item-center gap-x-5 mb-6'>
      <Image
        src='/images/mascot.svg'
        className='hidden lg:block'
        alt='Mascot'
        width={60}
        height={60}
      />
      <Image
        src='/images/mascot.svg'
        className='block lg:hidden '
        alt='Mascot'
        width={40}
        height={40}
      />
      <div className='relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base'>
        {question}
        <div className='absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 -translate-y-1/2 rotate-90' />
      </div>
    </div>
  );
};

export default QuestionBubble;
