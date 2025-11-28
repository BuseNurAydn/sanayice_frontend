import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthTabSwitcher from '@/components/auth/AuthTabSwitcher';
const SANAYICE_LOGO_PATH = "/assets/png/sanayice.png"; 

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex items-center flex-col scrollbar-custom overflow-y-auto">
            <Link href="/">
                <Image 
                    src={SANAYICE_LOGO_PATH} 
                    alt="Logo" 
                    width={220} 
                    height={50} 
                    className="pt-4"
                    priority
                />
            </Link>

            <div className="bg-[var(--color-white)] rounded-lg shadow-lg border border-gray-50 custom-font w-full max-w-sm md:max-w-md mt-8 z-10 relative items-center ">
                
                <AuthTabSwitcher /> 
                <div>{children}</div>
            </div>

            <footer className="text-black font-light custom-font mt-9 text-sm text-center">
                ©Copyright 2025 Sanayice Tüm Hakları Saklıdır
            </footer>
        </div>
    );
}