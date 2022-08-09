import { RepositoryItem } from './RepositoryItem'

const repository = {
  name: 'Unform',
  description: 'Description',
  link: 'https://github.com/Gabriel-biel'
}

export function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Lista de Respositorios</h1>
      <ul>
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
      </ul>
    </section>
  )
}