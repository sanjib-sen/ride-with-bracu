import "./globals.css";
import AuthContext from "./AuthContext";
import Navbar from "../components/NavBar";

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
          {/* <Navbar></Navbar> */}
          <div className="flex bg-zinc-700 h-full xs:h-screen items-center justify-center">
            {children}
          </div>
        </body>
      </html>
    </AuthContext>
  );
}
