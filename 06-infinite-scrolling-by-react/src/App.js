import useBookSearch from './useBookSearch'
import { useState, useRef, useCallback } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber)


  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      // detected is it the last one:
      if( entries[0].isIntersecting && hasMore ) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleSearch = e => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input type="text" onChange={handleSearch}/>
      { books.map( (book, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={book}>{book}</div>
        }else{
          return <div key={book}>{book}</div>
        }
      })}
      <div>{ loading && 'Loading...' }</div>
      <div>{ error && 'Error' }</div>
    </>
  );
}

export default App;
