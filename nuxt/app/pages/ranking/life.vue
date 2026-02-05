<template>
  <div class="bg">
    <div class="wrap">
      <h1 class="title">생활 순위</h1>

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
      </div>

    <!-- 카테고리 (커스텀 드롭다운) -->
    <div class="typeRow">
      <div class="dd dd-expand" :class="{ open }" ref="ddRef">
        <button class="ddBtn" type="button" @click="open = !open">
          <span class="ddText">{{ typeLabel[type] }}</span>
          <span class="ddArrow" :class="{ on: open }">▼</span>
        </button>

        <div class="ddBody">
          <button
            v-for="opt in typeOptions"
            :key="opt.value"
            type="button"
            class="ddItem"
            :class="{ active: opt.value === type }"
            @click="selectType(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
    <!-- Top 10 + (검색 시) 내 순위 -->
    <div class="card">
      <div class="thead">
        <div>순위</div>
        <div>아이디</div>
        <div class="right">생활 경험치</div>
      </div>

      <div class="tbody">
        <!-- 🔥 검색했을 때: Top10 위에 내 순위 1줄 -->
        <div v-if="me" class="row meRow pinned">
          <div class="rank">{{ me.rank }}</div>
          <div class="nick">{{ me.nickname }}</div>
          <div class="lvl right">{{ formatNum(me.value) }}</div>
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
          <div class="lvl right">{{ formatNum(p.value) }}</div>
        </div>
      </div>
              <div class="foot">
          <button class="glowBtn ghost" @click="refreshAll">새로고침</button>
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
}

type LifeType = "logging" | "fishing" | "mining" | "gathering" | "treasure_hunt"

type RankedLife = {
  id: number
  nickname: string
  type: LifeType
  value: number
  rank: number
}

const open = ref(false)
const ddRef = ref<HTMLElement | null>(null)
const q = ref("")
const searched = ref(false)
const lastQuery = ref("")
const type = ref<LifeType>("logging")
const typeOptions = [
  { value: "logging", label: "벌목" },
  { value: "fishing", label: "낚시" },
  { value: "mining", label: "채광" },
  { value: "gathering", label: "채집" },
  { value: "treasure_hunt", label: "보물찾기" },
] as const
const typeLabel = computed(() => ({
  logging: "벌목",
  fishing: "낚시",
  mining: "채광",
  gathering: "채집",
  treasure_hunt: "보물찾기",
}))
function selectType(v: LifeType) {
  type.value = v
  open.value = false
  doSearch()
}

onMounted(() => {
  const onDoc = (e: MouseEvent) => {
    const el = ddRef.value
    if (!el) return
    if (!el.contains(e.target as Node)) {
      open.value = false
    }
  }

  document.addEventListener("click", onDoc)

  onUnmounted(() => {
    document.removeEventListener("click", onDoc)
  })
})


// ✅ players API 그대로 사용
const { data, refresh } = await useFetch<{ rows: PlayerRow[] }>("/api/ranking/players")

const players = computed(() => data.value?.rows ?? [])

// 카테고리 값 꺼내기
function getValue(p: PlayerRow, t: LifeType) {
  const v =
    t === "logging" ? p.logging :
    t === "fishing" ? p.fishing :
    t === "mining" ? p.mining :
    t === "gathering" ? p.gathering :
    p.treasure_hunt

  return Number(v ?? 0)
}

// ✅ 전체를 “선택한 카테고리 기준”으로 정렬 후 rank 부여
const ranked = computed<RankedLife[]>(() => {
  const t = type.value
  const list = players.value.map(p => ({
    id: p.id,
    nickname: p.nickname,
    type: t,
    value: getValue(p, t),
    rank: 0,
  }))

  list.sort((a, b) => b.value - a.value)

  // 동일 점수면 같은 rank(옵션) / 아니면 그냥 idx+1
  // 여기선 "그냥 idx+1"로 깔끔하게 감
  return list.map((x, idx) => ({ ...x, rank: idx + 1 }))
})

const top10 = computed(() => ranked.value.slice(0, 10))

const me = ref<RankedLife | null>(null)

function doSearch() {
  searched.value = true
  lastQuery.value = q.value.trim()
  const key = lastQuery.value.toLowerCase()

  if (!key) {
    me.value = null
    return
  }

  const exact = ranked.value.find(p => (p.nickname ?? "").toLowerCase() === key)
  const partial = ranked.value.find(p => (p.nickname ?? "").toLowerCase().includes(key))
  me.value = exact ?? partial ?? null
}

async function refreshAll() {
  await refresh()
  // 새 데이터 받은 뒤, 검색 결과도 다시 계산
  if (searched.value) doSearch()
}

function formatNum(n: number) {
  return n.toLocaleString("ko-KR")
}

useHead({ title: "생활 순위" })
</script>