import Image from 'next/image'
import { imgUrl } from 'utils'
import styles from './search.module.css'

const Search = () => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const keyword = e.currentTarget['search']?.value
    console.log(keyword)
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.icon}>
      <Image src={`${imgUrl}search.svg`} width="18" height="18" loading="lazy" layout="fixed" title="search" />
      </div>
      <input
        id="search"
        type="text"
        placeholder="Search block, transaction, account..."
        autoFocus
      />
      <button type="submit" >Search</button>
    </form>
  )
}

export default Search
