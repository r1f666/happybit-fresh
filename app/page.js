import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <div style={{ padding: 50, textAlign: 'center', fontFamily: 'Arial' }}>
        <h1>🚀 HAPPYBIT РАБОТАЕТ!</h1>
        <p>Проект успешно задеплоен на Vercel</p>
        <p>Время: {new Date().toLocaleString()}</p>
        <div style={{ marginTop: 30, padding: 20, background: '#f0f0f0' }}>
          <h2>✅ Это точно работает!</h2>
          <p>Если видишь это - всё ок!</p>
        </div>
      </div>
  );
}
