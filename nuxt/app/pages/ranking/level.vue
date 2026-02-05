<template>
  <div class="bg">
    <div class="wrap">
      <h1 class="title">레벨 랭킹</h1>

      <!-- 검색 -->
      <div class="searchRow">
        <div class="searchPill">
          <div class="searchLabel">아이디</div>
          <input
            v-model="q"
            class="searchInput"
            type="text"
            placeholder="본인 닉네임 입력 후 Enter"
            @keydown.enter="doSearch"
          />
        </div>

        <button class="glowBtn" @click="doSearch">검색</button>
      </div>

      <!-- Top 10 + (검색 시) 내 순위 -->
      <div class="card">
        <div class="thead">
          <div>순위</div>
          <div>아이디</div>
          <div class="right">레벨</div>
        </div>

        <div class="tbody">
          <!-- 🔥 검색했을 때: Top10 위에 내 순위 1줄 -->
          <div v-if="me" class="row meRow pinned">
            <div class="rank">{{ me.rank }}</div>
            <div class="nick">{{ me.nickname }}</div>
            <div class="lvl right">{{ me.level }}</div>
          </div>

          <!-- 구분선 -->
          <div v-if="me" class="sep"></div>

          <!-- Top 10 -->
          <div
            v-for="p in top10"
            :key="p.id"
            class="row"
            :class="{ meRow: me && p.id === me.id }"
          >
            <div class="rank">{{ p.rank }}</div>
            <div class="nick">{{ p.nickname }}</div>
            <div class="lvl right">{{ p.level }}</div>
          </div>
        </div>
        <div class="foot">
          <button class="glowBtn ghost" @click="refresh()">새로고침</button>
          <div class="small">Top 10</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type PlayerRow = {
  id: number
  nickname: string
  level: number
  fishing?: number
  logging?: number
  mining?: number
  gathering?: number
  treasure_hunt?: number
  created_at?: string
  updated_at?: string
}

type Ranked = PlayerRow & { rank: number }

const q = ref("")
const searched = ref(false)
const lastQuery = ref("")

const { data, refresh } = await useFetch<{ rows: PlayerRow[] }>("/api/ranking/players")

const players = computed(() => {
  const rows = data.value?.rows ?? []
  return [...rows].sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
})

const ranked = computed<Ranked[]>(() =>
  players.value.map((p, idx) => ({ ...p, rank: idx + 1 }))
)

const top10 = computed(() => ranked.value.slice(0, 10))

const me = ref<Ranked | null>(null)

function doSearch() {
  searched.value = true
  lastQuery.value = q.value.trim()
  const key = lastQuery.value.toLowerCase()

  if (!key) {
    me.value = null
    return
  }

  // ✅ "본인 이름" 검색: 정확히 일치 우선, 없으면 부분일치(첫번째)로 fallback
  const exact = ranked.value.find(p => (p.nickname ?? "").toLowerCase() === key)
  const partial = ranked.value.find(p => (p.nickname ?? "").toLowerCase().includes(key))
  me.value = exact ?? partial ?? null
}

useHead({ title: "레벨 랭킹" })
</script>