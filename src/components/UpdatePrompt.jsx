import { useRegisterSW } from 'virtual:pwa-register/react';
import './UpdatePrompt.css';

export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-prompt">
      <span>Nueva versión disponible</span>
      <button onClick={() => updateServiceWorker(true)}>Actualizar</button>
    </div>
  );
}
