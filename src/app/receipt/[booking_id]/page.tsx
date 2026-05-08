import { getBookings } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, XCircle, Download, Printer, PlusCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Receipt Verification | Al Kiswah Umrah Cab',
    description: 'Verify your booking receipt for Al Kiswah Umrah Cab.',
};

export default async function ReceiptVerificationPage(props: { params: Promise<{ booking_id: string }> }) {
    const params = await props.params;
    const bookingId = params.booking_id;

    // Fetch the booking from the database
    const bookings = await getBookings();
    const booking: any = bookings.find((b: any) => (b._id || b.id || '').toString() === bookingId);

    const isVerified = !!booking;
    const shortId = bookingId;

    return (
        <div className="min-h-screen bg-primary-black text-white font-sans selection:bg-gold-primary/30">
            {/* Header */}
            <header className="w-full bg-[#111111] border-b border-white/10 py-6 px-4 text-center">
                <Link href="/">
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/images/logo.png" alt="Al Kiswah Umrah Cab" width={180} height={60} className="mb-2" />
                        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Receipt Verification</h1>
                        <h2 className="text-lg md:text-xl font-bold text-gold-primary" dir="rtl">التحقق من الإيصال</h2>
                        <p className="text-sm text-gray-400 mt-2">Scan result for booking #{shortId}</p>
                    </div>
                </Link>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
                {/* Status Box */}
                <div className="flex justify-center mb-10">
                    {isVerified ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 flex flex-col items-center justify-center w-full max-w-sm shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                            <CheckCircle className="text-green-500 mb-3" size={48} />
                            <h3 className="text-green-500 font-bold text-2xl tracking-wide">VERIFIED</h3>
                            <h4 className="text-green-400 font-bold text-xl mt-1" dir="rtl">تم التحقق</h4>
                            <p className="text-gray-400 text-sm mt-3 text-center">This is a valid, official booking receipt.</p>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex flex-col items-center justify-center w-full max-w-sm shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                            <XCircle className="text-red-500 mb-3" size={48} />
                            <h3 className="text-red-500 font-bold text-2xl tracking-wide">INVALID RECEIPT</h3>
                            <h4 className="text-red-400 font-bold text-xl mt-1" dir="rtl">غير صالح</h4>
                            <p className="text-gray-400 text-sm mt-3 text-center">We could not find a booking matching this ID.</p>
                        </div>
                    )}
                </div>

                {isVerified && booking && (
                    <>
                        {/* Booking Summary Section */}
                        <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-xl mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                
                                {/* English Column */}
                                <div className="p-6 md:p-8">
                                    <h3 className="text-gold-primary font-bold text-lg mb-6 tracking-wide border-b border-white/5 pb-2">Booking Summary</h3>
                                    
                                    <div className="space-y-4">
                                        <DetailRow label="Receipt No" value={shortId} />
                                        <DetailRow label="Booking ID" value={shortId} />
                                        <DetailRow label="Customer Name" value={booking.name} />
                                        <DetailRow label="Phone" value={booking.phone} />
                                        <DetailRow label="Pickup" value={booking.pickup} />
                                        <DetailRow label="Drop-off" value={booking.dropoff || '—'} />
                                        <DetailRow label="Route" value={booking.routeName || booking.route || '—'} />
                                        <DetailRow label="Vehicle" value={booking.vehicleName || booking.vehicle} />
                                        <DetailRow label="Travel Date" value={booking.date} />
                                        <DetailRow label="Travel Time" value={booking.time} />
                                        
                                        <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Fare</span>
                                            <span className="text-gold-primary font-bold text-xl">{booking.totalAmount || booking.price} {booking.currency || 'SAR'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Arabic Column */}
                                <div className="p-6 md:p-8 bg-white/[0.02]">
                                    <h3 className="text-gold-primary font-bold text-lg mb-6 border-b border-white/5 pb-2 text-right" dir="rtl">ملخص الحجز</h3>
                                    
                                    <div className="space-y-4" dir="rtl">
                                        <DetailRowAr label="رقم الإيصال" value={shortId} />
                                        <DetailRowAr label="رقم الحجز" value={shortId} />
                                        <DetailRowAr label="اسم العميل" value={booking.name} />
                                        <DetailRowAr label="رقم الجوال" value={booking.phone} />
                                        <DetailRowAr label="موقع الاستلام" value={booking.pickup} />
                                        <DetailRowAr label="موقع الوصول" value={booking.dropoff || '—'} />
                                        <DetailRowAr label="المسار" value={booking.routeName || booking.route || '—'} />
                                        <DetailRowAr label="المركبة" value={booking.vehicleName || booking.vehicle} />
                                        <DetailRowAr label="تاريخ الرحلة" value={booking.date} />
                                        <DetailRowAr label="وقت الرحلة" value={booking.time} />
                                        
                                        <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center flex-row-reverse">
                                            <span className="text-gray-400 text-sm font-bold">إجمالي الأجرة</span>
                                            <span className="text-gold-primary font-bold text-xl" dir="ltr">{booking.totalAmount || booking.price} {booking.currency || 'SAR'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 mb-12">
                            <div className="text-center p-4 bg-white/5 border border-gold-primary/20 rounded-xl">
                                <p className="text-white text-sm font-semibold mb-1">Your booking is confirmed.</p>
                                <p className="text-gray-300 text-sm">A PDF receipt has been sent to the customer's email.</p>
                                <div className="mt-2 text-gold-primary text-sm font-bold" dir="rtl">
                                    تم تأكيد الحجز. تم إرسال إيصال PDF إلى بريدك الإلكتروني.
                                </div>
                            </div>
                            
                            <div className="flex justify-center mt-2">
                                <Link 
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-gray-300 font-semibold py-4 px-8 rounded-xl border border-white/10 transition-colors"
                                >
                                    <PlusCircle size={20} />
                                    Book Another Ride
                                </Link>
                            </div>
                        </div>
                    </>
                )}

                {!isVerified && (
                    <div className="flex justify-center mt-8">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 bg-gold-primary hover:bg-gold-light text-black font-bold py-3 px-8 rounded-full transition-colors"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] border-t border-white/5 py-10 px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div>
                        <p className="text-gray-400 text-sm leading-relaxed">Thank you for choosing Al Kiswah Umrah Cab.</p>
                        <p className="text-gray-400 text-sm leading-relaxed">We wish you a blessed and safe Umrah journey.</p>
                    </div>
                    
                    <div className="w-16 h-[1px] bg-white/10 mx-auto"></div>
                    
                    <div>
                        <p className="text-gray-400 text-[15px] leading-relaxed font-bold" dir="rtl">شكرًا لاختياركم شركة الكسوة لسيارات العمرة.</p>
                        <p className="text-gray-400 text-[15px] leading-relaxed font-bold" dir="rtl">نتمنى لكم رحلة عمرة مباركة وآمنة.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-white/5 pb-2 last:border-0 last:pb-0 gap-1 sm:gap-4">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{label}</span>
            <span className="text-sm font-medium text-gray-200 text-left sm:text-right break-words">{value || '—'}</span>
        </div>
    );
}

function DetailRowAr({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-white/5 pb-2 last:border-0 last:pb-0 gap-1 sm:gap-4">
            <span className="text-xs text-gray-500 font-bold whitespace-nowrap">{label}</span>
            <span className="text-sm font-medium text-gray-200 text-right sm:text-left break-words" dir="auto">{value || '—'}</span>
        </div>
    );
}
