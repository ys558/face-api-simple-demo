import { useQuery } from 'react-query'
import { Flex } from 'rebass'
import { getAllBooks } from '../api'
import { Container } from '../shared/Container'
import Loader from 'react-loader-spinner'

export const BooksList = () => {
  const { data, error, isLoading, isError } = useQuery('books', getAllBooks)

  if (isLoading) return <Container>
    <Flex>
      <Loader type='ThreeDots' color='#ccc' height={30} />
    </Flex>
  </Container>

  if (isError) return <span>
    Error: {error.message}
  </span>

  return <Container>
    <Flex flexDirection='column' alignItems='center'>
    {
      data.map(({author, title, id}) => (
        <div key={id}>
          {author} -- {title}
        </div>
      ))
    }
    </Flex>
  </Container>
}
