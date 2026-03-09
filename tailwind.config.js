/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 안의 모든 파일을 감시하겠다는 뜻
  ],
  theme: {
    extend: {
      // 나중에 회사 로고 색상 등을 여기에 추가할 수 있습니다.
    },
  },
  plugins: [],
}