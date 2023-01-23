<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer/>
        <v-icon class="justify-center" :color="color" x-large>{{icon}} </v-icon>
      </v-card-title>
      <v-card-text>

        <v-file-input
          ref="fileInput"
          v-model="file"
          :label="title+'.csv'"
          accept="text/csv" @change="uploadFile"
        >

        </v-file-input>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
const csv = require('jquery-csv');
export default {
  name: "ImportComponent",
  props: {
    title: String,
    value:Object
  },
  data() {
    return {
      file: null,
      valid:false,
      data:this.value,
    };
  },
  computed:{
    icon(){return this.valid?"mdi-check-circle":"mdi-close-circle"},
    color(){
      return this.valid?"green":"red"
    }
  },
  methods: {
    async uploadFile() {
      // check if a file is selected
      if (!this.file) {
        return;
      }

      try {
        // create a new FileReader
        const reader = new FileReader();

        // read the file as text
        reader.readAsText(this.file);

        // listen for the 'load' event to be emitted when the file is done reading
        reader.onload = () => {
          // parse the file content as CSV
          let txt = reader.result;
          // txt = txt.replaceAll(/"{2,}/gm, '＂')
          // txt = txt.replaceAll('"', '＂')
          // txt = txt.replaceAll(/'{2,}/gm, '＇')
          // txt = txt.replaceAll("'", '＇')
          // txt = txt.replaceAll(/^;*$/gm, '')
          // txt = txt.replaceAll(/^\n$/gm, '')
          // txt = txt.replaceAll(/;{2,}$/gm, '')
          // txt = txt.replaceAll(/^;*/gm, '')

          console.log(txt)
          this.data = csv.toObjects(txt,{separator:';'});
          console.log(Object.keys(this.data[0]))
          console.log(this.data)
          this.valid = true
          this.$emit('input', {csv:this.data, valid:this.valid})
        };
      } catch (err) {
        this.valid = false
        console.error(err);

      }
    },
  },
}
</script>

<style scoped>

</style>