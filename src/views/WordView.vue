<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left {
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 10px;
}

.right {
  flex: 1;
  padding: 10px;
}

li {
  cursor: pointer;
  padding: 5px;
}

li.active {
  background: #b3cab4;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 6px;
}
</style>

<template>
  <div class="container">
    <!-- 왼쪽: 일차 -->
    <div class="left">
      <h3>일차</h3>

      <button
        @click="showAddDayPopup = true"
        style="
          margin-bottom: 10px;
          width: 100%;
          background: #e53935;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-weight: bold;
        "
      >
        추가
      </button>
      <ul>
        <li
          v-for="day in dayList"
          :key="day.d_seq"
          :class="{ active: day.d_seq === selectedDay }"
          @click="selectDay(day.d_seq)"
        >
          {{ day.d_day }}일차
        </li>
      </ul>

      <!-- Day Add Popup -->
      <div
        v-if="showAddDayPopup"
        style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        "
      >
        <div
          style="
            background: white;
            padding: 24px 32px;
            border-radius: 8px;
            min-width: 260px;
            box-shadow: 0 2px 8px #0002;
          "
        >
          <h4 style="margin-top: 0">일차 추가</h4>
          <input
            v-model="newDayValue"
            type="number"
            min="1"
            placeholder="일차 숫자 입력"
            style="width: 100%; margin-bottom: 12px; padding: 6px 8px"
          />
          <div style="display: flex; gap: 8px; justify-content: flex-end">
            <button @click="confirmAddDay" :disabled="!newDayValue">확인</button>
            <button @click="showAddDayPopup = false">취소</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 오른쪽: 단어 -->
    <div class="right">
      <h3>단어</h3>

      <table>
        <thead>
          <tr>
            <th>영어</th>
            <th>뜻</th>
            <th>암기</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="word in wordList" :key="word.w_seq">
            <td>{{ word.w_eng }}</td>
            <td>{{ word.w_kor }}</td>
            <td>
              <input
                type="checkbox"
                :checked="word.w_remember_yn === 'Y'"
                @change="toggleRemember(word)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDayList, getWordList, updateWord, insertDay } from '@/api/wordApi'

const dayList = ref([])
const wordList = ref([])
const selectedDay = ref(null)
const showAddDayPopup = ref(false)
const newDayValue = ref('')

const confirmAddDay = async () => {
  if (!newDayValue.value) return
  try {
    await insertDay({ d_day: newDayValue.value })
    await loadDays()
  } catch {
    alert('일차 추가 실패')
  }
  showAddDayPopup.value = false
  newDayValue.value = ''
}

// 일차 목록
const loadDays = async () => {
  const res = await getDayList()
  dayList.value = res.data

  if (dayList.value.length > 0) {
    selectDay(dayList.value[0].d_seq)
  }
}

// 일차 클릭
const selectDay = async (dSeq) => {
  selectedDay.value = dSeq
  const res = await getWordList(dSeq)
  wordList.value = res.data
}

// 암기 체크
const toggleRemember = async (word) => {
  const newVal = word.w_remember_yn === 'Y' ? 'N' : 'Y'

  await updateWord({
    w_seq: word.w_seq,
    w_eng: word.w_eng,
    w_kor: word.w_kor,
    w_remember_yn: newVal,
  })

  word.w_remember_yn = newVal
}

onMounted(loadDays)
</script>
