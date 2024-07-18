import React, { useState } from "react";
import axios from "axios";
import { accountService } from "../services/account.service";

const Comments = () => {
  const [commentData, setCommentData] = useState({
    title: '',
    content: ''
  });

  const onChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const token = accountService.getToken();

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post('http://localhost:3000/comments', commentData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Laissez un commentaire:</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre du commentaire"
          value={commentData.title}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="content"
          placeholder="Écrivez ici votre commentaire"
          value={commentData.content}
          onChange={onChange}
          required
        />
        <button>Envoyer votre commentaire</button>
      </form>
    </div>
  );
};

export default Comments;
