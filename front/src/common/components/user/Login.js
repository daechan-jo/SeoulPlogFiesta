import styles from './user.module.scss';
import React, { useState, useContext } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../../api';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
  // const dispatch = useContext(DispatchContext);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const data = {
    email,
    password,
    nickname: 'mynickname',
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    Api.post('auth/login', data)
      .then((res) => {
        const token = res.data.token;
        sessionStorage.setItem('userToken', token);
        dispatch(login(res.data.data));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const findPassword = () => {
    navigate('/setpassword');
  };
  // 뒤로가기 버튼 함수
  const goBack = () => {
    navigate(-1);
  };

  // //카카오톡 로그인을 위한 변수들
  const REST_API_KEY = '백엔드한테 달라하자1';
  const REDIRECT_URI = '백엔드한테 달라하자2';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 카카오톡 로그인을 위한 loginHandler
  const kakaoLoginHandler = () => {
    window.location.href = link;
  };

  return (
    <form className={styles.container}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
      <label>아이디</label>
      <input
        className="id"
        type="email"
        placeholder="user@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isEmailValid && (
        <div className={styles['error-message']}>
          유효한 이메일 주소를 입력하세요.
        </div>
      )}

      <label>비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isPasswordValid && (
        <div className={styles['error-message']}>
          비밀번호는 4글자 이상이어야 합니다.
        </div>
      )}
      {/* <div className={styles.buttonContainer}> */}
      <button
        className={styles.localLogin}
        type="submit"
        onSubmit={handleSubmit}
      >
        로그인{' '}
      </button>
      <button className={styles.localLogin} onClick={findPassword}>
        비밀번호 찾기
      </button>
      <button className={styles.kakaoLogin} onClick={kakaoLoginHandler}>
        카카오 로그인
      </button>
      {/* </div> */}
    </form>
  );
};

export default Login;
