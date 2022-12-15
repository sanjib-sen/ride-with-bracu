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
          <main className="grid h-screen overflow-y-auto no-scrollbar bg-black">
            <Nav />
            <div className="place-items-center">{children}</div>
          </main>
        </body>
      </html>
    </AuthContext>
  );
}
