import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailBestDress'
import CommentInput from './CommentInput'
import CommentMessage from './CommentMessage'

export default function CommentContainer({Comments} : {Comments: Array<commentType>}) {
  return (
    <Container>
      {Comments && Comments.map(comment => {
        return (
          <CommentMessage comment={comment}/>
        )
      })}
      <CommentInput/>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 10px;
  margin-bottom: 40px;
`

