<!--
 * @Author: your name
 * @Date: 2021-02-06 22:27:02
 * @LastEditTime: 2021-02-17 17:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\pages\profile\index.vue
-->
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{
                name: 'settings',
              }"
              v-if="profile.username === user.username"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow(profile)"
              v-else
            >
              <i class="ion-plus-round" v-if="!profile.following"></i>
              &nbsp; {{ !profile.following ? "Follow" : "Unfollow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
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
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{
                  article.createdAt | date("MMM DD,YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
              >
                <i class="ion-heart"></i>{{ article.favoritesCount }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getProfile, followUser, unFollowUser } from "@/api/user";
import { getArticles } from "@/api/article";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  data() {
    return {
      profile: {},
      articles: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  // async asyncData({ params }) {
  //   const { data } = await getProfile(params.username);

  //   const { profile } = data;
  //   return { profile };
  // },
  async mounted() {
    const { data } = await getProfile(this.$route.params.username);

    const { profile } = data;
    this.profile = profile;
    if (this.profile.username === this.user.username) {
      const { data } = await getArticles({ author: this.profile.username });
      const { articles } = data;
      this.articles = articles;
    }
  },
  methods: {
    async onFollow(profile) {
      if (profile.following) {
        const { data } = await unFollowUser(profile.username);
        this.profile = data.profile;
      } else {
        const { data } = await followUser(profile.username);
        this.profile = data.profile;
      }
    },
  },
};
</script>

<style>
</style>