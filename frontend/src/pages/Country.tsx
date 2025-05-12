import { GET_COUNTRY } from '@/api/get-country'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export function CountryPage() {
  const { code } = useParams()
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: {
      code,
    },
  })

  if (loading) {
    return (
      <section>
        <p>Chargement de la page.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p>Impossible de charger la page</p>
      </section>
    )
  }

  if (data && !loading && !error) {
    return (
      <section className="m-4 flex flex-col gap-4 items-start w-full">
        <h2 className="text-3xl font-bold">{data.country.name}</h2>
        <div>
          <p>Code: {data.country.code}</p>
          <p>Continent: {data.country.continent.name}</p>
          <p>Drapeau: {data.country.emoji}</p>
        </div>
      </section>
    )
  }
}
