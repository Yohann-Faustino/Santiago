// on utilise un hook: useParams est un paramètre de route utilisé pour récupérer une valeur dynamique de l'URL.
import { useParams } from "react-router-dom";

const CommentsEdit = () => {

    const {cid} = useParams()
    console.log(cid)
    
    return (
        <div className="commentsEdit">
            <h1>CommentsEdit</h1>
        </div>
    );
};

export default CommentsEdit ;