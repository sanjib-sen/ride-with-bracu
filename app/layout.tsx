import "./globals.css";
import AuthContext from "../components/AuthContext";
import Nav from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en">
        <head />
        <body>
          <main className="grid h-screen overflow-y-auto no-scrollbar bg-gradient-to-r from-blue-900 to-black">
            <Nav />
            <div className="place-items-center">{children}</div>
          </main>
        </body>
      </html>
    </AuthContext>
  );
}
