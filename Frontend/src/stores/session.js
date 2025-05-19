// stores/session.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const sesionIniciada = ref(false);
  const usuario = ref(null);  

  async function verificarSesion() {
    try {
      const res = await fetch('http://localhost:3000/api/perfil', {
        credentials: 'include'
      });
      const data = await res.json();

      //Mecanismos de Pinia --> Se pone a true si se ha loggeado el user --> Actualiza el estado inmediatamente.
      sesionIniciada.value = res.ok;
      usuario.value = res.ok ? data.usuario : null;
    } catch (error) {
      sesionIniciada.value = false;
      usuario.value = null;
    }
  }

  function cerrarSesion() {
    sesionIniciada.value = false;
    usuario.value = null;
  }

  return {
    sesionIniciada,
    usuario,
    verificarSesion,
    cerrarSesion
  };
});
