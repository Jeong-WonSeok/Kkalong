import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailHelpCodi'
import CommentInput from './CommentInput'
import CommentMessage from './CommentMessage'

export default function CommentContainer(
  {Comments, article_id, category, creator, CommentsInput, CommentsDelete, CommentsEdit} : 
  {Comments: Array<commentType>, article_id: number, category:string, creator:number, CommentsInput:(data: commentType) => void, CommentsDelete:(idx: number) => void, CommentsEdit:(idx: number, data: commentType) => void}) {
  return (
    <Container>
      {Comments && Comments.map((comment, idx) => {
        return (
          <div key={idx}>
            <CommentMessage comment={comment} category={category} creator={creator} CommentsDelete={CommentsDelete} CommentsEdit={CommentsEdit}/>
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

