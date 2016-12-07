<template>
    <div class="list">
        <div class="header">
            <ul class="tab">
                <li v-for="type in types" @click="onTabSelect(type.value)" :key="type.value">{{type.text}}</li>
            </ul>
        </div>
        <div class="main center-page">
            <div class="title-list-pnl">
                <ul class="title-list">
                    <li v-for="(item, i) in list" :key="item.id">
                        <span class="index" :title="i + 1">{{(i + 1) > 9999 ? "..." : (i + 1)}}</span>
                        <span class="face">
                            <img :src="item.author.avatar_url" alt="" :title="item.author.loginname"/>
                        </span>
                        <span :class="{type: item.tab, hot: item.good}" v-if="item.tab">{{item.tab | tab}}</span>
                        <span class="name" :title="item.title">{{item.title}}</span>
                    </li>
                </ul>
                <div class="load-more" @click="next">
                    <span class="prev" v-show="page != 1">上一页</span>
                    <span class="next">下一页</span>
                </div>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    import $ from "jquery";
    import common from "../lib/common";
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                list: [],
                types: [],
                tab: "",
                page: 1
            }
        },
        computed: {
            isPhone() {
                console.log(common.isPhone());
                return common.isPhone();
            }
        },
        mounted() {
            this.page = parseInt(this.$route.query.page) || 1;
            this.tab = this.$route.query.tab;
            this.getData();
            this.types = [{
                text: "全部",
                value: ""
            }, {
                text: "精华",
                value: "good"
            }, {
                text: "分享",
                value: "share"
            }, {
                text: "招聘",
                value: "job"
            }, {
                text: "回答",
                value: "ask"
            }];
        },
        methods: {
            getData() {
                Indicator.open();
                common.ajaxGet(common.api + '/topics', {
                    page: this.page,
                    tab: this.tab
                }).then(data => {
                    if (data.success) {
                        this.list = data.data;
                        $(".list").animate({
                            scrollTop: 0
                        }, 200);
                    }
                    Indicator.close();
                });
            },
            next() {
                this.page++;
                let query = {
                    page: this.page
                }
                if (this.tab) {
                    query.tab = this.tab;
                }
                this.$router.push({
                    path: 'list',
                    query: query
                })
            },
            onTabSelect(value) {
                this.tab = value;
                let query = {
                    page: this.page
                }
                if (this.tab) {
                    query.tab = this.tab;
                }
                this.$router.push({
                    path: 'list',
                    query: query
                })
                this.getData();
            }
        },
        watch: {
            $route() {
                this.page = this.$route.query.page || 1;
                this.tab = this.$route.query.tab;
                this.getData();
            }
        },
        filters: {
            tab(value) {
                return common.getType(value);
            }
        }
    }
</script>