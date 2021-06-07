<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/" :name="$t('Administrar Conta')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/" :name="$t('Materiais')" icon="tim-icons icon-app"/>
        <ul>
          <li><sidebar-link to="/material/newproduct" :name="$t('Novo Produto')" icon="tim-icons icon-simple-add"/></li>
          <li><sidebar-link to="/material/classification" :name="$t('Classificação')" icon="tim-icons icon-bullet-list-67"/></li>
          <li><sidebar-link to="/material/manage" :name="$t('Manutenção')" icon="tim-icons icon-settings-gear-63"/></li>
          <li><sidebar-link to="/" :name="$t('Análise')" icon="tim-icons icon-chart-bar-32"/></li>
          <li><sidebar-link to="/" :name="$t('Aquisições')" icon="tim-icons icon-coins"/></li>
        </ul>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
