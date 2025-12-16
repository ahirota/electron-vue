<script setup lang="ts">

const closeWindow = () => window.electron.sendFrameAction('CLOSE');
const minimizeWindow = () => window.electron.sendFrameAction('MINIMIZE');
const maximizeWindow = () => window.electron.sendFrameAction('MAXIMIZE');

</script>

<template>
    <div id="header-wrap">
        <header>
            <button id="minimize" @click="minimizeWindow"></button>
            <button id="maximize" @click="maximizeWindow"></button>
            <button id="close" @click="closeWindow"></button>
        </header>
    </div> 
</template>

<style lang="scss" scoped>
#header-wrap {
    width: 100%;
    text-align: right;
    padding: 0.5rem;
    box-sizing: border-box;
    background-color: #181818;
    -webkit-app-region: drag;

    header {
        button {
            all: unset;
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            margin: 0.25rem;
            -webkit-app-region: no-drag;

            &#minimize {
                background-color: yellow;
            }

            &#maximize {
                background-color: lime;
            }

            &#close {
                background-color: red;
            }
        }
    }
}
</style>
