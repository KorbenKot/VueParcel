<template>
    <div class="main">
        <h1 class="title">Hello World</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aperiam at doloremque, ea eos fugit id
            maiores necessitatibus obcaecati officiis quasi similique sunt suscipit ullam ut vero voluptatem
            voluptatibus!</p>
        <br>
        <hr>
        <br>
        <h2 class="title title_second">{{ name }}</h2>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
        return {
            name: 'test Application'
        };
    },
};
</script>

<style>
    p {
        font-size: 18px;
        color: #999;
    }

    .title {
        color: #ff6f80;
        font-size: 50px;
    }

    .title_second {
        color: firebrick;
    }
</style>