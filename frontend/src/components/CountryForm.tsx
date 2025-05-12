import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONTINENTS } from '@/api/get-continents'
import { CREATE_COUNTRY } from '@/api/create-country'
import { useNavigate } from 'react-router-dom'
import { GET_COUNTRIES } from '@/api/get-countries'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  code: z.string().min(2).max(3),
  emoji: z.string().min(1).max(4),
  continent: z.string(),
})

type CountryFormPropsType = {
  closeDialog: () => void
}

export function CountryForm(props: CountryFormPropsType) {
  const [createCountry] = useMutation(CREATE_COUNTRY)
  const { loading, error, data } = useQuery(GET_CONTINENTS)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      emoji: '',
      continent: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createCountry({
      refetchQueries: [GET_COUNTRIES],
      variables: {
        data: {
          name: values.name,
          code: values.code,
          emoji: values.emoji,
          ...(Number(values.continent) && {
            continent: {
              id: Number(values.continent),
            },
          }),
        },
      },
    })

    props.closeDialog()

    if (res.data?.createCountry.code) {
      navigate(`/countries/${res.data.addCountry.code}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="continent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Continent</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez un continent" />
                  </SelectTrigger>
                  <SelectContent {...field}>
                    {data &&
                      !loading &&
                      !error &&
                      data.continents.map((continent) => {
                        return (
                          <SelectItem
                            key={continent.id}
                            value={String(continent.id)}
                          >
                            {continent.name}
                          </SelectItem>
                        )
                      })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full hover:cursor-pointer" type="submit">
          Ajouter
        </Button>
      </form>
    </Form>
  )
}
