<template>
<div class="billBreakdown">
    <div v-for="i in optionsComputed" :key="i.id" class="option">
        <div class="chosenPlanLabel">
            <p>{{ i.id }}:</p>
            <div>{{ i.planName }}</div>
        </div>
        <div class="breakdown">
            <div>
                <p>Plan:</p>
                <div>${{ i.planTotal.toFixed(2) }}</div>
            </div>
            <div>
                <p>TMP:</p>
                <div>$0.00</div>
            </div>
            <div>
                <p>DPP:</p>
                <div>$0.00</div>
            </div>
            <div>
                <p>Total:</p>
                <div>${{ i.total.toFixed(2) }} plus tax</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SectionBillBreakdown',
    computed: {
      ...mapState({
        optionsComputed (state, getters) {
          return [
            {
              id: 'Option 1',
              chosenPlan: state['optionOne'].chosenPlan,
              planTotal: getters['optionOne/planTotal'],
              total: getters['optionOne/total']
            },
            {
              id: 'Option 2',
              chosenPlan: state['optionTwo'].chosenPlan,
              planTotal: getters['optionTwo/planTotal'],
              total: getters['optionTwo/total']
            },
          ]
        },
      })
    }

}
</script>

<style>
.billBreakdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1%;
}

.billBreakdown p {
  margin: 0;
  padding: 0;
}

.option {
  display: grid;
  grid-template-rows: 10% 90%;
}

.option > div {
  align-items: center;
}

.chosenPlanLabel {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0 1%;
}

.chosenPlanLabel > p {
  font-size: 12px;
  color: red;
}

.breakdown {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  border: 1px solid grey;
}

.breakdown p {
  font-size: 14px;
}

.option1 > .breakdown {
  border-radius: 5px 0 0 5px;
}

.option2 > .breakdown {
  border-left: 0;
  border-radius: 0 5px 5px 0;
}

.breakdown > div {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 3fr;
  margin: 0 1%;
}

.breakdown > div > p {
  justify-self: end;
}

.breakdown > div > div {
  margin: 0 5%;
  width: 60%;
  text-align: center;
  border-bottom: 1px solid black;
  font-weight: bold;
}
</style>