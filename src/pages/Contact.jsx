import React from "react";

const Contact = () => {

    return (

        <div className="flex flex-col text-center w-full ">            
        <h1 className="colorTitle">Contact</h1>
            <ul>
                <li className=" colorh2 mb-5">24 HEURES SUR 24 / 7 JOURS SUR 7</li>
                <li className=" colorh2"><a href="tel:+33695451933"> 📞 06.95.45.19.33</a></li>
                <li className=" colorh2"><a href="mailto:decp@decp.fr">📧 decp@decp.fr</a></li>
            </ul>
        </div>
    );
};

export default Contact;