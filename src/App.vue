<script setup></script>

<template>
  <!-- CALL-0009: 현재 라우트에 맞는 컴포넌트 렌더링 -->
  <!-- CALL-0010: 라우터가 '/' 경로이므로 WordView.vue 표시 -->
  <WordView />
</template>

<script setup>
// CALL-0011: App 컴포넌트 설정 (간단한 경우 생략 가능)
import WordView from './views/WordView.vue'
</script>
