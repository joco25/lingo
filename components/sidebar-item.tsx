'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      size='lg'
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className='justify-start h-[52px]'
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={label}
          className='mr-5'
        />
        {label}
      </Link>
    </Button>
  );
};
