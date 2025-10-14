import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Technical Support Dashboard",
  description: "A professional technical support dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="flex h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
