<template>
<div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated" class="bg-light font-style">
        {{ user.email }}でログイン中です<br>
        <b-button v-on:click="logout">ログアウト</b-button><br>
            <div class="text-center">
                <div class="container">
                        <div class="col-sm-10 text-center mx-auto">
                            <h1>About</h1>
                            <img
                                src="~/assets/001.jpg"
                                alt="定春"
                                width="128" height="128"
                            >
                            <p>はじめまして。<br >プログラマーです。趣味は散歩。</p>
                            <div class="row row-margin-none">
                                <table class="table">
                                    <tr>
                                        <th>Name</th>
                                        <td>yamakado</td>
                                    </tr>
                                    <tr>
                                        <th>Mail</th>
                                        <td>yamakado.1454810.work@gmail.com</td>
                                    </tr>
                                </table>
                            </div>
                            <h1>skill</h1>
                            <div class="container">
                                <div class="row row-margin-none py-3">
                                        <div class="col-md-5 col-12">
                                            <p>C</p>
                                        </div>
                                        <div class="col-md-5 col-12">
                                            <p>Java</p>
                                        </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else class="text-center pa-12 bg-light">
        メール<br>
        <input type="text" v-model="email"><br>
        パスワード<br>
        <input type="password" v-model="password"><br>
        <b-button v-on:click="login">ログイン</b-button>
    </div>
</div>
</template>

<script>
import firebase from '~/plugins/firebase'
import {
    mapActions,
    mapState,
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isAuthenticated'])
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setUser(user)
        })
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    // ログインしたら飛ぶページを指定
                    // this.$router.push("/member-page")
                }).catch((error) => {
                    alert(error)
                });
        },
        logout() {
            firebase.auth().signOut()
                .then(() => {
                    this.setUser(null)
                }).catch((error) => {
                    alert(error)
                })
        }
    }
}
</script>