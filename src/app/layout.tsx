import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const notoSansTC = Noto_Sans_TC({
    weight: ["400", "700", "900"],
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    title: "免運樂",
    description: "揪親友 湊免運",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={notoSansTC.className}>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
