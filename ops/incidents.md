# FactChart 운영 인시던트 로그

백엔드(Apps Script + Supabase) 파이프라인에서 실제로 터졌던 장애를 기록해둡니다.
목적: 같은 증상이 또 나타났을 때 "처음부터 다시 진단"하지 않고 바로 원인으로 점프하기 위함.

각 항목은 **증상 → 원인 → 조치 → 재발방지** 순서로 적습니다.

---

## 2026-11-13 ~ 11-25 — 주가 업데이트 11일간 정지 (DAILY_OHLC_CURSOR 좀비)

**증상**
- 웹/앱 차트에서 주가가 11/13 이후로 안 올라옴
- 뉴스·텔레그램·공시는 정상 작동 — 주가 파이프라인만 멈춤
- Apps Script 실행 로그에는 `dailyUpdatePrices`가 매일 정상 시간(오후 2:41)에 실행되고 "완료됨"으로 찍힘, 단 1~2초 만에 끝남
- `fetchDailyPrices` 트리거는 "사용 중지됨" 상태였고, 11일간 단 한 번도 실행 기록이 없었음
- Google Apps Script의 실패 알림 메일도 전혀 오지 않음 (코드가 "정상적으로 스킵"한 것으로 처리돼서 실패로 간주 안 됨)

**원인 (Code.gs)**

`dailyUpdatePrices()`는 매일 도는 진짜 트리거. 내부에서 `fetchDailyPrices()`를 직접 호출하는데,
이미 진행 중인지 판단하는 가드 로직이 두 가지 신호에 의존함:

```javascript
var cursor = props.getProperty('DAILY_OHLC_CURSOR');
var running = ScriptApp.getProjectTriggers().some(function(t){
  return t.getHandlerFunction() === 'fetchDailyPrices';
});
if (cursor || running) {
  Logger.log('▶ 주가 증분 수집이 이미 진행 중 — 재시작 안 함.');
  return;   // ← fetchDailyPrices() 호출 안 하고 바로 종료
}
fetchDailyPrices();
```

11/13에 `fetchDailyPrices` 실행이 (캐치되지 않은 예외 등으로) 비정상 종료되면서:
1. 정상 완료 시에만 지워지는 `DAILY_OHLC_CURSOR` 스크립트 속성이 남아버림
2. 이어달리기용으로 자체 생성했던 `fetchDailyPrices` 트리거는 반복 실패 끝에 비활성화("사용 중지됨")된 채로 트리거 목록에 남음

이후 매일 `dailyUpdatePrices`가 돌 때마다:
- `cursor`가 있으니 "진행 중"으로 판단 → 스킵
- 커서를 지워도(`resetDailyOhlcCursor()`), **비활성화된 `fetchDailyPrices` 트리거가 여전히 목록에 존재**하기 때문에 `running`이 `true`로 판정 → 또 스킵

**즉, 좀비 신호가 두 겹**이었음: 죽은 커서 + 죽었지만 목록엔 남아있는 트리거. 둘 다 "실제로 작업 중"이 아니라 "작업 중이라고 믿게 만드는 흔적"일 뿐인데, 코드가 존재 여부만 보고 실제 동작 여부를 확인하지 않았음.

**조치 (2026-11-25)**
1. `resetDailyOhlcCursor()` 실행 → `DAILY_OHLC_CURSOR` 속성 삭제
2. Apps Script 트리거 메뉴에서 비활성화된 `fetchDailyPrices` 트리거 수동 삭제
3. `dailyUpdatePrices()` 재실행 → 정상적으로 348종목 증분 수집 시작 확인

**재발방지 (적용 예정)**
- `dailyUpdatePrices`의 가드 로직 수정: "트리거가 존재하는가"가 아니라 **비활성화 여부까지 확인**하도록 변경
- 트리거 없이 커서만 남아있으면 "좀비 상태"로 간주하고 **자동으로 커서를 지우고 재시작**하도록 수정 (영구 대기 대신 자가 복구)
- `prices` / `disclosures` / `news` 세 테이블의 최신 데이터 날짜를 매일 점검해서, 기대 범위보다 오래됐으면 GitHub 이슈를 자동 생성하는 헬스체크 워크플로 추가 (`.github/workflows/data-health-check.yml`) — 이번처럼 "조용히 멈춰있는" 상태를 11일씩 방치하지 않기 위함

---

## 템플릿 (새 항목 추가 시 복사해서 사용)

```markdown
## YYYY-MM-DD — 한 줄 요약

**증상**
-

**원인**
-

**조치**
-

**재발방지**
-
```
