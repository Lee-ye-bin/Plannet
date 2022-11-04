import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../Utill/Nav";
import Api from "../api/plannetApi";
import Modal from "../Utill/Modal";

const Wrap = styled.div`
    width: 1130px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
`;
const Section = styled.div`
    width: 850px;
    height: calc(100vh - 40px);
    float: left;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 20px;
        padding: 15px;
    }
    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #ddd; /* 스크롤바의 색상 */
        border-radius: 10px;
        border: 7px solid transparent;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
        background: none;
        /*스크롤바 뒷 배경 색상*/
    }
    div{
        width: 100%;
        padding: 10px 30px;
    }
    h2{
      font-size: 28px;
      font-weight: 900;
      margin-top: 35px;
      margin-bottom: 10px;
    }

    .btnbox{
        height: 90px;
        line-height: 70px;
        position: relative;
        height: 50px;
        button.save{
            font-weight: 600;
            display: block;
            position: absolute;
            top: 0;
            right: 30px;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #333;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover{
                background-color: #666;
            }
            &:disabled{
                background-color: #aaa;
                color: #eee;
                cursor: default;
            }
        }        
    }
    .setting{
        .userInfo{
            display:flex ;
            justify-content:center;
            align-items: center;
            flex-direction: column;
            .session{
                width: 410px;
                padding: 5px 30px;
                margin-top: 0;
                p{
                    font-size: 18px;
                    font-weight: 600; 
                    line-height: 18px;
                    margin-bottom: 4px;
                    span{
                        color: #666;
                        font-weight: 400;
                        float: right;
                        margin-left: 10px;
                        line-height: 20px;
                    }
                }
                input, textarea{
                    padding: 0 15px;
                    border-radius: 5px;
                    width: 350px;
                    height: 30px;
                    color: #333;
                    background: #e8f0fe;
                    border: none;
                    font-weight: 500;
                    outline: none;
                    &:focus{
                        background-color: #b8b9f1;
                        color: #222;
                    }
                    &:focus::placeholder{
                        color: #888;
                    }
                    &::placeholder{
                        color: #bbb;
                    }
                }
                textarea{
                    padding: 10px 15px;
                    height: 100px;
                    resize: none;
                    overflow-y: scroll;
                    &::-webkit-scrollbar {
                        width: 20px;
                        padding: 15px;
                    }
                    &::-webkit-scrollbar-thumb {
                        height: 30%; /* 스크롤바의 길이 */
                        background: #ddd; /* 스크롤바의 색상 */
                        border-radius: 10px;
                        border: 7px solid transparent;
                        background-clip: padding-box;
                    }
                    &::-webkit-scrollbar-track {
                        background: none;
                        /*스크롤바 뒷 배경 색상*/
                    }
                }
            }
        }
        .userImgBox{
            width: 180px;
            height: 180px;
            aspect-ratio: auto 1 / 1;
            border-radius: 100%;
            overflow: hidden;;
            background-size: cover;
            margin: 0 auto;
            position: relative;
            input{display:none;}
            div{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background-color: rgba(0, 0, 0, .15);
                cursor: pointer;
                text-align: center;
                i{
                    font-size: 50px;
                    line-height: 160px;
                    color: rgba(255, 255, 255, .6);
                }
            }
        }
    }
    .withdrawal{
        cursor: pointer;
        text-align: left;
        text-decoration: underline;
        color: #ccc;
    }
    
`;


const Setting = () => {
    const userId = window.localStorage.getItem("userId");
    const [userSrc, setUserSrc] = useState("https://images.unsplash.com/photo-1666473574427-253b43283677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
    const useImg = {backgroundImage: "url(" + userSrc + ")"};
    const [userNickname, setUserNickname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userSNS, setUserSNS] = useState("");
    const [userPro, setUserPro] = useState("");

    const [changeEmail, setChangeEmail] = useState("");
    const [changePhone, setChangePhone] = useState("");
    
    const [emailMessage, setEmailMessage] = useState("");
    const [telMessage, setTelMessage] = useState("");

    useEffect(() => {
        const userInfoLoad = async() => {
            try{
                const response = await Api.userInfoLoad(userId);
                setUserNickname(response.data[0].nickname);
                setChangeEmail(response.data[0].email);
                setUserEmail(response.data[0].email);
                setChangePhone(response.data[0].phone);
                setUserPhone(response.data[0].phone);
                setUserSNS(response.data[0].sns);
                setUserPro(response.data[0].profile);
            } catch(e){
                console.log(e);
            }
        }
        userInfoLoad();
    },[userId]);

    const onClickSave = async() => {
        await Api.userInfoSave(userId, userNickname, userEmail, userPhone, userSNS, userPro);
        window.location.assign("/home");
    }

    const onChangeNickname = (e) => {
        setUserNickname(e.target.value);
    }
    const onChangePhone = (e) => {
        setChangePhone(e.target.value);
    }
    const onChangeSNS = (e) => {
        setUserSNS(e.target.value);
    }
    const onChangePro = (e) => {
        setUserPro(e.target.value);
    }


    //회원탈퇴 팝업
    const [comment, setCommnet] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };
    const onClickWithdraw = () => {
        setModalOpen(true);
        setCommnet("탈퇴 하시겠습니까?");
    }

    const [isEmail, setIsEmail] = useState(true);
    const [isTel, setIsTel] = useState(true);


    // 전화번호/이메일 중복확인
    const onBlurTelCheck = async() => {
        const memberCheck = await Api.memberRegCheck(changePhone, "TYPE_TEL");
        if (memberCheck.data.result === "OK" ) {
            console.log(memberCheck.data.result);
            setTelMessage("사용가능한 전화번호입니다.");
            setIsTel(true)
        } else if(memberCheck.data.result === "NOK" && userPhone ===  changePhone){
            setTelMessage("기존 전화번호입니다.");
            setIsTel(true);
        } else {
            setTelMessage("중복된 전화번호입니다.");
            setIsTel(false)
        } 
    }

    const onChangeEmail = (e) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const emailCurrent = e.target.value ;
        setChangeEmail(emailCurrent);
            if(!emailRegex.test(emailCurrent)){
                setEmailMessage('이메일의 형식이 올바르지 않습니다.')
                setIsEmail(false);
            } else {
                setEmailMessage('이메일의 형식이 올바르게 입력되었습니다.')
                setIsEmail(true);
            }
    }

    const onBlurEmailCheck = async() => {
        // 가입 여부 우선 확인
        const memberCheck = await Api.memberRegCheck(changeEmail, "TYPE_EMAIL");
        if (memberCheck.data.result === "OK" && isEmail) {
            setEmailMessage("사용가능한 Email입니다.");
            setIsEmail(true);
        } else if(memberCheck.data.result === "OK" && !isEmail){
            setEmailMessage("이메일의 형식이 올바르지 않습니다.");
            setIsEmail(false);
        } else if(memberCheck.data.result === "NOK" && userEmail ===  changeEmail){
            setEmailMessage("기존 Email입니다.");
            setIsEmail(true);
        } else {
            setEmailMessage("이미 사용하고 있는 Email입니다.");
            setIsEmail(false);
        } 
    }


    
    return (
        <Wrap>
            <Nav />
            <Section>
                <div className="setting">
                    <h2>Setting</h2>
                    <div className="userImgBox" style={useImg}>
                        <label>
                            <input type="file" accept="image/*"/>
                            <div><i class="bi bi-pencil-fill"></i></div>
                        </label>
                    </div>
                    <div className="userInfo">
                        <div className="session">
                            <p>닉네임</p>
                            <input onChange={onChangeNickname} value={userNickname} placeholder="닉네임"/>
                        </div>
                        <div className="session">
                            <p>이메일 {changeEmail && <span>{emailMessage}</span>}</p>
                            <input onChange={onChangeEmail} value={changeEmail} onBlur={onBlurEmailCheck} placeholder="이메일"/>
                        </div>
                        <div className="session">
                            <p>전화번호 {changePhone && <span>{telMessage}</span>}</p>
                            <input onChange={onChangePhone} onBlur={onBlurTelCheck} value={changePhone} placeholder="전화번호"/>
                        </div>
                        <div className="session">
                            <p>SNS</p>
                            <input onChange={onChangeSNS} value={userSNS} placeholder="SNS"/>
                        </div>
                        <div className="session">
                            <p>자기소개글</p>
                            <textarea onChange={onChangePro} value={userPro} placeholder="자기소개글" maxlength="100" />
                        </div>
                        <span className="withdrawal" onClick={onClickWithdraw}>회원탈퇴</span>
                        <Modal open={modalOpen} close={closeModal} header="탈퇴">{comment}</Modal>
                    </div>
                </div>
                <div className="btnbox">
                    <button onClick={onClickSave} className="save" disabled={!(isEmail && isTel)}>SAVE</button>
                </div>
            </Section>
            <div className="copy">&#169; Plannet.</div>
        </Wrap>
    );
}
export default Setting;