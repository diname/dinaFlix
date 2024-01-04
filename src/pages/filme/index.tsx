import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../services/api'

import styles from './filme.module.css'

type MinhaListaProps = any

export function Filme() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [filme, setFilme] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: 'd98718449298e21a3e0a0a07869752bc',
            language: 'pt-BR'
          }
        })
        .then((response) => {
          setFilme(response.data)
          setLoading(false)
        })
        .catch(() => {
          console.log('Filme não encontrado')
          navigate('/', { replace: true })
          return
        })
    }
    loadFilme()
  }, [navigate, id])

  function salvarFilme() {
    const minhaLista: MinhaListaProps = localStorage.getItem('@dinaflix')
    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some(
      (filmeSalvo: any) => filmeSalvo.id === filme.id
    )

    if (hasFilme) {
      toast.warn('Esse filme já está na sua lista')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('@dinaflix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!')
  }

  if (loading) {
    return (
      <div className="loading">
        <h1> Carregando filme...</h1>
      </div>
    )
  }

  return (
    <div className={styles.filme}>
      <h1>{filme.title}</h1>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse:</h3>
      <span> {filme.overview} </span>

      <strong> {filme.vote_average.toFixed(1)} /10 </strong>

      <div className={styles['area-buttons']}>
        <button onClick={salvarFilme}> Salvar </button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
