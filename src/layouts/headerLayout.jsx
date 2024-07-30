import React from "react";
import Logo from "../assets/logo.png";
import Vague from "../assets/vague.png";
import Decp from "../assets/decp.png";


const HeaderLayout = () => {
    return (
        <header>
            <div className=" relative">
                <div className=" inline-block flex-row absolute top-8 sm:left-14 md:left-36">
                    <img src={Logo} alt="Logo de l'entreprise" className=" h-20 inline-block" />
                    <img src={Decp} alt="Nom de l'entreprise" className=" h-9 inline-block" />
                </div>
                <img src={Vague} alt="Jet d'eau" className=" w-full h-28" />
            </div>
        </header>
    )
};

export default HeaderLayout;