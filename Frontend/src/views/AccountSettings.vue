<template>
    <div class="login-wrapper">
        <div class="login-card">
            <img src="https://img.pokemondb.net/sprites/ruby-sapphire/normal/snorlax.png" alt="Snorlax" class="logo" />
            <h1 class="title">Update Account</h1>

            <div v-if="!session.sesionIniciada">
                <p class="error">You are not logged in.</p>
                <RouterLink to="/login" class="signup-link">Go to Login</RouterLink>
            </div>

            <form v-else @submit.prevent="handleUpdate" novalidate>
                <p class="subtitle">Current Email: {{ session.usuario?.email }}</p>

                <label>
                    <span>New Email (optional)</span>
                    <input v-model="newEmail" type="email" placeholder="new@email.com" />
                </label>

                <label>
                    <span>New Password (optional)</span>
                    <input v-model="newPassword" type="password" placeholder="••••••••" minlength="6" />
                </label>

                <label>
                    <span>Confirm New Password</span>
                    <input v-model="confirmPassword" type="password" placeholder="••••••••" minlength="6" />
                </label>

                <label>
                    <span>Current Password (required)</span>
                    <input v-model="currentPassword" type="password" placeholder="••••••••" required />
                </label>

                <button type="submit" class="login-btn">Update</button>
            </form>

            <p v-if="message" :class="error ? 'error' : 'success'">{{ message }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSessionStore } from '@/stores/session';

const session = useSessionStore();

const newEmail = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const currentPassword = ref('');
const message = ref('');
const error = ref(false);

// Limpia mensajes si se cambia algún campo
watch([newEmail, newPassword, confirmPassword, currentPassword], () => {
    if (message.value) {
        message.value = '';
        error.value = false;
    }
});

async function handleUpdate() {
    if (!currentPassword.value) {
        message.value = 'You must enter your current password.';
        error.value = true;
        return;
    }

    if (newPassword.value && newPassword.value !== confirmPassword.value) {
        message.value = 'New passwords do not match.';
        error.value = true;
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/newData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                currentPassword: currentPassword.value,
                newEmail: newEmail.value,
                newPassword: newPassword.value
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to update account');
        }

        message.value = data.message || 'Account updated successfully!';
        error.value = false;
        alert(`${message.value}`);


        // Limpia campos
        newEmail.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
        currentPassword.value = '';

        await session.verificarSesion();
    } catch (err) {
        message.value = err.message;
        error.value = true;
    }
}
</script>

<style scoped>
@import "@/css/login.css";

.subtitle {
    margin-top: 10px;
    color: black;
}

.success {
    color: green;
    margin-top: 10px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
