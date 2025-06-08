import React from "react";
import { Link } from "react-router-dom";

const LegalDisclaimer = () => {
    return (
        <div className="p-1 max-w-[800px] mx-auto" role="contentinfo" aria-label="Mentions légales">
            <h1 className="mb-3 colorTitle">MENTIONS LÉGALES</h1>

            <section aria-labelledby="intro">
                <p>
                    Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la
                    confiance en l'économie numérique, il est précisé aux utilisateurs du site DECP
                    l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
                </p>
            </section>

            <section className="mt-4" aria-labelledby="edition">
                <h2 className="mb-1 mt-3 colorTitle">Édition du site</h2>
                <p>Le présent site, accessible à l’URL <strong>https://santiago-plum.vercel.app
                </strong> (le « Site »), est édité par :</p>
                <p>
                    DECP, société au capital de 3000 euros, inscrite au R.C.S. de CRETEIL sous le numéro
                    B 919 945 568, dont le siège social est situé au 8, Rue Estienne d'Orves 94000
                    CRETEIL, représenté(e) par François Santiago dûment habilité(e).
                </p>
                <div className="text-sm text-red-800 font-medium" aria-label="Informations administratives">
                    <ul>
                        <li><p>SIRET : 752 567 859 00018</p></li>
                        <li><p>TVA : FR 71 752567859</p></li>
                        <li><p>Code APE : 4322A</p></li>
                    </ul>
                </div>
                <p>Le numéro individuel TVA de l’éditeur est : FR 71 752567859.</p>
            </section>

            <section className="mt-4" aria-labelledby="hébergement">
                <h2 className="mb-1 mt-3 colorTitle">Hébergement</h2>
                <p>
                    Le Site est hébergé par la société{" "}
                    <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkClick"
                        title="Visiter le site de l'hébergeur Vercel"
                    >
                        Vercel
                    </a>, situé Vercel Inc. 340 S Lemon Ave #4133 Walnut, CA 91789 USA (email :
                    support@vercel.com).
                </p>
            </section>

            <p className="mt-2">
                L’API (backend) et la base de données sont hébergées par la société{" "}
                <a
                    href="https://railway.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkClick"
                    title="Visiter le site de l'hébergeur Railway"
                >
                    Railway
                </a>, située Railway Inc., 2261 Market Street #4081, San Francisco, CA 94114, USA.
            </p>


            <section className="mt-4" aria-labelledby="authentification-et-securite">
                <h2 className="mb-1 mt-3 colorTitle">Authentification et sécurité</h2>
                <p>
                    Lors de l'inscription ou de la connexion, les données d'identification (comme l'adresse email et le mot de passe) sont traitées de manière sécurisée.
                    Les mots de passe sont strictement confidentiels et stockés sous forme chiffrée (hachée). Un jeton d’authentification (JWT) est généré à la connexion pour maintenir la session de l’utilisateur active ;
                    ce jeton, stocké localement, ne contient que les informations nécessaires à l’identification et n’est transmis à aucun tiers.
                    En cas de demande de réinitialisation de mot de passe, un lien sécurisé temporaire est envoyé par email à l’utilisateur.
                    Toutes ces données ne sont utilisées qu’à des fins d’authentification et de sécurité, conformément au RGPD.
                </p>
            </section>

            <section className="mt-4" aria-labelledby="directeur">
                <h2 className="mb-1 mt-3 colorTitle">Directeur de publication</h2>
                <p>Le Directeur de la publication du Site est François Santiago.</p>
            </section>

            <section className="mt-4" aria-labelledby="contact">
                <h2 className="mb-1 mt-3 colorTitle">Nous contacter</h2>
                <ul className="list-disc list-inside pl-2">
                    <li>
                        <a href="tel:+33695451933" className="linkClick" title="Appeler DECP">
                            <span role="img" aria-label="téléphone" className="emoji">📞</span> 06.95.45.19.33
                        </a>
                        <p>
                            Le site ne dispose pas de formulaire de contact. Pour toute demande, vous pouvez nous contacter directement par email à l'adresse indiquée.
                            Les messages envoyés sont traités uniquement dans le cadre de votre demande et ne sont conservés que le temps nécessaire à son traitement.
                            Aucun enregistrement automatique n’est effectué sur le site.
                        </p>
                    </li>
                    <li>
                        <a href="mailto:decp@decp.fr" className="linkClick" title="Envoyer un mail à DECP">
                            <span role="img" aria-label="email" className="emoji">📧</span> decp@decp.fr
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="linkClick" title="Accéder à la page contact">
                            <span role="img" aria-label="adresse" className="emoji">🌏</span> 8 Rue d'Estienne d'Orves, 94000 Créteil
                        </a>
                    </li>
                </ul>
            </section>

            <section className="mt-4" aria-labelledby="propriété-intellectuelle">
                <h2 className="mb-1 mt-3 colorTitle">Propriété intellectuelle</h2>
                <p>
                    L’ensemble du contenu du site https://santiago-plum.vercel.app (textes, images, illustrations, logos, icônes, etc.) est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction ou représentation, intégrale ou partielle, est interdite sans autorisation écrite préalable.
                </p>
            </section>

            <section className="mt-4" aria-labelledby="données personnelles">
                <h2 className="mb-1 mt-3 colorTitle">Données personnelles</h2>
                <p>
                    Le traitement de vos données à caractère personnel est régi par notre Charte du
                    respect de la vie privée, disponible depuis la section{" "}
                    <Link
                        to="/privacypolicy"
                        className="linkClick"
                        title="Consulter la politique de confidentialité"
                    >
                        "Politique de confidentialité"
                    </Link>, conformément au
                    Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 (« RGPD »).
                </p>
            </section>

            <section className="mt-4" aria-labelledby="disclaimer-stagiaire">
                <h2 className="mb-1 mt-3 colorTitle">Avertissement</h2>
                <p>
                    Ce site a été réalisé dans le cadre d’un stage de formation. Bien que tous les efforts aient été faits pour fournir un service fiable,
                    il se peut que certaines erreurs ou imprécisions subsistent. Si vous constatez un problème ou une incohérence, n’hésitez pas à nous
                    contacter. Nous vous remercions de faire preuve de compréhension.
                    <ul>
                        <li>
                            <a href="mailto:decp@decp.fr" className="linkClick" title="Envoyer un mail à DECP">
                                <span role="img" aria-label="email" className="emoji">📧</span> decp@decp.fr
                            </a>
                        </li>
                        <li>
                            <a className="linkClick" href="mailto:yohannfaustino@gmail.com" title="Envoyer un mail au développeur du site">
                                <span role="img" aria-label="email" className="emoji">📧</span>yohannfaustino@gmail.com
                            </a>
                        </li>
                    </ul>
                </p>
            </section>

        </div >
    );
};

export default LegalDisclaimer;
