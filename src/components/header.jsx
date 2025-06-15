import React from "react";

const Header = () => {
    return (
        <header>
            <div className="relative">
                <div className="flex flex-row absolute items-center top-8 sm:left-14 md:left-36">
                    <img src="/assets/logo.png" alt="Logo de l'entreprise" className="h-20 inline-block" />
                    <img src="/assets/decp.png" alt="Nom de l'entreprise" className="h-9 inline-block" />
                </div>
                <img src="/assets/vague.png" alt="" aria-hidden="true" role="presentation" className="w-full h-28" />
            </div>
        </header>
    );
};

export default Header;
