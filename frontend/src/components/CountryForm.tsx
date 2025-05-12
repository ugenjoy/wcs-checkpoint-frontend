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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  code: z.string().min(2).max(3),
  emoji: z.string().min(1).max(4),
  continent: z.string(),
})

export function CountryForm() {
  const [createCountry] = useMutation(CREATE_COUNTRY)
  const { loading, error, data } = useQuery(GET_CONTINENTS)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      emoji: '',
      continent: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    createCountry({
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
