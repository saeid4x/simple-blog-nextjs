import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextPropvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProviders";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

//***Increase timeout for google provider ****/
import { custom } from "openid-client";
custom.setHttpOptionsDefaults({
  timeout: 5000,
});
//****

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextPropvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextPropvider>
        </AuthProvider>
      </body>
    </html>
  );
}
