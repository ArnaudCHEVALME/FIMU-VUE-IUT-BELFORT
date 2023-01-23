<template>
  <v-card
      class="rounded-lg"
      max-width="fit-content"
  >
    <v-card-title>
      <h1 class="text-h4 text--primary">
        {{ news.titre }}
      </h1>

    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p class="text--primary">
        {{ news.description }}
      </p>
    </v-card-text>
    <v-card-subtitle>
      <span>
        {{ news.publishAt }}
      </span>
    </v-card-subtitle>
    <v-card-actions>
      <NewsModifier
          :propNews="news"
          @submit="updateNews"
      ></NewsModifier>
      <v-btn @click="deleteNews">
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import NewsModifier from "@/components/NewsModifier.vue";
import axios from "axios";

export default {
  components: {NewsModifier},
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  name: "CardNews",
  methods:{
    async updateNews(news) {
      await axios.put('/api/news/'+ this.news.newsId, news);
      await this.$store.dispatch('fetchNews');
    },
    async deleteNews(){
      await axios.delete('/api/news/'+this.news.newsId)
      await this.$store.dispatch('fetchNews')
    }
  }
};

</script>

<style scoped>

</style>