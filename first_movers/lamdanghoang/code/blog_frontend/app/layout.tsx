import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const geist = Geist({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist",
});

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "Sui Blog",
    description: "A beautiful blog with markdown editor",
    generator: "v0.app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geist.variable} ${manrope.variable} antialiased`}
        >
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
