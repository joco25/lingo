import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarItem } from './sidebar-item';

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-4-2 flex-col',
        className
      )}
    >
      <Link href='/learn'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image src='/images/duo.png' alt='Duo' width={40} height={40} />
          <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>
            Lingo
          </h1>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem label='learn' iconSrc='/images/learn.svg' href='/learn' />
      </div>
    </div>
  );
};
