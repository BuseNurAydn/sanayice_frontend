//ANA LAYOUT, Tüm uygulamanızın en dış iskeleti.
import "./globals.css";
import { ReduxProvider } from '@/components/ReduxProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ReduxProvider> 
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
