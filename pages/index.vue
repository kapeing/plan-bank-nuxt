<template>
  <main>
    <ul class="bank_area">
      <li :class="[item.colors]" v-for="(item, key) in fbData" :key="key">
        <span class="graph" :style="{ height: heights[key] }"></span>
        <div class="bank_box">
          <span class="curent_saved">{{ item.currentSaved }}</span>
          <span>/{{ item.targetSaved }}</span>
          <span>P-BANK</span>
        </div> 
        <p style="color: #fff;">
          <input v-if="edit" type="text" v-model="item.savedName"> <span :click="edit = true">{{ item.savedName }}</span> のために
          毎月 {{ item.monthRepetiton }}日に
          {{ item.oneTimeSaved }}円ずつ貯金！！
        </p>
      </li>
    </ul>
    <div class="withdrawal">
      <ul class="which_bank">
        <li>bank01</li>
        <li>bank02</li>
        <li>bank03</li>
      </ul>
      <input type="text" placeholder="出金" />
    </div>
    <div>直近の履歴（10件くらい）</div>
  </main>
</template>

<script>
import firebase from '@/plugins/firebase'
const TARGET_SAVED_HEIGHT = 250;

export default {
  name: "Top",
  data: function() {
    return {
      heights: [],
      savedName: "",
      fbData: [],
      len: 0,
      edit: false
    };
  },
  mounted: function() {
    this.fetchData()
    let height = "";
    for (let i = 0; i < this.len; i++) {
      height = this.graphHeight(
        this.currentSaved,
        this.targetSaved
      );
      this.heights.push(height);
    }
    this.currentSavedDay ()
  },
  methods: {
    graphHeight(currentSaved, targetSaved) {
      return (currentSaved * TARGET_SAVED_HEIGHT) / targetSaved + "px";
    },
    fetchData () {
      let Ref = firebase.database().ref()
      let self = this
      Ref.on('value', function(snapshot){
        self.len = Object.keys(snapshot.val()).length
        for (var x in snapshot.val()) {
          self.fbData.push(snapshot.val()[x])
        }
        console.log("self.fbData:", self.fbData)
      })
    },
    currentSavedDay () {
      var today = new Date
      var day = today.getDate()
      for (let i = 0; i < this.len; i++) {
        var bankData = this.fbData[i]
        if (bankData.monthRepetiton === 15){
          bankData.currentSaved += bankData.oneTimeSaved

}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  height: 100%;
  body {
    height: 100%;
  }
}
li{list-style: none;}
section {
  height: 100%;
  background: #fafafa;
  width: 1080px;
  margin: 0 auto;
}
.bank_area {
  width: 800px;
  height: 330px;
  margin: 0 auto;
  padding-top: 20px;
  border-radius: 50px;
  background-color: #00552e;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  display: flex;
  justify-content: space-around;
  li {
    position: relative;
    width: calc(180px + 10px);
    height: calc(250px + 10px);
    margin: 0 auto;
    .bank_box {
      width: 100%;
      height: 100%;
      z-index: 3;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      background: rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      display: block;
      margin: 0 auto;
      color: #fff;
      text-align: center;
      .curent_saved {
        margin-top: 30px;
        font-size: 28px;
        font-weight: bold;
        color: transparent;
        background: #fff;
        -webkit-background-clip: text;
      }
      span {
        display: block;
      }
    }
    .graph {
      width: 180px;
      display: block;
      position: absolute;
      bottom: 5px;
      left: 5px;
      z-index: 2;
    }
  }
  .pink .graph {
    background-color: #fce043;
    background-image: linear-gradient(315deg, #fce043 0%, #fb7ba2 74%);
    height: 200px;
  }
  .blue .graph {
    background-color: #abe9cd;
    background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);
    height: 50px;
  }
  .green .graph {
    background-color: #f2cf07;
    background-image: linear-gradient(315deg, #f2cf07 0%, #55d284 74%);
    height: 140px;
  }
}
.withdrawal {
  width: 600px;
  margin: 0 auto;
  .which_bank {
    display: flex;
    li {
      margin: 10px;
      padding: 0 8px 0;
      line-height: 28px;
      height: 28px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 15px;
    }
  }
  input {
    width: 600px; /*親要素いっぱい広げる*/
    padding: 10px 15px; /*ボックスを大きくする*/
    font-size: 16px;
    border-radius: 3px; /*ボックス角の丸み*/
    border: 1px solid #ddd; /*枠線*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
  }
}
</style>
