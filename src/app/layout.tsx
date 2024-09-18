import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthContextProvider from "@/components/AuthStateCheck";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const notoSansTC = Noto_Sans_TC({
    weight: ["400", "700", "900"],
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    title: "免運GO｜免運購",
    description: "揪親友 湊免運",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-Hant">
            <AuthContextProvider>
                <SessionProvider>
                    <body className={notoSansTC.className}>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                        <Toaster
                            position="top-center"
                            richColors
                            closeButton
                            theme="dark"
                            toastOptions={{
                                style: {
                                    background: "#4b5563",
                                    fontSize: "18px",
                                },
                            }}
                        />
                    </body>
                </SessionProvider>
            </AuthContextProvider>
        </html>
    );
}
