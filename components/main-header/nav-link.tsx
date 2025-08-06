"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  const isActive = path === href || path.startsWith(href + '/');

  return (
    <Link href={href} className={isActive ? classes.active : undefined}>
      {children}
    </Link>
  );
}