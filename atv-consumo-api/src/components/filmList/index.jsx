"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./filmList.module.css";

const FilmList = () => {
const url = "https://hp-api.onrender.com/api/characters";
  
const [films, setFilms] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null)

useEffect(() => {
    const fetchFilms = async () => {
      try {
       setLoading(true)
       const response = await axios.get(url);
       setFilms(response.data)
       setLoading(false)
      } catch (error) {
        console.log("Erro ao buscar filmes na API");
        setError(
            "Não foi possível carregar os personagens. Tente novamente mais tarde! #Sorry"
        );
        setLoading(false);
        
      }
    };

    fetchFilms();
}, []);

if (loading) {
    return (
        <div className={styles.loading}>
            Carregando Personagens...
        </div>
    )
}

if (error) {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
}
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personagens Harry Potter </h1>
      <div className={styles.filmGrid}>
        {films.map((film) => (
          <div key={film.id} className={styles.filmCard}>
            <div className={styles.imageContainer}>
              <img src={film.image || "https://variety.com/wp-content/uploads/2024/04/Harry-Potter-Audiobooks-Audible.png?w=685"} alt={film.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.filmTitle}>{film.title}</h2>
              <p className={styles.nome}>Nome:{film.name}</p>
              <p className={styles.ator}>Ator:{film.actor}</p>
              <p className={styles.especie}>Espécie:{film.species}</p>
              <p className={styles.feiticos}>Feitiços:{film.patronus}</p>
              <p className={styles.casas}>Casas:{film.house}</p>
              <p className={styles.year}>{film.release_date}</p>
              <div className={styles.rating}>
                <span className={styles.score}>{film.rt_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmList;

