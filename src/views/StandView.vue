<template>
  <v-container>
    <v-btn @click="openCreateStandDialog">
      + Stand
    </v-btn>
    <v-btn @click="openCreateTypeStandDialog">
      + Type Stand
    </v-btn>
    <v-btn @click="openCreateServiceDialog">
      + Services
    </v-btn>
    <v-data-table v-if="services.length != 0" :items="services" :headers="[
      { text: 'Service', value: 'libelle' },
      { text: 'Actions', value:'actions', align:'end'}
    ]">
      <template v-slot:[`item.actions`]="{ item }">
        <template v-if="item.serviceId">
          <v-icon small class="mr-2" @click="openUpdateService(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteService(item)">
            mdi-delete
          </v-icon>
        </template>
      </template>
    </v-data-table>
    <v-data-table v-if="stands.length != 0" :items="stands" :headers="[
      { text: 'Nom Stand', value: 'nom' },
      { text: 'Latitude', value: 'latitude' },
      { text: 'Longitude', value: 'longitude' },
      { text: 'Type Stand', value: 'typeStand' },
      { text: 'Actions', value:'actions', align:'end'}
    ]">
      <template v-slot:[`item.actions`]="{ item }">
        <template v-if="item.standId">
          <v-icon small class="mr-2" @click="editStand(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteStand(item.standId)">
            mdi-delete
          </v-icon>
        </template>
      </template>
      <template v-slot:[`item.typeStandId`]="{ item }">
        <span>{{ item.typeStandId.libelle }}</span>
      </template>


    </v-data-table>
    <v-data-table v-if="typesStands.length != 0" :items="typesStands" :headers="[
   { text: 'ID', value: 'typeStandId' },
   { text: 'Nom Type de Stand', value: 'libelle' },
   {text: 'Actions', value:'actions', align:'end'}
   ]">
      <template v-slot:[`item.actions`]="{ item }">
        <template v-if="item.typeStandId">
          <v-icon small class="mr-2" @click="editTypeStand(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteTypeStand(item.typeStandId)">
            mdi-delete
          </v-icon>
        </template>
      </template>
    </v-data-table>
    <v-dialog v-model="standDialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="standChosen.nom" label="Nom"></v-text-field>
          <v-text-field v-model="standChosen.latitude" label="Latitude"></v-text-field>
          <v-text-field v-model="standChosen.longitude" label="Longitude"></v-text-field>
          <v-select v-model="standChosen.typeStandId" :items="typesStands" label="Type Stand" item-text="libelle"
                    item-value="typeStandId"></v-select>
          <v-select v-model="serviceIdTemp" :items="services" item-text="libelle" item-value="serviceId" label="Services" multiple>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createStand">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="typeStandDialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="typeStandChosen.libelle" label="Libelle"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createTypeStand">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="serviceDialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="serviceChosen.libelle" label="Libelle"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createService">Valider</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="serviceUpdateDialog">
        <v-card>
          <v-card-text>
            <v-text-field v-model="serviceUpdate.libelle" label="Libelle"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="updateService">Valider</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
import axios from "axios";

export default {
  name: "StandView.vue",
  data() {
    return {
      standDialog: false,
      typeStandDialog: false,
      serviceDialog: false,
      serviceUpdateDialog: false,
      standChosen: {
        nom: "",
        latitude: 0,
        longitude: 0,
        typeStandId: null,
        standId: null,
      },
      serviceIdTemp: [],
      typeStandChosen: {
        libelle: "",
        typeStandId: null
      },
      serviceChosen: {
        libelle: ""
      },
      serviceUpdate: {
        libelle: ""
      },
      serviceid: -1
    }
  },
  computed: {
    ...mapState(["stands", "typesStands", "services"]),
  },
  methods: {
    async deleteStand(standId) {
      console.log(standId)
      await axios.delete("/api/stand/"+standId);
      await this.$store.dispatch("fetchStands", this.$store.state.selectedSaison.saisonId);
    },
    async editStand(item) {
      this.standChosen.nom = item.nom;
      this.standChosen.latitude = item.latitude;
      this.standChosen.longitude = item.longitude;
      this.standChosen.typeStandId = item.typeStandId;

      this.standChosen.standId = item.standId;
      this.serviceIdTemp = []
      item.services.forEach(service =>{
        this.serviceIdTemp.push(service.serviceId)
      })
      this.standDialog = true;
    },
    async createStand() {
      const data = {
        nom: this.standChosen.nom,
        latitude: this.standChosen.latitude,
        longitude: this.standChosen.longitude,
        typeStandId: this.standChosen.typeStandId,
        serviceIds: this.serviceIdTemp,
        saisonId: this.$store.state.selectedSaison.saisonId
      };
      if (this.standChosen.standId > 0) {
        await axios.put("/api/stand/" + this.standChosen.standId, data);
      } else {
        await axios.post("/api/stand/?"+this.$store.state.selectedSaison.saisonId, data);
      }
      await this.$store.dispatch("fetchStands", this.$store.state.selectedSaison.saisonId)
      this.standDialog = false;
    },
    openCreateStandDialog() {
      this.standChosen = {
        nom: "",
        latitude: 0,
        longitude: 0,
        typeStandId: null,
        standId: 0
      };
      this.serviceIdTemp = []
      this.standDialog = true;
    },
    openCreateTypeStandDialog() {
      this.typeStandChosen = {
        libelle: "",
        typeStandId: null
      };
      this.typeStandDialog = true;
    },
    openCreateServiceDialog() {
      this.serviceChosen= {
        libelle: ""
      }
      this.serviceDialog = true
    },
    openUpdateService(item) {
      this.serviceUpdateDialog = true
      this.serviceId = item.serviceId
      this.serviceUpdate.libelle = item.libelle
    },
    async deleteTypeStand(typeStandId) {
      await axios.delete("/api/typeStand/" + typeStandId);
      await this.$store.dispatch("fetchTypesStands");
    },
    async editTypeStand(item) {
      this.typeStandChosen.libelle = item.libelle;
      this.typeStandChosen.typeStandId = item.typeStandId;
      this.typeStandDialog = true;
    },
    async createTypeStand() {
      if (this.typeStandChosen.typeStandId) {
        const data = {
          libelle: this.typeStandChosen.libelle,
        };
        await axios.put("/api/typeStand/"+this.typeStandChosen.typeStandId, data);
      } else {
        const data = {
          libelle: this.typeStandChosen.libelle,
        };
        await axios.post("/api/typeStand", data);
      }
      await this.$store.dispatch("fetchTypesStands");
      this.typeStandDialog = false;
    },
    async createService() {
      await axios.post("/api/service/", this.serviceChosen);
      await this.$store.dispatch("fetchServices");
      this.serviceDialog = false;
    },
    async deleteService(item) {
      await axios.delete("/api/service/"+item.serviceId)
      await this.$store.dispatch("fetchServices");
    },
    async updateService() {
      await axios.put("/api/service/"+this.serviceId, this.serviceUpdate)
      await this.$store.dispatch("fetchServices");
      this.serviceUpdateDialog = false
    }
  },
  async created() {
    await this.$store.dispatch("fetchStands");
    await this.$store.dispatch("fetchTypesStands");
    await this.$store.dispatch("fetchServices");
  }
}
</script>



<style scoped>

</style>