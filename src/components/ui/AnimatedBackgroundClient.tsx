'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr:false must live in a Client Component.
// Server Component pages import this wrapper to keep framer-motion
// off the SSR / LCP critical path.
const AnimatedBackground = dynamic(
  () => import('@/components/ui/AnimatedBackground'),
  { ssr: false }
);

export { AnimatedBackground };
export default AnimatedBackground;
