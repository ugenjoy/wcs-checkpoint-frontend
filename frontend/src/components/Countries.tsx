import { useQuery } from '@apollo/client'
import { Table, TableBody, TableCaption, TableCell, TableRow } from './ui/table'
import { GET_COUNTRIES } from '@/api/get-countries'
import { useNavigate } from 'react-router-dom'

export function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES)
  const navigate = useNavigate()

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
      <div className="w-full">
        <Table>
          <TableCaption>La liste de tous les pays.</TableCaption>
          <TableBody className="flex flex-col items-stretch justify-start gap-2">
            {data.countries.map((country) => {
              return (
                <TableRow
                  key={country.id}
                  className="hover:bg-secondary hover:cursor-pointer border border-border rounded w-full flex flex-wrap"
                  onClick={() => navigate(`/countries/${country.code}`)}
                >
                  <TableCell className="font-medium ">
                    {country.emoji}
                  </TableCell>
                  <TableCell className="font-bold ">{country.name}</TableCell>
                  <TableCell className="">
                    {country.continent?.name ?? ''}
                  </TableCell>
                  <TableCell className="text-right ">{country.code}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}
