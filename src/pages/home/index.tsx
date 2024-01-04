import { useEffect, useState } from 'react'

import api from '../../services/api'
import { Link } from 'react-router-dom'

import styles from './home.module.css'

export function Home() {
  const [filmes, setFilmes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadMovies() {
      const response = await api.get(`movie/now_playing`, {
        params: {
          api_key: 'd98718449298e21a3e0a0a07869752bc',
          language: 'pt-BR',
          page: 1
        }
      })
      setFilmes(response.data.results)
      setLoading(false)
    }
    loadMovies()
  }, [])

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles['lista-filmes']}>
        {filmes.map((filme) => {
          return (
            <article className={styles.filme} key={filme.id}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
              <strong className={styles.titulo}> {filme.title}</strong>
            </article>
          )
        })}
      </div>
    </div>
  )
}
