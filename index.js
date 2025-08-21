const express = require('express');
const app = express();

const PORT = 8080;
const KAKAO_REST_API_KEY = '87d172e8dd968f9acebab19645131f66';
const KAKAO_REDIRECT_URI = 'http://192.168.35.85:8080/login/oauth2/code/kakao';

// 1. 카카오 로그인 시작 → 카카오 인증 서버로 리다이렉트
app.get('/oauth2/authorization/kakao', (req, res) => {
  const state = 'demo_state';
  const url =
    'https://kauth.kakao.com/oauth/authorize' +
    `?response_type=code` +
    `&client_id=${KAKAO_REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    `&state=${encodeURIComponent(state)}`;

  return res.redirect(url);
});

// 2. 카카오 인증 완료 후 redirect 콜백 처리 → 플러터(kakao://)로 code/state 전달
app.get('/login/oauth2/code/kakao', (req, res) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    return res.redirect(
      `kakao://login-callback?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(error_description)}`
    );
  }

  return res.redirect(
    `kakao://login-callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://192.168.35.85:${PORT}`);
  console.log(`Start login: http://192.168.35.85:${PORT}/oauth2/authorization/kakao`);
});
