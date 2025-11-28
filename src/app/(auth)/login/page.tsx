'use client';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Next.js Navigasyon
import Link from 'next/link'; 
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/authSlice'; 
import Input from '@/components/ui/Input/Input'; 
import OrangeButton from '@/components/ui/Button/OrangeButton'; 
import PasswordInput from '@/components/ui/Input/PasswordInput'; 

// Servis
import { login } from '@/services/authService'; 
import { LoginData, User, AuthError, AuthResponse} from '@/types/auth';

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const router = useRouter(); 
    const dispatch = useDispatch();
    
    // Hata tiplendirmesi
    const [errors, setErrors] = useState<Record<string, string>>({}); 
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setSuccessMessage('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data: User & { token: string; roles: string[] } = await login(loginData);

            // Satıcı Rol Kontrolü
            if (data.roles[0] === 'ROLE_SELLER') {
                toast.error('Satıcılar lütfen satıcı giriş sayfasını kullanın!');

                // State temizleme
                setLoginData({ email: '', password: '' });
                setErrors({});
                setSuccessMessage('');
                return;
            }
            setSuccessMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
            setErrors({});

            const userData = {
                id: data.id,
                email: data.email,
                name: data.name,
                role: data.roles[0],
            };

            // Redux ve LocalStorage Kaydı
            dispatch(setCredentials({ user: userData, token: data.token }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userData));

            setTimeout(() => {
                // Next.js'te yönlendirme için router.push
                if (data.roles[0] === 'ROLE_CUSTOMER') {
                    router.push('/'); // ana sayfaya
                } else {
                    router.push('/satici/satici-dogrulama'); 
                }
            }, 1500);

        } catch (error) {
            const authError = error as AuthError;
            if (authError.errors) setErrors(authError.errors);
            else setErrors({ general: authError.message || 'Giriş başarısız!' });
            
            toast.error(errors.general || 'Giriş işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <> 
            <form className="space-y-6 flex flex-col px-4 md:px-8 py-4 mt-8" onSubmit={handleLogin}>
                {errors.general && (
                    <div className="text-red-500 text-sm mb-2">{errors.general}</div>
                )}
                {successMessage && (
                    <div className="text-green-600 text-sm mb-2">{successMessage}</div>
                )}

                {/* E-Posta */}
                <Input
                    type="email"
                    placeholder="E-posta adresi"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                {/* Şifre */}
                <PasswordInput
                    name="password"
                    placeholder="Şifre"
                    value={loginData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                {/* Şifremi Unuttum*/}
                <Link href="/forgot-password" className="custom-font font-medium text-sm text-[var(--color-light-orange)]">
                    Şifremi Unuttum
                </Link>
                
                <OrangeButton type="submit" onClick={handleLogin}>Giriş Yap</OrangeButton>

                <div className="text-center text-xs text-green-600">
                    Güvenli alışveriş
                </div>

                <Link href="/seller-login" className="flex justify-center text-orange-600 underline">
                    Satıcı girişi için tıklayınız
                </Link>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};
export default Login;