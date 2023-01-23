<template>
  <v-container class="pa-10">
    <div>
      <CreateNews
          @CreateNews="Create"
          :news="news_null"
      >
      </CreateNews>
    </div>
    <div class="justify-start d-flex flex-column mb-10 ml-10 mr-10 mt-4">
      <v-row>
        <v-col cols="4" v-for="n in news" :key="n.newsId" style="width: 100%">
          <CardNews
              :news="n"
              style="width: 90%"
              class="m-4 p-4"
          >
          </CardNews>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import CardNews from "@/components/CardNews.vue";
import {mapState} from "vuex";
import CreateNews from "@/components/CreateNews.vue";
import axios from "axios";


export default {
  name: "NewsView",
  components: {CreateNews, CardNews},
  data: () => {
    return {
      dialog: false,
      news_null: {
        titre: null,
        description: null,
        publishAt: null,
      }
    }
  },
  computed: {
    ...mapState(["news"])
  },
  methods: {
    async Create(news_null) {
      // let saisonId = this.$store.state.selectedSaison.saisonId;
      // news_null.saisonId = saisonId;
      // let d = new Date(news_null.publishAt)
      // news_null.dateSaison = d.toISOString().split('T')[0]
      await axios.post('/api/news/',  news_null);
      await this.$store.dispatch('fetchNews');
    }
  }
}

</script>

<style scoped>

</style>