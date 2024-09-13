import type { Metadata } from "next";
import toast, { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SiteHeader } from "@/components/site-header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          style: {
            background: 'linear-gradient(135deg,#16a34a, #84cc16)',
            color: '#ffffff',
            padding: '9px 20px',
            maxWidth: '350px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '13.5px',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          },
          success: {
            iconTheme: {
              primary: '#ffffff',
              secondary: '#4CAF50',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #dc2626, #dc2626)',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#f44336',
            },
          },
          }}
            position="bottom-right"
            reverseOrder={false}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
