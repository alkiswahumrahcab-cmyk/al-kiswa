import { notFound, redirect } from 'next/navigation';
import { requireRole } from '@/lib/server-auth';
import { getBooking } from '@/lib/db';
import BookingDetailClient from '@/components/admin/bookings/BookingDetailClient';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    return { title: `Booking #${id.slice(-8).toUpperCase()} - Admin` };
}

export default async function BookingDetailPage({ params }: Props) {
    const { id } = await params;

    const isAuth = await requireRole(['ADMIN', 'MANAGER', 'OPERATIONAL_MANAGER']);
    if (!isAuth) redirect('/292852/login');

    const booking = await getBooking(id);
    if (!booking) notFound();

    // Serialize: strip all Mongoose/MongoDB methods so it's a plain object safe for client components
    const plainBooking = JSON.parse(JSON.stringify(booking));

    return <BookingDetailClient booking={plainBooking} />;
}