/**
 * Kullanıcının giriş formundan gönderdiği verinin yapısı.
 */
export interface LoginData {
    email: string;
    password: string;
}

/**
 * API'dan başarılı giriş sonrası dönen kullanıcı (User) verisinin temel yapısı.
 */
export interface User {
    id: number;
    email: string;
    name: string;
    roles: string[]; 
}

export interface AuthResponse extends User {
    token: string;
}

export interface AuthError {
    message: string;
    errors?: Record<string, string>; 
}