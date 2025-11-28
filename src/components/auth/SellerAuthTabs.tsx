'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SellerAuthTabs = () => {
    const pathname = usePathname();
    
    const loginPath = "/seller-login"; // Veya /satici/giris-yap
    const signUpPath = "/seller-signup"; // Veya /satici/uye-ol

    const isLogin = pathname === loginPath;

    return (
        <div className="flex w-full rounded-t-lg overflow-hidden border-b border-neutral-300">

            <Link
                href={loginPath}
                className={`w-1/2 text-center py-6 font-semibold text-lg md:text-xl transition-colors ${
                    isLogin
                        ? "bg-white text-[var(--color-light-orange)] border-b-2 border-[var(--color-light-orange)]"
                        : "text-gray-400 hover:text-[var(--color-light-orange)]"
                }`}
            >
                Satıcı Giriş
            </Link>
          
            <Link
                href={signUpPath}
                className={`w-1/2 text-center py-6 font-semibold text-lg md:text-xl transition-colors ${
                    !isLogin
                        ? "bg-white text-[var(--color-light-orange)] border-b-2 border-[var(--color-light-orange)]"
                        : "text-gray-400 hover:text-[var(--color-light-orange)]"
                }`}
            >
                Satıcı Kayıt
            </Link>
        </div>
    );
};
export default SellerAuthTabs;