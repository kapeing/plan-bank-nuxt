<template>
  <div>
    <nav>
      <ul role="list">
        <li><nuxt-link to="/">つもり貯金</nuxt-link></li>
        <li><nuxt-link to="/setting">貯金箱設定</nuxt-link></li>
        <li><nuxt-link to="/history">履歴</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
nav {
  ul {
    display: flex;
    justify-content: space-around;
    padding: 10px 0 10px;
  }
}
</style>