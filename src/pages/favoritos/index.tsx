import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './favoritos.module.css'
import { Link } from 'react-router-dom'

type ListOfFavorites = any

export function Favoritos() {
  const [favoritos, setFavoritos] = useState<any>([])

  useEffect(() => {
    const listOfFavorites: ListOfFavorites = localStorage.getItem('@dinaflix')
    setFavoritos(JSON.parse(listOfFavorites) || [])
  }, [])

  function excluirFilme(id: number) {
    let filterFavorites = favoritos.filter((favorite: any) => {
      return favorite.id !== id
    })

    setFavoritos(filterFavorites)
    localStorage.setItem('@dinaflix', JSON.stringify(filterFavorites))
    toast.success('Filme removido com sucesso!')
  }

  return (
    <div className={styles['container-favorites']}>
      <h1> Meus filmes favoritos </h1>
      {favoritos.length === 0 && <span>Você não possui filmes salvos</span>}

      <div>
        {favoritos.map((favorito: any) => {
          return (
            <article key={favorito.id} className={styles.favorite}>
              <h3> {favorito.title} </h3>
              <img
                className={styles.capa}
                src={`https://image.tmdb.org/t/p/original/${favorito.poster_path}`}
              />
              <button>
                <Link to={`/filme/${favorito.id}`}>Detalhes</Link>
              </button>
              <button onClick={() => excluirFilme(favorito.id)}>Excluir</button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
