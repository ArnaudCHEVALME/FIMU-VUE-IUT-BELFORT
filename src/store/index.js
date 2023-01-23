import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LoginView from "@/views/LoginView.vue";
import NewsView from "@/views/NewsView.vue";
import NavBar from "@/components/NavBar.vue";
import SaisonPage from "@/views/SaisonView.vue";
import StatsView from "@/views/StatsView.vue";
import SceneView from "@/views/SceneView.vue";
import TypeLiens from "@/views/TypeLiens.vue";
import GenreView from "@/views/GenreView.vue";
import StandView from "@/views/StandView.vue";
import ConcertView from "@/views/ConcertView.vue";
import UserView from "@/views/UserView.vue";
import ArtistesView from "@/views/ArtistesView.vue";
import authHeader from '../services/auth-header';
import {auth} from './auth.module';
import ImportView from "@/views/ImportView.vue";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers.set(authHeader());
    return config;
});

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem("user"),
        roles: [],
        artistes: [],
        artistesDetails: [],
        selectedSaison: null,
        saisons: [],
        genres: [],
        genresTotal: [],
        sousGenres: [],
        sousGenresTotal: [],
        news: [],
        pays: [],
        categoriesLiens: [],
        scenes: [],
        stands: [],
        typesStands: [],
        concerts: [],
        users: [],
        services: [],
        routes: [
            {
                path: '/',
                name: 'Login',
                components: {
                    default: LoginView,
                    menu: null
                }
            },
            {
                path: '/news',
                name: 'News',
                icon: 'mdi-newspaper',
                components: {
                    default: NewsView,
                    menu: NavBar
                }
            },
            {
                path: '/saisons',
                name: 'Saisons',
                icon: 'mdi-flower-tulip',
                components: {
                    default: SaisonPage,
                    menu: NavBar
                }
            },
            {
                path: '/stats',
                name: 'Stats',
                icon: 'mdi-chart-bar',
                components: {
                    default: StatsView,
                    menu: NavBar
                }
            },
            {
                path: '/scenes',
                name: 'Scenes',
                icon: 'mdi-speaker',
                components: {
                    default: SceneView,
                    menu: NavBar
                }
            },
            {
                path: '/liens',
                name: 'Liens',
                icon: 'mdi-link-variant',
                components: {
                    default: TypeLiens,
                    menu: NavBar
                }
            },
            {
                path: '/genres',
                name: 'Genres',
                icon: 'mdi-music-note',
                components: {
                    default: GenreView,
                    menu: NavBar
                }
            },
            {
                path: '/stands',
                name: 'Stands',
                icon: 'mdi-hamburger',
                components: {
                    default: StandView,
                    menu: NavBar
                }
            },
            {
                path: '/concerts',
                name: 'Concerts',
                icon: 'mdi-album',
                components: {
                    default: ConcertView,
                    menu: NavBar
                },
            },
            {
                path: '/users',
                name: 'Users',
                icon: 'mdi-account',
                components: {
                    default: UserView,
                    menu: NavBar
                },
            },
            {
                path: '/artistes',
                name: 'Artistes',
                icon: 'mdi-microphone-variant',
                components: {
                    default: ArtistesView,
                    menu: NavBar
                }
            },
            {
                path: '/import',
                name: 'Import',
                icon: 'mdi-microsoft-excel',
                components: {
                    default: ImportView,
                    menu: NavBar
                }
            }
        ]
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        }
    },
    mutations: {
        [LOGIN](state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS](state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        },
        setRoles(state, roles) {
            state.roles = roles
        },
        setServices(state, services) {
            state.services = services
        },
        setScenes(state, scenes) {
            state.scenes = scenes
        },
        setCategoriesLiens(state, categoriesLiens) {
            state.categoriesLiens = categoriesLiens
        },
        setSelectedSaison(state, saison) {
            state.selectedSaison = saison
        },
        setSaisons(state, saisons) {
            state.saisons = saisons
            console.log(state.saisons)
        },
        setGenres(state, genres) {
            state.genres = genres
        },
        setGenresTotal(state, genres) {
            state.genresTotal = genres
        },
        setSousGenres(state, sousGenres) {
            state.sousGenres = sousGenres
        },
        setSousGenresTotal(state, sousGenres) {
            state.sousGenresTotal = sousGenres
        },
        setNews(state, news) {
            state.news = news
        },
        setPays(state, pays) {
            state.pays = pays
        },
        setArtists(state, artistes) {
            state.artistes = artistes
        },
        setArtistesDetails(state, artiste) {
            state.artistesDetails = artiste
        },
        setStands(state, stands) {
            state.stands = stands
        },
        setTypesStands(state, typesStands) {
            state.typesStands = typesStands
        },
        setConcerts(state, concerts) {
            state.concerts = concerts
        },
        setUsers(state, users) {
            state.users = users
        },
    },
    actions: {
        async fetchRoles({commit}) {
            try {
                const roles = await axios.get("/api/roles/")
                commit("setRoles", roles.data.data)
            } catch (e) {
                console.error(e)
            }
        },
        async fetchServices({commit}) {
            try {
                const services = await axios.get('/api/service/')
                commit('setServices', services.data)
            } catch (e) {
                console.error(e)
            }
        },
        async fetchScenes({commit}) {
            try {
                const scenes = await axios.get('/api/scene/')
                commit('setScenes', scenes.data)
            } catch (e) {
                console.error(e)
            }
        },
        async fetchSaisons({commit}) {
            try {
                const saisons = await axios.get('/api/saisons/')
                commit('setSaisons', saisons.data.data)
                let s = saisons.data.data.sort((s0, s1) => new Date(s0.dateSaison) < new Date(s1.dateSaison))[0]
                commit('setSelectedSaison', s)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchGenres({commit}) {
            try {
                const response = await axios.get('/api/genres/')
                commit('setGenres', response.data)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchSousGenres({commit}) {
            try {
                const response = await axios.get('/api/sousGenre/')
                commit('setSousGenres', response.data)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchCategoriesLiens({commit}) {
            try {
                const response = await axios.get('/api/categoriesReseaux/')
                commit('setCategoriesLiens', response.data.data)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchPays({commit}) {
            try {
                const pays = await axios.get('/api/pays/')
                commit('setPays', pays.data)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchNews({commit}) {
            try {
                const news = await axios.get('/api/news/')
                commit('setNews', news.data)
            } catch (err) {
                console.error(err)
            }
        },
        async fetchArtists({commit}) {
            try {
                const news = await axios.get("/api/artistes/")
                commit('setArtists', news.data.data)
            } catch (err) {
                console.error(err)
            }
        },
        async fetchArtistsDetails({commit}, artisteId) {
            let adetail = await axios.get("/api/artistes/" + artisteId)
            commit('setArtistesDetails', adetail.data.data)
        },
        async fetchStands({commit}) {
            try {
                const stands = await axios.get("/api/stand/")
                commit('setStands', stands.data)
            } catch (err) {
                console.error(err)
            }
        },
        async fetchTypesStands({commit}) {
            try {
                const typesStands = await axios.get("/api/typeStand/")
                commit('setTypesStands', typesStands.data)
            } catch (err) {
                console.error(err)
            }
        },
        async fetchConcerts({commit}) {
            try {
                const concerts = (await axios.get("/api/concerts/")).data.data
                concerts.forEach(c => {
                    Object.entries(c.artiste).forEach(e => {
                        c[e[0]] = e[1]
                    })
                    delete (c.artiste)
                    Object.entries(c.scene).forEach(s => {
                        c[s[0]] = s[1]
                    })
                    delete (c.scene)
                })
                commit('setConcerts', concerts)
            } catch (err) {
                console.error(err)
            }
        },
        async fetchUsers({commit}) {
            try {
                const users = await axios.get("/api/users/")
                commit('setUsers', users.data)
            } catch (err) {
                console.error(err)
            }
        },
        async loadEveryThing({dispatch}) {
            dispatch("fetchGenres")
            dispatch("fetchSousGenres")
            dispatch("fetchNews")
            dispatch("fetchPays")
            dispatch("fetchArtists")
            dispatch("fetchCategoriesLiens")
            dispatch("fetchScenes")
            dispatch("fetchStands")
            dispatch("fetchTypesStands")
            dispatch("fetchConcerts")
            dispatch("fetchServices")
            dispatch("fetchUsers")
            dispatch("fetchRoles")
        },
    },
    modules: {
        auth
    }
})
