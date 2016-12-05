<template>
    <div class="list">
        <div class="center-page">
            <div class="title-list-pnl">
                <ul class="title-list">
                    <li v-for="item in list">
                        <span class="face"><img :src="item.author.avatar_url" alt=""/></span>
                        <span class="author">{{item.author.loginname}}</span>
                        <span class="name">{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    import $ from "jquery";
    import common from "../lib/common";


    export default {
        data() {
            return {
                list: []
            }
        },
        mounted() {

            common.ajaxGet(common.api + '/topics ')
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        this.list = data.data;
                    }
                });

        }
    }
</script>