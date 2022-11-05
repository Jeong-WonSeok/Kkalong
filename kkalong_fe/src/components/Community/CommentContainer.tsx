import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailHelpCodi'
import CommentInput from './CommentInput'
import CommentMessage from './CommentMessage'

export default function CommentContainer({Comments, article_id, category, CommentsInput} : {Comments: Array<commentType>, article_id: number, category:string, CommentsInput:(data: commentType) => void}) {
  return (
    <Container>
      {Comments && Comments.map((comment, idx) => {
        return (
          <div key={idx}>
            <CommentMessage comment={comment} category={category}/>
          </div>
        )
      })}
      <CommentInput article_id={article_id} category={category} CommentsInput={CommentsInput}/>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 10px;
  margin-bottom: 40px;
`

