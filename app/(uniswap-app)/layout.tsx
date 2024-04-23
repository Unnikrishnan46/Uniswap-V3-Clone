import Navbar from "@/components/internal/navbar";
import PayTokenDialog from "@/components/internal/payTokenDialog";
import PoolTokenDialogOne from "@/components/internal/poolTokenDialogOne";
import PoolTokenDialogZero from "@/components/internal/poolTokenDialogZero";
import RecieveTokenDialog from "@/components/internal/recieveTokenDialog";

const UniswapLayout = ({
    children
}:{
    children:React.ReactNode;
}) =>{
    return(
        <div className="h-screen">
            <Navbar/>
            {children}
            <PayTokenDialog/>
            <RecieveTokenDialog/>
            <PoolTokenDialogZero/>
            <PoolTokenDialogOne/>
        </div>
    )
}

export default UniswapLayout;