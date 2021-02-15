import { useMutation } from "react-query"
import { useHistory } from "react-router-dom"
import { Box, Heading } from "rebass"
import { createBook } from "../api"
import { BookForm, Container, } from '../shared'

export const CreateBook = () => {
  const history = useHistory()

  const { mutateAsync, isLoading } = useMutation(createBook)
  const onFormSubmit = async data => {
    await mutateAsync(data)
    history.push('/')
  }

  return <Container>
    <Box sx={{ py: 3 }}>
      <Heading sx={{ marginBottom: 3 }}>Create New Book</Heading>
      <BookForm onFormSubmit={onFormSubmit} isLoading={isLoading} />
    </Box>
  </Container>
}