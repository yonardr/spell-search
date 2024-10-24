<template>
  <Head>
    <Title>Заклинание {{ spell.name }}</Title>
  </Head>
  <div class="container mx-auto p-4">
    <NuxtLink to="/" class="bg-blue-500 text-white py-2 px-4 rounded">
      Назад
    </NuxtLink>
    <h1 class="text-4xl mb-4">{{ spell?.name }}</h1>
    <p><strong>Id:</strong> {{ spell?.id }}</p>
    <p v-if="spell?.incantation"><strong>Incantation:</strong> {{ spell?.incantation }}</p>
    <p v-if="spell?.effect"><strong>Effect:</strong> {{ spell?.effect }}</p>
    <p v-if="spell?.canBeVerbal"><strong>canBeVerbal:</strong> {{ spell?.canBeVerbal }}</p>
    <p v-if="spell?.type"><strong>Type:</strong> {{ spell?.type }}</p>
    <p v-if="spell?.light"><strong>Light:</strong> {{ spell?.light }}</p>
    <p v-if="spell?.creator"><strong>Creator:</strong> {{ spell?.creator }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSpellStore } from '~/stores/spellStore';


// Получаем текущий маршрут
const route = useRoute();
const spellStore = useSpellStore();

// Загружаем заклинание по ID при загрузке страницы
const id = route.params.id as string;
spellStore.fetchSpellById(id);

// Отображаем выбранное заклинание
const spell = computed(() => spellStore.selectedSpell);

</script>
