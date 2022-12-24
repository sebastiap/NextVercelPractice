import Footer from "../../main/footer/footer";
import Header from "../../main/header/header";

const MainLayout = ({children}) => {

    return (
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
    
    }    
    
export default MainLayout;