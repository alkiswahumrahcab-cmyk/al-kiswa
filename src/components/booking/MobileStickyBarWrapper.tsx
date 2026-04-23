"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StickyBookingBar from "@/components/StickyBookingBar";

export default function MobileStickyBarWrapper() {
  const router = useRouter();

  return (
    <div className="md:hidden">
      <StickyBookingBar
        price={0}
        route="Umrah Transport"
        date=""
        pax={1}
        onBook={() => router.push("/booking")}
      />
    </div>
  );
}
