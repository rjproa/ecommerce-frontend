"use client";

import { usePathname } from "next/navigation";

export default function useCurrentPath() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return { isHome, pathname };
}