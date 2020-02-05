<template>
    <div>
        <h1>MAIN APP HEAD</h1>
        <router-link :to="{ name: 'Home' }">
            Home
        </router-link>
        |
        <router-link :to="{ name: 'News' }">
            About
        </router-link>
        |
        <router-link :to="{ name: 'About' }">
            About
        </router-link>
        |
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'MainLayout',
};
</script>

<style>
h1 {
    margin: 20px;

    @media (--desktop) {
        margin: 30px;
    }
}
</style>
