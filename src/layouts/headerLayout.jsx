import React from "react";
import Logo from "../assets/logo.png";
import Vague from "../assets/vague.png";
import Decp from "../assets/decp.png";


const HeaderLayout = () => {
    return (
            <header>
                <div className=" relative">
                    <img src={Logo} alt="Logo de l'entreprise" className=" h-40 absolute top-8 sm:left-5 md:left-16 lg:left-32 " />
                    <img src={Decp} alt="Nom de l'entreprise" className=" h-20 absolute top-20 sm:left-1/4 md:left-1/3 lg:left-1/3" />
                    <img src={Vague} alt="Jet d'eau" className=" w-full h-64" />
                </div>
            </header>
    )
};

export default HeaderLayout;