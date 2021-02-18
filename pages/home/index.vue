<!--
 * @Author: your name
 * @Date: 2021-02-06 22:08:25
 * @LastEditTime: 2021-02-18 22:52:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\pages\home\index.vue
-->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">slef_conduit</h1>
        <p>A practice DEMO about NuxtJs</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link active"
                  :class="{ active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <!-- <a href="" class="author">{{ article.author.username}}</a> -->
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD,YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoritDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'articleIndex',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item === page }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <!-- 标签列表 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  delFavorite,
  // getArticle
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 20;
    const { tag, tab } = query;
    // const { tab } = query
    // const { data } = await getArticle({
    //   limit: limit,
    //   offset: (page - 1) * limit,
    // });
    // const { data: tagData } = await getTags();
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    
    // 遍历设置文章点赞状态
    articles.forEach(article => {
      article.favoritDisabled = false
    })
    return {
      articles,
      articlesCount,
      limit,
      tags,
      page,
      tag,
      tab: tab || "global_feed",
    };
  },
  // 监听数据改变 nuxt特供
  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },
  methods: {
    async onFavorite(article) {
      // console.log(article)
      article.favoritDisabled = true
      if (article.favorited) {
        // 取消点赞
        await delFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoritDisabled = false
    },
  },
};
</script>

<style>
</style>