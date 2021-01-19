import { Flex, Text, Button, Link as StyledLink } from 'rebass/styled-components'
import { Link } from 'react-router-dom'

export const BookItem = ({ author, title, id }) => {
  return <Flex p={3} width="100%" alignItems='center'>
    <Link component={StyledLink} to={`/update-book/${id}`} mr="auto"></Link>
    <Text>{author}</Text>
    <Button>
      Remove
    </Button>
  </Flex>
}
