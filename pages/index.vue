<template>
  <Head>
    <Title>Заклинания</Title>
  </Head>
  <div class="flex flex-col items-center h-screen p-4">
    <h1 class="text-4xl text-center mb-6">Поиск заклинаний</h1>
    <form @submit.prevent="searchSpell" class="w-full max-w-lg">
        <input
            type="text"
            v-model="query"
            placeholder="Введите название заклинания..."
            class="p-2 border rounded w-full mb-4"
        />
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 mb-4 rounded w-full">
        Поиск
      </button>
    </form>
    <div v-if="filteredSpells" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div
          v-for="spell in filteredSpells"
          :key="spell.id"
          class="p-4 border rounded shadow-lg cursor-pointer"
          @click="viewSpell(spell.id)"
      >
        <h2 class="text-xl font-bold">{{ spell.name }}</h2>
        <p>{{ spell.effect }}</p>
        <p><strong>Type:</strong> {{ spell.type }}</p>
        <p><strong>Light:</strong> {{ spell.light }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSpellStore } from '~/stores/spellStore';

// Инициализация переменных и роутера
const query = ref('');
const router = useRouter();
const store = useSpellStore();
const getSpells = computed(() => store.getSpells)
const filteredSpells = computed(() => store.getFilterSpells)

// Загружаем заклинания при загрузке страницы
  if (!getSpells.value.length) {
    await store.fetchSpells()
  }

// Поиск заклинаний
function searchSpell() {
  query.value = query.value.trim()
  if (!query.value) {
    // Если запрос пустой, можем выдать сообщение об ошибке или просто сбросить фильтр
    alert('Please enter a spell name to search.');
    store.$patch({query: query.value})
    return;
  }
  store.$patch({query: query.value})
  if (!filteredSpells.value.length) {
    alert('No spells found with the given query.');
  }
}

// Переход на страницу с детальной информацией
const viewSpell = (id: string) => {
  router.push(`/spell/${id}`);
};
</script>
