<template>
    <div class="login">
        <h1>Login</h1>
        <p>Welcome Back to PokeBinder, please login with your traier email and password!!</p>
        <form action="" method="post">
            <input type="email" name="mail" placeholder="Insert your email" required>
            <input type="Password" name="passwd" placeholder="Insert your password" required>
            <button v-on:click=""></button>
        </form>

    </div>

</template>

<script>
export default{
    //name?
    //components
    //functions --> methods 
    //
}

</script>
<style>
    .login{
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: white;
    width: 50%;
}
</style>