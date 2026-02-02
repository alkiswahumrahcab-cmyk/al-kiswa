'use client';

import dynamic from 'next/dynamic';

export const InstantPriceCalculator = dynamic(() => import('@/components/home/InstantPriceCalculator'), { ssr: false });
export const FleetCarouselWrapper = dynamic(() => import('@/components/home/FleetCarouselWrapper'), { ssr: false });
export const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection'), { ssr: false });
export const GallerySection = dynamic(() => import('@/components/home/CustomerGallery'), { ssr: false });
export const HomeFleetCarousel = dynamic(() => import('@/components/home/HomeFleetCarousel'), { ssr: false });
export const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'), { ssr: false });
export const RealFleetShowcase = dynamic(() => import('@/components/home/RealFleetShowcase'), { ssr: false });
export const FleetGallery = dynamic(() => import('@/components/home/FleetGalleryV2'), { ssr: false });
