'use client'; 

import Link from 'next/link'; 
import { usePathname } from 'next/navigation';

const AuthTabs = () => {
  
  const pathname = usePathname();

  const isLogin = pathname === "/login"; 
  const isSignUp = pathname === "/sign-up"; 
  
  const loginPath = "/login";
  const signUpPath = "/sign-up";

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
        Giriş Yap
      </Link>

      <Link
        href={signUpPath}
        className={`w-1/2 text-center py-6 font-semibold text-lg md:text-xl transition-colors ${
          isSignUp 
            ? "bg-white text-[var(--color-light-orange)] border-b-2 border-[var(--color-light-orange)]"
            : "text-gray-400 hover:text-[var(--color-light-orange)]"
        }`}
      >
        Üye Ol
      </Link>
    </div>
  );
};
export default AuthTabs;