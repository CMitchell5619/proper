<template>
  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'RentalsPage' }">
      <div class="d-flex flex-column align-items-center ">
        <h1 class="nav-text">
          Proper
        </h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"
            @click="collapseOnClick"
            v-if="state.viewportWidth <= 700"
        >
          <router-link :to="{ name: 'RentalsPage' }" class="nav-link">
            Rentals
          </router-link>
        </li>
        <li class="nav-item"
            @click="collapseOnClick"
            v-if="state.viewportWidth <= 700"
        >
          <router-link :to="{ name: 'TasksPage' }" class="nav-link">
            Maintenance
          </router-link>
        </li>
        <li class="nav-item"
            @click="collapseOnClick"
        >
          <router-link :to="{ name: 'NewRentalPage' }" class="nav-link">
            Create New Rental
          </router-link>
        </li>
        <li class="nav-item"
            @click="collapseOnClick"
        >
          <router-link :to="{name:'MessagesPage'}" class="nav-link">
            Messages
          </router-link>
        </li>
        <li class="nav-item"
            @click="collapseOnClick"
        >
          <h1 id="notification" class="d-none">
            ! {{ account.length }}
          </h1>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click.prevent="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import $ from 'jquery'

export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false,
      viewportWidth: window.innerWidth
    })
    onMounted(() => { window.addEventListener('resize', () => { state.viewportWidth = window.innerWidth }) })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.newMessageUsers),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },

      collapseOnClick() {
        $('ul').click(function() {
          $('.navbar-collapse').collapse('hide')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.nav-text{
  font-family: 'Kanit', sans-serif;
  color: #A7C4A0;
}
</style>
