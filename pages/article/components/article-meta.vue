<!--
 * @Author: your name
 * @Date: 2021-02-14 19:41:32
 * @LastEditTime: 2021-02-14 19:55:03
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
    <button
      :class="{
        active: article.author.following,
      }"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{article.author.username}} <span class="counter">({{''}})</span>
    </button>
    &nbsp;&nbsp;
    <button
      :class="{
        active: article.favorited,
      }"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>