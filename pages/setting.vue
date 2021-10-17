<template>
<form>
  <fieldset>
    <div class="whiich_saved_button">
      <label for="which_saved" v-for="(color, i) in pBankColorList" :key="i">
        <input type="radio" id="which_saved" :value="color" v-model="colors">{{ color }}
      </label>
    </div>
  </fieldset>
  <fieldset>
    <label for="target_saved">目標金額</label>
    <input type="number" id="target_saved" v-model.number="targetSaved">
  </fieldset>
  <fieldset>
    <label for="saved_name">貯金名</label>
    <input type="text" id="saved_name" v-model="savedName">
  </fieldset>
  <fieldset>
    <label for="month_repetiton">毎月</label>
    <select id="month_repetiton" v-model="monthRepetiton">
      <option :value="month" v-for="(month , i) in monthRepetitionList"  :key="i">{{ month }}</option>
    </select>日
  </fieldset>
  <fieldset>
    <label for="one_time_saved">1回の貯金額</label>
    <input type="number" id="one_time_saved" v-model.number="oneTimeSaved">
  </fieldset>
  <button @click="addData()" :disabled="disableClickButton">Click</button>
  <p>{{ colors }}</p>
</form>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  id: 'setting',
  data () {
    return {
      pBankColorList: ['pink', 'blue', 'green'],
      monthRepetitionList: [ 1, 15, 25 ],
      colors: '',
      targetSaved: 0,
      savedName: '',
      monthRepetiton: '',
      oneTimeSaved: 0,
      currentSaved: 0,
      disableClickButton: false,
    }
  },
  mounted: function() {
    this.DBArrayLength()
  },
  methods: {
    addData() {
      let Ref = firebase.database().ref()
      let data = {
        'colors': this.colors,
        'targetSaved': this.targetSaved,
        'savedName': this.savedName,
        'monthRepetiton': this.monthRepetiton,
        'oneTimeSaved': this.oneTimeSaved,
        'currentSaved': this.currentSaved
      }
      Ref.push( data ).then(response => {
          console.log(response)
      })
    },
    DBArrayLength() {
      let Ref = firebase.database().ref()
      let self = this
      Ref.on('value', function(snapshot){
        const recentData = snapshot.val()
        const len = Object.keys(recentData).length
        console.log('len:', len)
        console.log('lenOver:', len > 3 ? false : true )
        if (len >= 3) {
          console.log('set true !!')
          self.disableClickButton = true
        } else {
          self.disableClickButton = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
input {
  width: 600px; /*親要素いっぱい広げる*/
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 1px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
form {
  .button {
    width:25px;
    height: 40px;
  }
}
</style>
