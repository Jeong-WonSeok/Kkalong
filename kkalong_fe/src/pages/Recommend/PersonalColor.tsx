import React, { useEffect } from 'react'
import styled from 'styled-components'
import FooterBar from '../../components/ui/FooterBar'
import Personal from '../../assets/icon/Recommand/PersonalColor.png'
import Download from '../../assets/icon/Community/codiSave.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { ChangeFace } from '../../redux/modules/User'
import { useNavigate } from 'react-router-dom'

export default function PersonalColor() {
  const dispatch = useAppDispatch()
  const {User} = useAppSelector(state=>state.User)
  const navigate = useNavigate()
  useEffect(()=>{
    if (User.face_img) {navigate('Color')}
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginTop = '0'

    return () => {
      app.style.marginTop = ''
    }
  },[])

  const InputClick = () => {
    const input = document.getElementById('FileSelect') as HTMLDivElement
    input.click()
  }

  const DispatchChange = async (e:any) => {
    const formdata = new FormData
    formdata.append("img", e.target.files[0])
    await dispatch(ChangeFace(formdata))
    navigate('Color')
  }

  return (
    <Gradation>
      <MainText>퍼스널 컬러 <br/> 코디추천</MainText>
      <MainImg src={Personal}/>
      <FileUploadBtn onClick={InputClick}>
        <FileUploadImg src={Download}/>
        <FileUploadP>파일에서 선택 및 촬영</FileUploadP>
      </FileUploadBtn>
      <input id="FileSelect" type="file" style={{display: "none"}} onChange={DispatchChange}/>
      <FooterBar/>
    </Gradation>
  )
}

const Gradation = styled.div`
  background: linear-gradient(180deg, var(--primary-color-500) 0%, rgba(74, 231, 253, 0) 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MainText = styled.p`
  margin: 0;
  line-height: 35px;
  font-size: 1.4rem;
  font-family: var(--base-font-400);
  text-align: center;
`

const MainImg = styled.img`
  width: 60%;
`

const FileUploadBtn = styled.div`
  position: relative;
  border-radius: 30px;
  width: 250px;
  height: 60px;
  background-color: white;
`

const FileUploadImg = styled.img`
  position: absolute;
  top: 12.5px;
  left: 20px;
  width: 35px;
  height: 35px;
`

const FileUploadP = styled.p`
  position: absolute;
  top: 18px;
  left: 70px;
  margin: 0;
  font-family: var(--base-font-400);
  font-size: 1rem;
`