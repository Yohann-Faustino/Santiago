// On fait toutes les importations dans un fichier index un peu comme un raccourci ce qui permet dans publicRouter de faire des importation simplifiées plus propres.

export { default as Layout } from '../layouts/layout';
export { default as Nav } from '../components/nav';
export { default as Appointments } from '../pages/Appointments';
export { default as Comment } from '../pages/Comment';
export { default as Contact } from '../pages/Contact';
export { default as Error } from '../pages/Error';
export { default as Home } from '../pages/Home';
export { default as LegalDisclaimer } from '../pages/LegalDisclaimer';
export { default as Planning } from '../pages/Planning';
export { default as PrivacyPolicy } from '../pages/PrivacyPolicy';
export { default as Profile } from '../pages/Profile';
export { default as Services } from '../pages/Service';
export { default as SignUp } from '../pages/SignUp';
export { default as SiteMap } from '../pages/SiteMap';
export { default as AuthGuard } from  '../../backend/components/securite/authGuard';
export { default as ForgotPassword } from '../pages/ForgotPassword';
export { default as ResetPassword} from '../pages/ResetPassword';
