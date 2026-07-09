'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr:false must live in a Client Component.
// Server Component fleet pages import this wrapper instead of Interior360Viewer directly,
// keeping three.js / @react-three/fiber out of the initial page bundle.
const Interior360Viewer = dynamic(
  () => import('@/components/fleet/Interior360Viewer'),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[400px] w-full animate-pulse rounded-xl bg-black/5"
        aria-label="Loading 360 interior view"
      />
    ),
  }
);

export { Interior360Viewer };
export default Interior360Viewer;
