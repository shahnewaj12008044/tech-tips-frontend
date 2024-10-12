import Footer from "@/components/shared/footer/footer"
import Navbar from "@/components/shared/navbar/Navbar"
import { ReactNode } from "react"
const RootLayout = ({children}:{children: ReactNode}) => {
    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )
}

export default RootLayout