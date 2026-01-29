import '../styles/globals.css'; 
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Startup Benefits Platform</title>
        <meta
          name="description"
          content="Exclusive SaaS deals for startups"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
