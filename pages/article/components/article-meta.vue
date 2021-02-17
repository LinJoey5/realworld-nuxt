<!--
 * @Author: your name
 * @Date: 2021-02-14 19:41:32
 * @LastEditTime: 2021-02-17 17:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\pages\article\components\article-meta.vue
-->
<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        parmas: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          parmas: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createAt | date("MMM DD, YYYY") }}</span>
    </div>
    <template v-if="article.author.username === user.username">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button
        class="btn btn-outline-danger btn-sm"
        @click="delArticle(article.slug)"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        :class="{
          active: article.author.following,
        }"
        class="btn btn-sm btn-outline-secondary"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }}
        <span class="counter">({{ "" }})</span>
      </button>
      &nbsp;&nbsp;
      <button
        :class="{
          active: article.favorited,
        }"
        class="btn btn-sm btn-outline-primary"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "@/api/article"
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async delArticle(slug) {
      await deleteArticle(slug)
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>