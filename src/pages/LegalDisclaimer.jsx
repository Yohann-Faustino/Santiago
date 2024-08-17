import React from "react";
import { Link } from "react-router-dom";

const LegalDisclaimer = () => {

    return (

        <div>
            <h1 className=" mb-5 colorTitle">MENTIONS LÉGALES</h1>

            <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site DECP l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <h2 className=" mb-5 mt-5 colorTitle">Edition du site</h2>

            <p>Le présent site, accessible à l’URL www.decp.fr (le « Site »), est édité par :</p>

            <p>DECP , société au capital de 3000 euros, inscrite au R.C.S. de CRETEIL sous le numéro B 919 945 568, dont le siège social est situé au 8, Rue Estienne d'Orves  94000 CRETEIL, représenté(e) par François Santiago dûment habilité(e)</p>

            <p>Le numéro individuel TVA de l’éditeur est : FR 71 752567859.</p>

            <h2 className=" mb-5 mt-5 colorTitle">Hébergement</h2>

            <p>Le Site est hébergé par la société Vercel, situé Vercel Inc. 340 S Lemon Ave #4133 Walnut, CA 91789 USA, (email : support@vercel.com).</p>

            <h2 className=" mb-5 mt-5 colorTitle">Directeur de publication</h2>

            <p>Le Directeur de la publication du Site est François Santiago .</p>

            <h2 className=" mb-5 mt-5 colorTitle">Nous contacter</h2>

            <ul>
                <li><a href="tel:+33695451933" className="linkClick"><span role="img" aria-label="phone" className="emoji">📞</span> 06.95.45.19.33</a></li>
                <li><a href="mailto:decp@decp.fr" className="linkClick"><span role="img" aria-label="email" className="emoji">📧</span> decp@decp.fr</a></li>
                <li><span role="img" aria-label="address" className="emoji">📩</span> 8, Rue Estienne d'Orves  94000 CRETEIL</li>
            </ul>

            <h2 className=" mb-5 mt-5 colorTitle">Données personnelles</h2>

            <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section <Link to="/privacypolicy" className="linkClick">"Politique de confidentialité"</Link> , conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</p>

        </div>
    );
};

export default LegalDisclaimer;