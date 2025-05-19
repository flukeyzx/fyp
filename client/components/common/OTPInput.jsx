"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

export default function OTPInput({ otp, setOtp }) {
  const [slots, setSlots] = useState(new Array(6).fill(""));

  const handleEachSlot = (index, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = value.slice(-1);

    setSlots(updatedSlots);
    setOtp(updatedSlots.join(""));
  };

  return (
    <InputOTP
      value={otp}
      onChange={(newValue) => setOtp(newValue)}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
    >
      <InputOTPGroup className="flex justify-between w-full max-w-lg gap-4">
        {[...Array(6)].map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            value={slots}
            onChange={(e) => handleEachSlot(index, e.target.value)}
            className="w-14 h-12 text-2xl font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-center shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
