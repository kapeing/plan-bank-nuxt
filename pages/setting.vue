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
    <input type="number" id="target_saved" v-model="targetSaved">
  </fieldset>
  <fieldset>
    <label for="saved_name">貯金名</label>
    <input type="text" id="saved_name" v-model="savedName">
  </fieldset>
  <fieldset>
    <label for="unit_repetition">繰り返しの単位</label>
    <select id="unit_repetition" v-model="unitRepetition">
      <option :value="unit" v-for="(unit , i) in unitRepetitionList"  :key="i">{{ unit }}</option>
    </select>
    <div class="week_repetiton" v-if="unitRepetition === unitRepetitionList[1]">
      <label for="week_repetition" v-for="(weekday, i) in weekdayList"  :key="i">
        <input type="radio" id="week_repetiton" :value="weekday" v-model="weekdays">{{ weekday }}曜日
      </label>
    </div>
    <template v-else-if="unitRepetition === unitRepetitionList[2]">
      <div class="kind_repetition">
        <label for="month_repetition" v-for="(month, i) in  monthRepetitionList" :key="i">
          <input type="radio" id="month_repetiton" :value="month" v-model="monthRepetiton">{{ month }}
        </label>
      </div>
      <select id="what_day" v-if="monthRepetiton === monthRepetitionList[0]">
        <option :value="i" v-for="i in 31" :key="i">{{ i }}</option>
      </select>
      <template v-else>
        <select id="what_week">
          <option :value="i" v-for="i in 5" :key="i">第{{ i }}週</option>
        </select>
        <select id="what_day_week">
          <option :value="weekEn" v-for="(weekJp, weekEn, key) in weekdayList" :key="key">{{ weekJp }}曜日</option>
        </select>
      </template>
    </template>
  </fieldset>
  <fieldset>
    <label for="one_time_saved">1回の貯金額</label>
    <input type="number" id="one_time_saved" v-model="oneTimeSaved">
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
      unitRepetitionList: [ '毎日', '毎週', '毎月' ],
      weekdayList: [ '日', '月', '火', '水', '木', '金', '土' ],
      pBankColorList: ['pink', 'blue', 'green'],
      monthRepetitionList: [ '日', '曜日' ],
      colors: '',
      weekdays: '',
      targetSaved: 0,
      savedName: '',
      unitRepetition: '',
      monthRepetiton: '',
      oneTimeSaved: 0,
      json_data: {},
      disableClickButton: false,
    }
  },
  mounted: function() {
    this.DBArrayLength()
  },
  // computed: {
  //   disableClickButton() {
  //     let result = this.DBArrayLength()
  //     console.log('result:', result)
  //     return result
  //   },
  // },
  methods: {
    addData() {
      let Ref = firebase.database().ref()
      let data = {
        'colors': this.colors,
        'weekdays': this.weekdays,
        'targetSaved': this.targetSaved,
        'savedName': this.savedName,
        'unitRepetition': this.unitRepetition,
        'monthRepetiton': this.monthRepetiton,
        'oneTimeSaved': this.oneTimeSaved
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
    },
    // DBArrayLength() {
    //   return new Promise((resolve, reject) => {
    //     let Ref = firebase.database().ref()
    //     Ref.on('value', function(snapshot){
    //       const recentData = snapshot.val()
    //       const len = Object.keys(recentData).length
    //       // console.log('len:', len)
    //       // console.log('lenOver:', len > 3 ? false : true )
    //       return len > 3 ? false : true
    //     })
    //   })
    // },
    async isOver3() {
      let result = await this.DBArrayLength()
      console.log('result:', result)
      return result
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
