import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailHelpCodi'
import CommentInput from './CommentInput'
import CommentMessage from './CommentMessage'

export default function CommentContainer({Comments} : {Comments: Array<commentType>}) {
  return (
    <Container>
      {Comments && Comments.map((comment, idx) => {
        return (
          <div key={idx}>
            <CommentMessage comment={comment}/>
          </div>
          
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

