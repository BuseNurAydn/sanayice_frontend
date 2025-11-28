'use client'; 

import AuthTabs from './AuthTabs'; 
import SellerAuthTabs from './SellerAuthTabs'; 
import { usePathname } from 'next/navigation'; 

const AuthTabSwitcher = () => {
    const pathname = usePathname(); 
    const isSellerRoute = pathname.startsWith("/seller");
    const hideTabs = false; 
    
    if (hideTabs) {
        return null;
    }
    
    return (
        <>
            {isSellerRoute ? <SellerAuthTabs /> : <AuthTabs />}
        </>
    );
};

export default AuthTabSwitcher;