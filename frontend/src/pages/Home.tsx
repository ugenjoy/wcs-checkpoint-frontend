import { Countries } from '@/components/Countries'
import { CountryForm } from '@/components/CountryForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function HomePage() {
  return (
    <section className="m-4 flex flex-col gap-4 items-start">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:cursor-pointer">Nouveau Pays</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="mb-2">
              <DialogTitle>Ajouter un nouveau pays</DialogTitle>
            </DialogHeader>
            <CountryForm />
          </DialogContent>
        </Dialog>
      </div>
      <Countries />
    </section>
  )
}
