import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header
      className={cn(
        'border-b border-border flex flex-col gap-2 p-4',
        'md:gap-8 md:flex-row md:justify-start md:items-center'
      )}
    >
      <h1 className="text-2xl font-bold whitespace-nowrap">
        Checkpoint : frontend
      </h1>
      <Link to="/">Countries</Link>
    </header>
  )
}
