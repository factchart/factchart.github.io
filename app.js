const KQ_CODES = new Set(['196170','247540','086520','277810','036930','058470','028300','240810','087010','000250','039030','298380','141080','403870','178320','222800','108490','214370','319660','347850','095340','310210','080220','084370','095610','145020','214450','067310','064760','214150','005290','031980','226950','357780','263750','237690','098460','131970','131290','032820','089030','257720','058610','290650','218410','007390','083650','068760','035900','078600','140860','041510','323280','039200','096530','060370','101490','445680','032500','166090','232140','003380','195940','036540','417200','328130','189300','085660','065350','183300','388720','281740','204270','161580','466100','137400','074600','036830','056190','048410','213420','033100','035760','222080','086450','050890','046890','293490','122870','014620','052400','358570','241710','171090','006730','253450','056080','032190','121600','365340','348370','036810','336570','059090','053800','225570','060250','009520','082270','383310','348210','112040','086900','399720','253590','015750','033500','376300','272290','067160','042000','211050','460930','278280','214430','018290','025980','041190','036620','030520','025320','060280','251970','215200','095660','025900','079370','069080','101730','078340','053030','058970','352480','215000','200130','108860','304100','101360','194480']);

const STOCK_META = {
  '삼성전자': { sector:'반도체·전자', desc:'글로벌 메모리·파운드리', ticker:'005930' },
  'SK하이닉스': { sector:'반도체', desc:'HBM·DRAM 메모리', ticker:'000660' },
  'SK스퀘어': { sector:'투자지주', desc:'반도체·ICT 투자', ticker:'402340' },
  '삼성전기': { sector:'전자부품', desc:'MLCC·기판', ticker:'009150' },
  '현대차': { sector:'자동차', desc:'완성차·EV·수소', ticker:'005380' },
  'LG에너지솔루션': { sector:'2차전지', desc:'EV배터리', ticker:'373220' },
  '삼성생명': { sector:'보험', desc:'생명보험', ticker:'032830' },
  '삼성물산': { sector:'상사·건설', desc:'상사·건설·패션', ticker:'028260' },
  '기아': { sector:'자동차', desc:'완성차·EV', ticker:'000270' },
  'HD현대중공업': { sector:'조선', desc:'조선·해양', ticker:'329180' },
  '삼성바이오로직스': { sector:'바이오·제약', desc:'바이오 CDMO', ticker:'207940' },
  '두산에너빌리티': { sector:'원전·에너지', desc:'원전·발전설비', ticker:'034020' },
  'KB금융': { sector:'금융', desc:'국내 대형 금융그룹', ticker:'105560' },
  '현대모비스': { sector:'자동차부품', desc:'모듈·전동화 부품', ticker:'012330' },
  '한화에어로스페이스': { sector:'방산·항공', desc:'엔진·우주·방산', ticker:'012450' },
  '신한지주': { sector:'금융', desc:'대형 금융지주', ticker:'055550' },
  'SK': { sector:'지주', desc:'SK그룹 지주', ticker:'034730' },
  '삼성SDI': { sector:'2차전지', desc:'배터리·전자재료', ticker:'006400' },
  'LG전자': { sector:'전자·가전', desc:'가전·전장', ticker:'066570' },
  'NAVER': { sector:'IT·플랫폼', desc:'검색·커머스·AI', ticker:'035420' },
  '셀트리온': { sector:'바이오·제약', desc:'항체 바이오시밀러', ticker:'068270' },
  'HD현대일렉트릭': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'267260' },
  'LS ELECTRIC': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'010120' },
  '하나금융지주': { sector:'금융', desc:'대형 금융지주', ticker:'086790' },
  '효성중공업': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'298040' },
  '한화오션': { sector:'조선', desc:'조선·해양', ticker:'042660' },
  '삼성화재': { sector:'보험', desc:'손해보험', ticker:'000810' },
  'POSCO홀딩스': { sector:'철강·소재', desc:'철강·이차전지소재', ticker:'005490' },
  '미래에셋증권': { sector:'증권', desc:'증권·투자', ticker:'006800' },
  'LG이노텍': { sector:'전자부품', desc:'MLCC·카메라모듈', ticker:'011070' },
  '한미반도체': { sector:'반도체장비', desc:'후공정 장비', ticker:'042700' },
  '두산': { sector:'기계·중공업', desc:'기계·중공업', ticker:'000150' },
  '고려아연': { sector:'비철금속', desc:'아연·제련', ticker:'010130' },
  'HD한국조선해양': { sector:'조선', desc:'조선 지주', ticker:'009540' },
  'SK텔레콤': { sector:'통신', desc:'이동통신·AI', ticker:'017670' },
  'LG화학': { sector:'화학·소재', desc:'석유화학·첨단소재', ticker:'051910' },
  '한국전력': { sector:'전력·유틸리티', desc:'전력 공급', ticker:'015760' },
  '삼성중공업': { sector:'조선', desc:'조선·해양플랜트', ticker:'010140' },
  '우리금융지주': { sector:'금융', desc:'금융지주', ticker:'316140' },
  '현대로템': { sector:'방산·철도', desc:'전차·고속철도', ticker:'064350' },
  'HD현대': { sector:'조선·에너지', desc:'조선·정유 지주', ticker:'267250' },
  'KT&G': { sector:'필수소비재', desc:'담배·건강기능식품', ticker:'033780' },
  '삼성에스디에스': { sector:'IT·소프트웨어', desc:'IT서비스·클라우드', ticker:'018260' },
  '현대오토에버': { sector:'IT·소프트웨어', desc:'자동차 IT서비스', ticker:'307950' },
  '메리츠금융지주': { sector:'금융', desc:'보험·증권 지주', ticker:'138040' },
  'HMM': { sector:'해운', desc:'컨테이너 해운', ticker:'011200' },
  'SK이노베이션': { sector:'에너지·화학', desc:'정유·배터리', ticker:'096770' },
  'LG': { sector:'지주', desc:'LG그룹 지주', ticker:'003550' },
  '카카오': { sector:'IT·플랫폼', desc:'메신저·콘텐츠·금융', ticker:'035720' },
  '포스코퓨처엠': { sector:'2차전지소재', desc:'양극재·음극재', ticker:'003670' },
  '기업은행': { sector:'금융', desc:'중소기업 금융', ticker:'024110' },
  '한화시스템': { sector:'방산·IT', desc:'방산전자·ICT', ticker:'272210' },
  'LIG디펜스앤에어로스페이스': { sector:'방산·항공', desc:'방산·우주', ticker:'079550' },
  '에이피알': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'278470' },
  '현대글로비스': { sector:'물류', desc:'종합물류·유통', ticker:'086280' },
  'KT': { sector:'통신', desc:'이동통신·미디어', ticker:'030200' },
  '현대건설': { sector:'건설', desc:'종합건설', ticker:'000720' },
  '한국금융지주': { sector:'증권', desc:'증권·투자', ticker:'071050' },
  '한국항공우주': { sector:'방산·항공', desc:'방산·우주', ticker:'047810' },
  'S-Oil': { sector:'에너지', desc:'정유·석유화학', ticker:'010950' },
  'LS': { sector:'지주', desc:'LS그룹 지주', ticker:'006260' },
  '카카오뱅크': { sector:'금융·핀테크', desc:'인터넷전문은행', ticker:'323410' },
  'NH투자증권': { sector:'증권', desc:'증권·투자', ticker:'005940' },
  '크래프톤': { sector:'게임', desc:'배틀그라운드', ticker:'259960' },
  '삼성증권': { sector:'증권', desc:'증권·투자', ticker:'016360' },
  '포스코인터내셔널': { sector:'상사·에너지', desc:'종합상사·LNG', ticker:'047050' },
  'LG씨엔에스': { sector:'IT·소프트웨어', desc:'IT서비스·DX', ticker:'064400' },
  '한국타이어앤테크놀로지': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'161390' },
  'HD현대마린솔루션': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'443060' },
  '키움증권': { sector:'증권', desc:'증권·투자', ticker:'039490' },
  'DB손해보험': { sector:'보험', desc:'손해보험', ticker:'005830' },
  '삼성E&A': { sector:'건설·플랜트', desc:'EPC·플랜트', ticker:'028050' },
  '대한항공': { sector:'물류·운송', desc:'운송·물류', ticker:'003490' },
  '대우건설': { sector:'건설·인프라', desc:'건설·플랜트', ticker:'047040' },
  '이수페타시스': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'007660' },
  '하이브': { sector:'엔터테인먼트', desc:'K-POP·레이블', ticker:'352820' },
  '삼양식품': { sector:'식품·음료', desc:'식품·소비재', ticker:'003230' },
  '한화': { sector:'지주·방산', desc:'한화그룹 지주', ticker:'000880' },
  '한진칼': { sector:'물류·운송', desc:'운송·물류', ticker:'180640' },
  '대한전선': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'001440' },
  '두산로보틱스': { sector:'기계·중공업', desc:'기계·중공업', ticker:'454910' },
  'SK바이오팜': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'326030' },
  '산일전기': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'062040' },
  'GS': { sector:'지주·에너지', desc:'GS그룹 지주', ticker:'078930' },
  'LG디스플레이': { sector:'디스플레이', desc:'OLED·LCD', ticker:'034220' },
  'SKC': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'011790' },
  '코웨이': { sector:'생활가전', desc:'렌탈·환경가전', ticker:'021240' },
  '아모레퍼시픽': { sector:'화장품', desc:'뷰티·코스메틱', ticker:'090430' },
  '두산밥캣': { sector:'기계·중공업', desc:'기계·중공업', ticker:'241560' },
  '카카오페이': { sector:'핀테크', desc:'간편결제·금융', ticker:'377300' },
  'LG유플러스': { sector:'통신', desc:'이동통신', ticker:'032640' },
  '신세계': { sector:'유통·리테일', desc:'유통', ticker:'004170' },
  '한화솔루션': { sector:'화학·태양광', desc:'태양광·케미칼', ticker:'009830' },
  '유한양행': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'000100' },
  '한미약품': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'128940' },
  'NC': { sector:'게임', desc:'MMORPG', ticker:'036570' },
  'BNK금융지주': { sector:'금융', desc:'지방금융지주', ticker:'138930' },
  '엘앤에프': { sector:'2차전지소재', desc:'양극재', ticker:'066970' },
  'JB금융지주': { sector:'금융', desc:'지방금융지주', ticker:'175330' },
  '오리온': { sector:'식품·음료', desc:'식품·소비재', ticker:'271560' },
  '삼성카드': { sector:'금융·카드', desc:'신용카드·금융', ticker:'029780' },
  'OCI홀딩스': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'010060' },
  '롯데쇼핑': { sector:'유통·리테일', desc:'유통', ticker:'023530' },
  'CJ': { sector:'지주', desc:'CJ그룹 지주', ticker:'001040' },
  '한전기술': { sector:'원전·에너지', desc:'원전설계·엔지니어링', ticker:'052690' },
  '한화엔진': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'082740' },
  '한화생명': { sector:'보험', desc:'손해·생명보험', ticker:'088350' },
  '포스코DX': { sector:'IT·소프트웨어', desc:'IT서비스·스마트팩토리', ticker:'022100' },
  '현대제철': { sector:'철강', desc:'철강 제조', ticker:'004020' },
  '한온시스템': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'018880' },
  'KCC': { sector:'화학·소재', desc:'실리콘·페인트·유리', ticker:'002380' },
  'LG생활건강': { sector:'생활소비재', desc:'화장품·생활용품', ticker:'051900' },
  '에코프로머티': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'450080' },
  '영원무역': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'111770' },
  '현대백화점': { sector:'유통·리테일', desc:'유통', ticker:'069960' },
  'CJ제일제당': { sector:'식품', desc:'식품·바이오', ticker:'097950' },
  '넷마블': { sector:'게임', desc:'모바일게임', ticker:'251270' },
  'SK바이오사이언스': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'302440' },
  'F&F': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'383220' },
  '현대해상': { sector:'보험', desc:'손해·생명보험', ticker:'001450' },
  '한국가스공사': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'036460' },
  '롯데케미칼': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'011170' },
  '금호석유화학': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'011780' },
  '한솔케미칼': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'014680' },
  '현대엘리베이터': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'017800' },
  '강원랜드': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'035250' },
  '에스엘': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'005850' },
  '한국앤컴퍼니': { sector:'자동차부품', desc:'한국타이어 지주', ticker:'000240' },
  '농심': { sector:'식품·음료', desc:'식품·소비재', ticker:'004370' },
  '롯데지주': { sector:'유통·리테일', desc:'유통', ticker:'004990' },
  'GS건설': { sector:'건설', desc:'종합건설', ticker:'006360' },
  'DN오토모티브': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'007340' },
  '한올바이오파마': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'009420' },
  '영원무역홀딩스': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'009970' },
  '에스원': { sector:'IT·보안서비스', desc:'물리보안·시설관리', ticker:'012750' },
  '동서': { sector:'식품·음료', desc:'식품·소비재', ticker:'026960' },
  '팬오션': { sector:'물류·운송', desc:'운송·물류', ticker:'028670' },
  'iM금융지주': { sector:'금융', desc:'지방금융지주', ticker:'139130' },
  '이마트': { sector:'유통', desc:'대형마트·리테일', ticker:'139480' },
  'HL만도': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'204320' },
  'BGF리테일': { sector:'유통·리테일', desc:'유통', ticker:'282330' },
  'DL이앤씨': { sector:'건설·인프라', desc:'건설·플랜트', ticker:'375500' },
  '이수스페셜티케미컬': { sector:'화학·소재', desc:'반도체 특수화학', ticker:'457190' },
  'CJ대한통운': { sector:'물류·운송', desc:'운송·물류', ticker:'000120' },
  '코스맥스': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'192820' },
  '한국콜마': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'161890' },
  '코오롱인더': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'120110' },
  '씨에스윈드': { sector:'건설·인프라', desc:'건설·플랜트', ticker:'112610' },
  '풍산': { sector:'철강·금속', desc:'철강·비철', ticker:'103140' },
  '미스토홀딩스': { sector:'기계·중공업', desc:'기계·중공업', ticker:'081660' },
  'HD현대마린엔진': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'071970' },
  '한전KPS': { sector:'전력·유틸리티', desc:'발전설비 정비', ticker:'051600' },
  '제일기획': { sector:'광고·마케팅', desc:'광고·디지털마케팅', ticker:'030000' },
  '한국카본': { sector:'소재·방산', desc:'탄소복합소재', ticker:'017960' },
  '현대위아': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'011210' },
  '한미사이언스': { sector:'바이오·제약', desc:'한미약품 지주', ticker:'008930' },
  '호텔신라': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'008770' },
  'GS리테일': { sector:'유통·리테일', desc:'유통', ticker:'007070' },
  '아모레퍼시픽홀딩스': { sector:'뷰티·화장품', desc:'아모레퍼시픽 지주', ticker:'002790' },
  '오리온홀딩스': { sector:'식품·음료', desc:'식품·소비재', ticker:'001800' },
  '세아베스틸지주': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'001430' },
  '동원산업': { sector:'식품·수산', desc:'수산물·식품', ticker:'006040' },
  '하이트진로': { sector:'식품·음료', desc:'식품·소비재', ticker:'000080' },
  '녹십자': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'006280' },
  'SK아이이테크놀로지': { sector:'2차전지소재', desc:'분리막', ticker:'361610' },
  'DL': { sector:'지주·건설', desc:'DL그룹 지주', ticker:'000210' },
  '후성': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'093370' },
  '롯데웰푸드': { sector:'식품·음료', desc:'식품·소비재', ticker:'280360' },
  '대웅': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'003090' },
  '태광산업': { sector:'화학·소재', desc:'합성섬유·화학', ticker:'003240' },
  '롯데정밀화학': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'004000' },
  '롯데칠성': { sector:'식품·음료', desc:'식품·소비재', ticker:'005300' },
  '금호타이어': { sector:'자동차부품', desc:'타이어', ticker:'073240' },
  '한일시멘트': { sector:'철강·금속', desc:'철강·비철', ticker:'300720' },
  '대웅제약': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'069620' },
  '더블유게임즈': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'192080' },
  '파라다이스': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'034230' },
  '종근당': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'185750' },
  '효성티앤씨': { sector:'화학·소재', desc:'스판덱스·나일론', ticker:'298020' },
  '오뚜기': { sector:'식품·음료', desc:'식품·소비재', ticker:'007310' },
  '미원상사': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'002840' },
  '대한유화': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'006650' },
  '세아제강지주': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'003030' },
  '지역난방공사': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'071320' },
  '대상': { sector:'식품·음료', desc:'식품·소비재', ticker:'001680' },
  'TKG휴켐스': { sector:'화학·소재', desc:'질산·화약원료', ticker:'069260' },
  '영풍': { sector:'철강·금속', desc:'철강·비철', ticker:'000670' },
  '아세아': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'002030' },
  '세방전지': { sector:'2차전지', desc:'납축전지', ticker:'004490' },
  'HS효성첨단소재': { sector:'철강·금속', desc:'철강·비철', ticker:'298050' },
  '동원시스템즈': { sector:'포장재·소재', desc:'알루미늄캔·포장', ticker:'014820' },
  '에스디바이오센서': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'137310' },
  '한샘': { sector:'소비재·서비스', desc:'소비재·서비스', ticker:'009240' },
  '녹십자홀딩스': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'005250' },
  'GKL': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'114090' },
  '율촌화학': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'008730' },
  '미원에스씨': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'268280' },
  'SK케미칼': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'285130' },
  '코스모화학': { sector:'화학·소재', desc:'화학·정유·소재', ticker:'005420' },
  '알테오젠': { sector:'바이오', desc:'바이오 플랫폼', ticker:'196170' },
  '에코프로비엠': { sector:'2차전지소재', desc:'양극재', ticker:'247540' },
  '에코프로': { sector:'2차전지소재', desc:'이차전지 소재 지주', ticker:'086520' },
  '레인보우로보틱스': { sector:'로봇', desc:'협동로봇·휴머노이드', ticker:'277810' },
  '주성엔지니어링': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'036930' },
  '리노공업': { sector:'반도체부품', desc:'테스트 핀·소켓', ticker:'058470' },
  'HLB': { sector:'바이오', desc:'항암 신약', ticker:'028300' },
  '원익IPS': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'240810' },
  '펩트론': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'087010' },
  '삼천당제약': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'000250' },
  '이오테크닉스': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'039030' },
  '에이비엘바이오': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'298380' },
  '리가켐바이오': { sector:'바이오', desc:'ADC 신약', ticker:'141080' },
  'HPSP': { sector:'반도체장비', desc:'고압 어닐링 장비', ticker:'403870' },
  '서진시스템': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'178320' },
  '심텍': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'222800' },
  '로보티즈': { sector:'로봇', desc:'로봇·자동화', ticker:'108490' },
  '케어젠': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'214370' },
  '피에스케이': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'319660' },
  '디앤디파마텍': { sector:'바이오·제약', desc:'비만·당뇨 신약', ticker:'347850' },
  'ISC': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'095340' },
  '보로노이': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'310210' },
  '제주반도체': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'080220' },
  '유진테크': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'084370' },
  '테스': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'095610' },
  '휴젤': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'145020' },
  '파마리서치': { sector:'바이오·미용', desc:'리쥬란·필러', ticker:'214450' },
  '하나마이크론': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'067310' },
  '티씨케이': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'064760' },
  '클래시스': { sector:'미용의료기기', desc:'에스테틱 의료기기', ticker:'214150' },
  '동진쎄미켐': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'005290' },
  '피에스케이홀딩스': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'031980' },
  '올릭스': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'226950' },
  '솔브레인': { sector:'반도체소재', desc:'전자재료·식각액', ticker:'357780' },
  '펄어비스': { sector:'게임', desc:'검은사막', ticker:'263750' },
  '에스티팜': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'237690' },
  '고영': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'098460' },
  '두산테스나': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'131970' },
  '티에스이': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'131290' },
  '우리기술': { sector:'원전·에너지', desc:'원전 계측제어', ticker:'032820' },
  '테크윙': { sector:'반도체·장비·소재', desc:'반도체 테스트핸들러', ticker:'089030' },
  '실리콘투': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'257720' },
  '에스피지': { sector:'기계·부품', desc:'감속기·모터', ticker:'058610' },
  '엘앤씨바이오': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'290650' },
  'RFHIC': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'218410' },
  '네이처셀': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'007390' },
  '비에이치아이': { sector:'에너지·플랜트', desc:'보일러·열교환기', ticker:'083650' },
  '셀트리온제약': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'068760' },
  'JYP Ent.': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'035900' },
  '대주전자재료': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'078600' },
  '파크시스템스': { sector:'반도체·장비·소재', desc:'원자력현미경AFM', ticker:'140860' },
  '에스엠': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'041510' },
  '태성': { sector:'2차전지소재', desc:'동박·전지소재', ticker:'323280' },
  '오스코텍': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'039200' },
  '씨젠': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'096530' },
  'LS마린솔루션': { sector:'조선·해양', desc:'선박평형수처리', ticker:'060370' },
  '에스앤에스텍': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'101490' },
  '큐리옥스바이오시스템즈': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'445680' },
  '케이엠더블유': { sector:'통신장비', desc:'5G 필터·안테나', ticker:'032500' },
  '하나머티리얼즈': { sector:'반도체·장비·소재', desc:'실리콘 부품', ticker:'166090' },
  '와이씨': { sector:'반도체·장비·소재', desc:'세정장비·부품', ticker:'232140' },
  '하림지주': { sector:'식품·음료', desc:'하림그룹 지주', ticker:'003380' },
  'HK이노엔': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'195940' },
  'SFA반도체': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'036540' },
  'LS머트리얼즈': { sector:'전기·소재', desc:'알루미늄전해콘덴서', ticker:'417200' },
  '루닛': { sector:'의료AI', desc:'AI 영상진단', ticker:'328130' },
  '인텔리안테크': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'189300' },
  '차바이오텍': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'085660' },
  '신성델타테크': { sector:'전기·전력기기·조선기계', desc:'전기차 부품·방열', ticker:'065350' },
  '코미코': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'183300' },
  '유일로보틱스': { sector:'로봇', desc:'로봇·자동화', ticker:'388720' },
  '레이크머티리얼즈': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'281740' },
  '제이앤티씨': { sector:'전자부품', desc:'카메라 커버글라스', ticker:'204270' },
  '필옵틱스': { sector:'반도체·장비·소재', desc:'레이저장비', ticker:'161580' },
  '클로봇': { sector:'로봇', desc:'로봇·자동화', ticker:'466100' },
  '피엔티': { sector:'기계·중공업', desc:'기계·중공업', ticker:'137400' },
  '원익QnC': { sector:'기계·중공업', desc:'기계·중공업', ticker:'074600' },
  '솔브레인홀딩스': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'036830' },
  '에스에프에이': { sector:'기계·중공업', desc:'기계·중공업', ticker:'056190' },
  '현대바이오': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'048410' },
  '덕산네오룩스': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'213420' },
  '제룡전기': { sector:'전기·전력기기·조선기계', desc:'전력기기·케이블·기계', ticker:'033100' },
  'CJ ENM': { sector:'게임·엔터·IT', desc:'미디어·엔터테인먼트', ticker:'035760' },
  '씨아이에스': { sector:'2차전지소재', desc:'전극공정장비', ticker:'222080' },
  '동국제약': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'086450' },
  '쏠리드': { sector:'통신장비', desc:'인빌딩 중계기', ticker:'050890' },
  '서울반도체': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'046890' },
  '카카오게임즈': { sector:'게임', desc:'게임 퍼블리싱', ticker:'293490' },
  '와이지엔터테인먼트': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'122870' },
  '성광벤드': { sector:'기계·부품', desc:'피팅류·배관부품', ticker:'014620' },
  '코나아이': { sector:'IT·소프트웨어', desc:'스마트카드·핀테크', ticker:'052400' },
  '지아이이노베이션': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'358570' },
  '코스메카코리아': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'241710' },
  '선익시스템': { sector:'반도체·장비·소재', desc:'OLED 증착장비', ticker:'171090' },
  '서부T&D': { sector:'부동산·리츠', desc:'개발·임대', ticker:'006730' },
  '스튜디오드래곤': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'253450' },
  '유진로봇': { sector:'로봇', desc:'로봇·자동화', ticker:'056080' },
  '다우데이타': { sector:'IT·소프트웨어', desc:'IT서비스·클라우드', ticker:'032190' },
  '나노신소재': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'121600' },
  '성일하이텍': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'365340' },
  '엔켐': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'348370' },
  '에프에스티': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'036810' },
  '원텍': { sector:'미용의료기기', desc:'의료레이저·에스테틱', ticker:'336570' },
  '미코': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'059090' },
  '안랩': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'053800' },
  '넥슨게임즈': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'225570' },
  'NHN KCP': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'060250' },
  '포스코엠텍': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'009520' },
  '젬백스': { sector:'바이오·제약', desc:'텔로머레이즈 신약', ticker:'082270' },
  '에코프로에이치엔': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'383310' },
  '넥스틴': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'348210' },
  '위메이드': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'112040' },
  '메디톡스': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'086900' },
  '가온칩스': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'399720' },
  '네오셈': { sector:'반도체·장비·소재', desc:'반도체 밸류체인', ticker:'253590' },
  '성우하이텍': { sector:'자동차·부품', desc:'자동차 밸류체인', ticker:'015750' },
  '동성화인텍': { sector:'화학·소재', desc:'보냉재·단열소재', ticker:'033500' },
  '디어유': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'376300' },
  '이녹스첨단소재': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'272290' },
  'SOOP': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'067160' },
  '카페24': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'042000' },
  '인카금융서비스': { sector:'금융', desc:'보험대리점·GA', ticker:'211050' },
  '현대힘스': { sector:'조선·해양', desc:'선박 블록제조', ticker:'460930' },
  '천보': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'278280' },
  '아이쓰리시스템': { sector:'방산·광학', desc:'적외선 탐지 센서', ticker:'214430' },
  '브이티': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'018290' },
  '아난티': { sector:'에너지·유틸리티·레저', desc:'에너지·레저', ticker:'025980' },
  '우리기술투자': { sector:'금융', desc:'벤처캐피탈·투자', ticker:'041190' },
  '감성코퍼레이션': { sector:'뷰티·화장품', desc:'화장품·K-뷰티', ticker:'036620' },
  '한글과컴퓨터': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'030520' },
  '시노펙스': { sector:'소재·필터', desc:'분리막·필터', ticker:'025320' },
  '큐렉소': { sector:'로봇', desc:'로봇·자동화', ticker:'060280' },
  '펌텍코리아': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'251970' },
  '메가스터디교육': { sector:'교육', desc:'온라인교육·입시', ticker:'215200' },
  '네오위즈': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'095660' },
  '동화기업': { sector:'소재·화학', desc:'합판·MDF·화학소재', ticker:'025900' },
  '제우스': { sector:'반도체·장비·소재', desc:'반도체 세정장비', ticker:'079370' },
  '웹젠': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'069080' },
  '위메이드맥스': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'101730' },
  '컴투스': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'078340' },
  '바이넥스': { sector:'바이오·제약·의료기기', desc:'헬스케어', ticker:'053030' },
  '엠로': { sector:'IT·소프트웨어', desc:'구매·SCM 솔루션', ticker:'058970' },
  '씨앤씨인터내셔널': { sector:'뷰티·화장품', desc:'화장품·뷰티', ticker:'352480' },
  '골프존': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'215000' },
  '콜마비앤에이치': { sector:'식품·음료', desc:'식품·소비재', ticker:'200130' },
  '셀바스AI': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'108860' },
  '솔트룩스': { sector:'IT·소프트웨어', desc:'IT서비스·보안', ticker:'304100' },
  '에코앤드림': { sector:'2차전지·소재', desc:'배터리 밸류체인', ticker:'101360' },
  '데브시스터즈': { sector:'게임·엔터·IT', desc:'콘텐츠·플랫폼', ticker:'194480' },
};

const STOCKS = [
  '삼성전자','SK하이닉스','SK스퀘어','삼성전기','현대차','LG에너지솔루션',
  '삼성생명','삼성물산','기아','HD현대중공업','삼성바이오로직스','두산에너빌리티',
  'KB금융','현대모비스','한화에어로스페이스','신한지주','SK','삼성SDI',
  'LG전자','NAVER','셀트리온','HD현대일렉트릭','LS ELECTRIC','하나금융지주',
  '효성중공업','한화오션','삼성화재','POSCO홀딩스','미래에셋증권','LG이노텍',
  '한미반도체','두산','고려아연','HD한국조선해양','SK텔레콤','LG화학',
  '한국전력','삼성중공업','우리금융지주','현대로템','HD현대','KT&G',
  '삼성에스디에스','현대오토에버','메리츠금융지주','HMM','SK이노베이션','LG',
  '카카오','포스코퓨처엠','기업은행','한화시스템','LIG디펜스앤에어로스페이스','에이피알',
  '현대글로비스','KT','현대건설','한국금융지주','한국항공우주','S-Oil',
  'LS','카카오뱅크','NH투자증권','크래프톤','삼성증권','포스코인터내셔널',
  'LG씨엔에스','한국타이어앤테크놀로지','HD현대마린솔루션','키움증권','DB손해보험','삼성E&A',
  '대한항공','대우건설','이수페타시스','하이브','삼양식품','한화',
  '한진칼','대한전선','두산로보틱스','SK바이오팜','산일전기','GS',
  'LG디스플레이','SKC','코웨이','아모레퍼시픽','두산밥캣','카카오페이',
  'LG유플러스','신세계','한화솔루션','유한양행','한미약품','NC',
  'BNK금융지주','엘앤에프','JB금융지주','오리온','삼성카드','OCI홀딩스',
  '롯데쇼핑','CJ','한전기술','한화엔진','한화생명','포스코DX',
  '현대제철','한온시스템','KCC','LG생활건강','에코프로머티','영원무역',
  '현대백화점','CJ제일제당','넷마블','SK바이오사이언스','F&F','현대해상',
  '한국가스공사','롯데케미칼','금호석유화학','한솔케미칼','현대엘리베이터','강원랜드',
  '에스엘','한국앤컴퍼니','농심','롯데지주','GS건설','DN오토모티브',
  '한올바이오파마','영원무역홀딩스','에스원','동서','팬오션','iM금융지주',
  '이마트','HL만도','BGF리테일','DL이앤씨','이수스페셜티케미컬','CJ대한통운',
  '코스맥스','한국콜마','코오롱인더','씨에스윈드','풍산','미스토홀딩스',
  'HD현대마린엔진','한전KPS','제일기획','한국카본','현대위아','한미사이언스',
  '호텔신라','GS리테일','아모레퍼시픽홀딩스','오리온홀딩스','세아베스틸지주','동원산업',
  '하이트진로','녹십자','SK아이이테크놀로지','DL','후성','롯데웰푸드',
  '대웅','태광산업','롯데정밀화학','롯데칠성','금호타이어','한일시멘트',
  '대웅제약','더블유게임즈','파라다이스','종근당','효성티앤씨','오뚜기',
  '미원상사','대한유화','세아제강지주','지역난방공사','대상','TKG휴켐스',
  '영풍','아세아','세방전지','HS효성첨단소재','동원시스템즈','에스디바이오센서',
  '한샘','녹십자홀딩스','GKL','율촌화학','미원에스씨','SK케미칼',
  '코스모화학','알테오젠','에코프로비엠','에코프로','레인보우로보틱스','주성엔지니어링',
  '리노공업','HLB','원익IPS','펩트론','삼천당제약','이오테크닉스',
  '에이비엘바이오','리가켐바이오','HPSP','서진시스템','심텍','로보티즈',
  '케어젠','피에스케이','디앤디파마텍','ISC','보로노이','제주반도체',
  '유진테크','테스','휴젤','파마리서치','하나마이크론','티씨케이',
  '클래시스','동진쎄미켐','피에스케이홀딩스','올릭스','솔브레인','펄어비스',
  '에스티팜','고영','두산테스나','티에스이','우리기술','테크윙',
  '실리콘투','에스피지','엘앤씨바이오','RFHIC','네이처셀','비에이치아이',
  '셀트리온제약','JYP Ent.','대주전자재료','파크시스템스','에스엠','태성',
  '오스코텍','씨젠','LS마린솔루션','에스앤에스텍','큐리옥스바이오시스템즈','케이엠더블유',
  '하나머티리얼즈','와이씨','하림지주','HK이노엔','SFA반도체','LS머트리얼즈',
  '루닛','인텔리안테크','차바이오텍','신성델타테크','코미코','유일로보틱스',
  '레이크머티리얼즈','제이앤티씨','필옵틱스','클로봇','피엔티','원익QnC',
  '솔브레인홀딩스','에스에프에이','현대바이오','덕산네오룩스','제룡전기','CJ ENM',
  '씨아이에스','동국제약','쏠리드','서울반도체','카카오게임즈','와이지엔터테인먼트',
  '성광벤드','코나아이','지아이이노베이션','코스메카코리아','선익시스템','서부T&D',
  '스튜디오드래곤','유진로봇','다우데이타','나노신소재','성일하이텍','엔켐',
  '에프에스티','원텍','미코','안랩','넥슨게임즈','NHN KCP',
  '포스코엠텍','젬백스','에코프로에이치엔','넥스틴','위메이드','메디톡스',
  '가온칩스','네오셈','성우하이텍','동성화인텍','디어유','이녹스첨단소재',
  'SOOP','카페24','인카금융서비스','현대힘스','천보','아이쓰리시스템',
  '브이티','아난티','우리기술투자','감성코퍼레이션','한글과컴퓨터','시노펙스',
  '큐렉소','펌텍코리아','메가스터디교육','네오위즈','동화기업','제우스',
  '웹젠','위메이드맥스','컴투스','바이넥스','엠로','씨앤씨인터내셔널',
  '골프존','콜마비앤에이치','셀바스AI','솔트룩스','에코앤드림','데브시스터즈',
];
const STOCKS_COMING = [];

// ════════════════════════════════════════
// Supabase 설정
// ════════════════════════════════════════
const SUPABASE_URL = 'https://evvygrrfkbudxexoxikd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dnlncnJma2J1ZHhleG94aWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NzE3MTEsImV4cCI6MjA5NjA0NzcxMX0.ei3_Jfv70jMX2NeJQ4k3RqmVbeXhqAsY8ofuK5I-_fg';

async function supabaseFetch(table, params) {
  const url = SUPABASE_URL + '/rest/v1/' + table + '?' + params;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    }
  });
  if (!res.ok) throw new Error('Supabase fetch 실패: ' + res.status);
  return res.json();
}

// 종목 주가 + 공시 로드 (Supabase)
async function loadStockFromSupabase(stockName) {
  const [prices, discs] = await Promise.all([
    supabaseFetch('prices', 'stock_name=eq.' + encodeURIComponent(stockName) + '&order=date.asc&select=date,open,high,low,close&limit=5000'),
    supabaseFetch('disclosures', 'stock_name=eq.' + encodeURIComponent(stockName) + '&order=date.asc&select=date,type,title,change,rcp_no&limit=5000')
  ]);
  return {
    prices: prices.map(p => p.open
      ? [p.date, p.open, p.high, p.low, p.close]
      : [p.date, p.close]
    ),
    disclosures: discs.map(d => ({
      date: d.date ? d.date.slice(0,10) : '',
      name: stockName,
      type: d.type || '기타',
      title: d.title || '',
      change: d.change != null ? String(d.change) : '0',
      rcpNo: d.rcp_no || ''
    }))
  };
}

const DATA_URL = '/stock_data.json';
const USE_SUPABASE = true; // Supabase 사용 여부

const TYPE_COLORS = {
  '실적발표': '#4d9fff',
  '배당':     '#00e5a0',
  '자사주':   '#a78bfa',
  '대규모계약':'#f97316',
  '투자결정': '#f5a623',
  '풍문해명': '#fb7185',
  '기타공시': '#334155'
};

let currentStock = null;
let chartInstance = null;
let allData = null;
let chartPrices = null;       // 현재 차트에 그려진 가격 배열(실시간 캔들 갱신용)
let chartDisclosures = null;  // 현재 차트의 공시 배열(실시간 재렌더용)
let todayCandleAdded = false; // 오늘 캔들이 차트에 추가됐는지
let patternOn = true; // 기본값 ON
let selectedType = null;
let activeTypeFilter = '전체';
let _zoomMin = 0, _zoomMax = 0, _zoomTotal = 0;

function _applyZoom() {
  if (!chartInstance) return;
  chartInstance.options.scales.x.min = _zoomMin;
  chartInstance.options.scales.x.max = _zoomMax;
  chartInstance.update('none');
  const mw = document.getElementById('minimapWrap');
  const mr = document.getElementById('minimapRange');
  if (mw && mr && _zoomTotal > 1) {
    mr.style.left = (_zoomMin / (_zoomTotal - 1) * 100) + '%';
    mr.style.width = ((_zoomMax - _zoomMin) / (_zoomTotal - 1) * 100) + '%';
  }
}

function renderButtons() {
  document.getElementById('stockBtns').innerHTML =
    STOCKS.map(s =>
      `<button class="stock-btn ${s===currentStock?'active':''}" onclick="selectStock('${s}')">${s}</button>`
    ).join('') +
    STOCKS_COMING.map(s =>
      `<button class="stock-btn stock-btn-coming" title="데이터 준비 중">${s} <span style="font-size:9px;opacity:0.5">준비중</span></button>`
    ).join('');
  setTimeout(updateArrows, 100);
}

function toggleStockInfo() {
  const t = document.getElementById('stockInfoTooltip');
  t.style.display = t.style.display === 'none' ? 'block' : 'none';
}
document.addEventListener('click', e => {
  if (!e.target.closest('.stock-section-header')) {
    const t = document.getElementById('stockInfoTooltip');
    if (t) t.style.display = 'none';
  }
});

function scrollStocks(dir) {
  const grid = document.getElementById('stockBtns');
  grid.scrollLeft += dir * 220;
  setTimeout(updateArrows, 150);
}

function updateArrows() {
  const grid = document.getElementById('stockBtns');
  const L = document.getElementById('arrowLeft');
  const R = document.getElementById('arrowRight');
  if (!grid) return;
  const canScroll = grid.scrollWidth > grid.clientWidth + 2;
  const atStart = grid.scrollLeft <= 2;
  const atEnd = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 2;
  if (L) L.classList.toggle('hidden', !canScroll || atStart);
  if (R) R.classList.toggle('hidden', !canScroll || atEnd);
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('stockBtns');
  if (grid) {
    grid.addEventListener('scroll', updateArrows);
    setTimeout(updateArrows, 300);

    // 클릭 후 좌/우 드래그로 스크롤
    let isDown = false, startX = 0, startScroll = 0, moved = 0;
    grid.addEventListener('mousedown', (e) => {
      isDown = true; moved = 0;
      startX = e.pageX;
      startScroll = grid.scrollLeft;
      grid.style.cursor = 'grabbing';
      grid.style.scrollBehavior = 'auto';
    });
    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      grid.style.cursor = '';
      grid.style.scrollBehavior = 'smooth';
      // 드래그였으면 직후 클릭(종목 선택) 1회 무시
      if (moved > 6) {
        const block = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
        grid.addEventListener('click', block, { capture: true, once: true });
        setTimeout(() => grid.removeEventListener('click', block, true), 50);
      }
      setTimeout(updateArrows, 150);
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      moved = Math.max(moved, Math.abs(dx));
      grid.scrollLeft = startScroll - dx;
    });
    grid.style.cursor = 'grab';
  }
});

let searchMatches = [];
let searchIdx = -1;
function filterStocks(q) {
  const dd = document.getElementById('stockSearchDropdown');
  const val = q.trim();
  searchMatches = [];
  searchIdx = -1;
  if (!val) { dd.classList.remove('open'); return; }
  // 공백으로 나눈 모든 단어가 종목명에 포함되면 매칭 (순서 무관)
  const words = val.toLowerCase().split(/\s+/).filter(Boolean);
  const matched = STOCKS.filter(s => {
    const name = s.toLowerCase();
    return words.every(w => name.includes(w));
  });
  if (!matched.length) { dd.innerHTML = '<div class="stock-search-opt" style="color:var(--text3)">검색 결과 없음</div>'; dd.classList.add('open'); return; }
  searchMatches = matched;
  // 입력한 각 단어를 하이라이트
  const re = new RegExp('(' + words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|') + ')', 'gi');
  dd.innerHTML = matched.map((s, i) =>
    `<div class="stock-search-opt" data-idx="${i}" onclick="selectFromSearch('${s}')" onmousemove="setSearchIdx(${i})">${s.replace(re,'<mark>$1</mark>')}</div>`
  ).join('');
  dd.classList.add('open');
}

function setSearchIdx(i) {
  searchIdx = i;
  const dd = document.getElementById('stockSearchDropdown');
  dd.querySelectorAll('.stock-search-opt').forEach((el, idx) => {
    el.classList.toggle('active', idx === searchIdx);
  });
}

function handleSearchKey(e) {
  const dd = document.getElementById('stockSearchDropdown');
  if (!dd.classList.contains('open') || !searchMatches.length) {
    if (e.key === 'Enter' && searchMatches[0]) selectFromSearch(searchMatches[0]);
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    searchIdx = (searchIdx + 1) % searchMatches.length;
    updateSearchHighlight();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    searchIdx = (searchIdx - 1 + searchMatches.length) % searchMatches.length;
    updateSearchHighlight();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const pick = searchIdx >= 0 ? searchMatches[searchIdx] : searchMatches[0];
    if (pick) selectFromSearch(pick);
  } else if (e.key === 'Escape') {
    dd.classList.remove('open');
  }
}

function updateSearchHighlight() {
  const dd = document.getElementById('stockSearchDropdown');
  const opts = dd.querySelectorAll('.stock-search-opt');
  opts.forEach((el, idx) => el.classList.toggle('active', idx === searchIdx));
  if (searchIdx >= 0 && opts[searchIdx]) {
    opts[searchIdx].scrollIntoView({ block: 'nearest' });
  }
}

function selectFromSearch(name) {
  document.getElementById('stockSearch').value = '';
  document.getElementById('stockSearchDropdown').classList.remove('open');
  selectStock(name);
}

document.addEventListener('click', e => {
  if (!e.target.closest('.stock-search-wrap')) {
    document.getElementById('stockSearchDropdown').classList.remove('open');
  }
});

async function selectStock(name) {
  currentStock = name;
  patternOn = true;
  selectedType = null;
  activeTypeFilter = '전체';

  // URL을 현재 종목으로 갱신 (새로고침 없이, 공유·북마크용)
  try {
    var u = new URL(window.location);
    u.searchParams.set('stock', name);
    history.replaceState(null, '', u);
  } catch (e) {}

  document.getElementById('patternToggle').checked = true;
  const lbl = document.getElementById('toggleLabel');
  lbl.textContent = '패턴 복기 ON';
  lbl.classList.add('active');
  document.getElementById('patternSelectWrap').classList.add('visible');
  document.getElementById('legendPattern').style.display = 'flex';

  renderButtons();
  document.getElementById('currentStockName').textContent = name;
  const meta = STOCK_META[name] || {};
  document.getElementById('stockSector').textContent = meta.sector || '—';
  document.getElementById('stockDesc').textContent = meta.desc || '—';
  document.getElementById('stockTicker').textContent = meta.ticker ? meta.ticker + (KQ_CODES.has(meta.ticker) ? '.KQ' : '.KS') : '—';

  // 로딩 표시
  document.getElementById('chartContainer').innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  let prices, disclosures;
  if (typeof USE_SUPABASE !== 'undefined' && USE_SUPABASE) {
    try {
      const data = await loadStockFromSupabase(name);
      // Supabase 데이터를 allData에 캐시
      allData.prices[name] = data.prices;
      const existingDiscs = allData.disclosures.filter(d => d.name !== name);
      allData.disclosures = [...existingDiscs, ...data.disclosures];
    } catch(e) {
      console.warn('Supabase 로드 실패, 로컬 데이터 사용:', e);
    }
  }

  prices = (allData.prices[name]||[]).map(p=>p.length===5?{date:p[0],open:p[1],high:p[2],low:p[3],close:p[4],price:p[4]}:{date:p[0],price:p[1],close:p[1]});
  disclosures = allData.disclosures.filter(d=>d.name===name);
  chartPrices = prices;        // 실시간 캔들 갱신이 참조할 배열
  chartDisclosures = disclosures;
  todayCandleAdded = false;    // 새 종목이므로 오늘 캔들 초기화
  window._lastShownPrice = null; // 굴림 방향 비교용 직전가 리셋(다른 종목과 비교 방지)

  // 장중이면 현재가 요청을 '먼저' 출발시킨다(렌더링과 병렬). 응답이 오면
  // applyRealtimePrice가 가격 텍스트 + 차트 마지막 캔들을 갱신.
  const marketOpenNow = (typeof isMarketOpen === 'function' && isMarketOpen());
  if (marketOpenNow) fetchRealtime();
  if (prices.length > 0) {
    const latest = prices[prices.length-1];
    const prev = prices[prices.length-2];
    const latestEl = document.getElementById('latestPrice');
    const numEl = document.getElementById('latestPriceNum');
    const wonEl = document.getElementById('latestPriceWon');
    const pcEl = document.getElementById('priceChange');
    const priceStr = fmtPriceComma(latest.price);
    if (numEl) flipNumber(numEl, priceStr, 0);   // 애니메이션 없이 초기 표시
    if (wonEl) wonEl.textContent = '원';
    if (marketOpenNow) {
      // 장중: 직전 종가를 흐리게 먼저 보여주고, 현재가 오면 또렷하게 교체.
      if (latestEl) latestEl.style.opacity = '0.45';
      if (pcEl) pcEl.style.opacity = '0.45';
    } else {
      if (latestEl) latestEl.style.opacity = '1';
      if (prev) {
        const chg = ((latest.price-prev.price)/prev.price*100).toFixed(2);
        if (pcEl) {
          pcEl.textContent = (chg>0?'▲ +':'▼ ')+Math.abs(chg)+'%';
          pcEl.className = 'price-change '+(chg>=0?'up':'down');
          pcEl.style.opacity = '1';
        }
      }
    }
  }

  // 공시 유형 버튼 렌더링
  const types = [...new Set(disclosures.map(d=>d.type).filter(Boolean))];
  document.getElementById('patternSelectWrap').innerHTML =
    `<span class="type-label-small">공시 유형</span>` +
    types.map(t =>
      `<button class="type-btn ${selectedType===t?'active':''}" onclick="selectPatternType('${t}')">${t}</button>`
    ).join('');

  renderChart(prices, disclosures, null);
  renderTable(disclosures);
  renderTypeFilter(disclosures);
  renderStatsPanel(disclosures);
  renderThermometer(disclosures);
  renderHook(disclosures);
  // 기업분석 탭이 열려있으면 새 종목으로 갱신
  if (activeTab === 'company') renderCompany(currentStock);

  // 차트 기본 선택 유형 = Hook 카드 유형(가장 최근 공시 유형)과 일치.
  // renderHook이 위에서 window._hookType을 세팅함. 없으면 사례수 최다로 폴백.
  if (types.length > 0) {
    let chosen = (window._hookType && types.indexOf(window._hookType) !== -1) ? window._hookType : null;
    if (!chosen) {
      let bestType = types[0], bestCount = -1;
      types.forEach(t => {
        const cnt = disclosures.filter(d => d.type === t).length;
        if (cnt > bestCount) { bestCount = cnt; bestType = t; }
      });
      chosen = bestType;
    }
    selectedType = chosen;
    document.getElementById('patternSelectWrap').classList.add('visible');
    document.querySelectorAll('.type-btn').forEach(b => {
      b.classList.toggle('active', b.textContent === selectedType);
    });
    applyPattern();
  }

  // 뉴스 브리핑 비동기 호출
  fetchNewsBriefing(name);
}

function togglePattern() {
  patternOn = document.getElementById('patternToggle').checked;
  const label = document.getElementById('toggleLabel');
  if (patternOn) {
    label.textContent = '패턴 복기 ON';
    label.classList.add('active');
    document.getElementById('patternSelectWrap').classList.add('visible');
    document.getElementById('legendPattern').style.display = 'flex';
    // OFF 때 보존해둔 유형 복원 (없으면 Hook 유형/첫 유형)
    if (!selectedType && window._lastSelectedType) selectedType = window._lastSelectedType;
    if (!selectedType) {
      const types = [...new Set(allData.disclosures.filter(d=>d.name===currentStock).map(d=>d.type).filter(Boolean))];
      if (window._hookType && types.indexOf(window._hookType)!==-1) selectedType = window._hookType;
      else if (types.length) selectedType = types[0];
    }
    if (selectedType) {
      document.querySelectorAll('.type-btn').forEach(b => {
        b.classList.toggle('active', b.textContent === selectedType);
      });
      applyPattern();
    }
  } else {
    label.textContent = '패턴 복기';
    label.classList.remove('active');
    document.getElementById('legendPattern').style.display = 'none';
    window._lastSelectedType = selectedType;  // 다시 켤 때 복원용으로 기억
    // 유형 버튼(patternSelectWrap)·통계(patternStats)·mentorCard는 끄지 않고 유지.
    // 선택 유형 점은 그대로 보이되, 패턴 평균선만 제거.
    const prices = (allData.prices[currentStock]||[]).map(p=>p.length===5?{date:p[0],open:p[1],high:p[2],low:p[3],close:p[4],price:p[4]}:{date:p[0],price:p[1],close:p[1]});
    const disclosures = allData.disclosures.filter(d=>d.name===currentStock);
    renderChart(prices, disclosures, null);
  }
}

function selectPatternType(type) {
  selectedType = type;
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === type);
  });
  applyPattern();
}

function applyPattern() {
  if (!currentStock || !selectedType) return;
  const prices = (allData.prices[currentStock]||[]).map(p=>p.length===5?{date:p[0],open:p[1],high:p[2],low:p[3],close:p[4],price:p[4]}:{date:p[0],price:p[1],close:p[1]});
  const disclosures = allData.disclosures.filter(d=>d.name===currentStock);
  const typeDiscs = disclosures.filter(d=>d.type===selectedType);

  // 멘토 해석 카드 갱신 (선택된 공시 유형 기준)
  renderMentorCard(prices, disclosures, selectedType);

  const changes = typeDiscs.map(d=>{
    const raw = String(d.change).replace('%','').trim();
    const v = parseFloat(raw);
    return Math.abs(v)<1 ? v*100 : v;
  }).filter(v=>!isNaN(v));

  if (changes.length === 0) {
    document.getElementById('patternInfo').textContent = '데이터 없음';
    return;
  }

  const avg = changes.reduce((a,b)=>a+b,0)/changes.length;
  const upCount = changes.filter(v=>v>=0).length;
  const upRate = (upCount/changes.length*100).toFixed(0);
  const maxV = Math.max(...changes);
  const minV = Math.min(...changes);

  document.getElementById('statCount').textContent = changes.length+'건';
  const avgEl = document.getElementById('statAvg');
  avgEl.textContent = (avg>=0?'+':'')+avg.toFixed(2)+'%';
  avgEl.className = 'stat-pill-val '+(avg>=0?'up':'down');
  document.getElementById('statUp').textContent = upRate+'%';
  document.getElementById('statMax').textContent = '+'+maxV.toFixed(2)+'%';
  document.getElementById('statMin').textContent = minV.toFixed(2)+'%';
  document.getElementById('patternStats').classList.add('visible');
  document.getElementById('patternInfo').textContent = `${selectedType} ${changes.length}건`;

  const dateList = prices.map(p=>p.date);
  const windows = [];
  typeDiscs.forEach(d=>{
    const idx = dateList.indexOf(d.date);
    if (idx<5 || idx>dateList.length-11) return;
    const base = prices[idx-1]?.price;
    if (!base) return;
    const w = [];
    for (let k=-5; k<=10; k++) {
      const p = prices[idx+k]?.price;
      w.push(p ? (p-base)/base*100 : null);
    }
    windows.push(w);
  });

  const avgWindow = Array(16).fill(0).map((_,i)=>{
    const vals = windows.map(w=>w[i]).filter(v=>v!==null);
    return vals.length>0 ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
  });

  const patternData = new Array(prices.length).fill(null);
  typeDiscs.forEach(d=>{
    const idx = dateList.indexOf(d.date);
    if (idx<5 || idx>prices.length-11) return;
    const base = prices[idx-1]?.price;
    if (!base) return;
    for (let k=-5; k<=10; k++) {
      const pi = idx+k;
      if (pi<0 || pi>=prices.length) continue;
      const avgPct = avgWindow[k+5];
      if (avgPct===null) continue;
      const pp = base*(1+avgPct/100);
      if (patternData[pi]===null) patternData[pi] = pp;
      else patternData[pi] = (patternData[pi]+pp)/2;
    }
  });

  renderChart(prices, disclosures, patternOn ? patternData : null);
}

function renderChart(prices, disclosures, patternData) {
  const container = document.getElementById('chartContainer');
  container.innerHTML = '<canvas id="myChart"></canvas>';
  if (window._pulseRAF) { cancelAnimationFrame(window._pulseRAF); window._pulseRAF = null; }
  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
  if (!prices.length) { container.innerHTML='<div class="error">주가 데이터 없음</div>'; return; }

  const discMap = {};
  disclosures.forEach(d=>{ if(!discMap[d.date]) discMap[d.date]=[]; discMap[d.date].push(d); });

  const datasets = [
    {
      label:'종가',
      data:prices.map(p=>p.price),
      borderColor:'#00e5a0',
      borderWidth:1.5,
      pointRadius:0,
      pointHoverRadius:5,
      pointHoverBackgroundColor:'#00e5a0',
      pointHoverBorderColor:'#07090d',
      pointHoverBorderWidth:2,
      fill:true,
      backgroundColor: ctx=>{
        const g=ctx.chart.ctx.createLinearGradient(0,0,0,440);
        g.addColorStop(0,'rgba(0,229,160,0.12)');
        g.addColorStop(0.6,'rgba(0,229,160,0.02)');
        g.addColorStop(1,'rgba(0,229,160,0)');
        return g;
      },
      tension:0.3, order:2
    },
    {
      label:'공시',
      data:prices.map(p=>{
        if(!discMap[p.date]) return null;
        if(selectedType && !discMap[p.date].some(d=>d.type===selectedType)) return null;
        return p.price;
      }),
      borderColor:'transparent',
      backgroundColor:'rgba(0,229,160,0.3)',
      borderColor2:'#00e5a0',
      pointRadius:prices.map(p=>{
        if(!discMap[p.date]) return 0;
        if(selectedType && !discMap[p.date].some(d=>d.type===selectedType)) return 0;
        return 5;
      }),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgba(0,229,160,0.25)',
      pointBorderColor: '#00e5a0',
      pointBorderWidth: 1.5,
      pointHoverRadius:7,
      pointHoverBackgroundColor:'rgba(0,229,160,0.4)',
      pointHoverBorderColor:'#00e5a0',
      showLine:false, order:1
    }
  ];

  if (patternData) {
    datasets.push({
      label:'패턴평균',
      data:patternData,
      borderColor:'#f6ad55',
      borderWidth:2.5,
      pointRadius:0,
      pointHoverRadius:4,
      pointHoverBackgroundColor:'#f6ad55',
      fill:false,
      tension:0.3, order:0
    });
  }

  // 공시 마커 pulse 애니메이션
  let pulsePhase = 0;
  let pulseRAF = null;
  function animatePulse() {
    pulsePhase = (pulsePhase + 0.05) % (Math.PI * 2);
    if (chartInstance) chartInstance.draw();
    pulseRAF = window._pulseRAF = requestAnimationFrame(animatePulse);
  }
  if (window._pulseRAF) cancelAnimationFrame(window._pulseRAF);
  window._pulseRAF = requestAnimationFrame(animatePulse);
  pulseRAF = window._pulseRAF;

  const discLinePlugin = {
    id: 'discLine',
    beforeDatasetsDraw(chart) {
      // ── 캔들차트 렌더링 ──
      const cd = chart._candleData;
      if (!cd || !cd.length) return;
      const { ctx, scales, chartArea } = chart;
      const xScale = scales.x, yScale = scales.y;
      const n = chart.data.labels.length;
      // 봉 너비: 전체 차트 폭 / 데이터 수 * 0.6
      const barW = Math.max(1, (chartArea.right - chartArea.left) / n * 0.55);
      ctx.save();
      for (let i = 0; i < cd.length; i++) {
        const c = cd[i];
        if (!c) continue;
        const x = xScale.getPixelForValue(i);
        const yO = yScale.getPixelForValue(c.o);
        const yC = yScale.getPixelForValue(c.c);
        const yH = yScale.getPixelForValue(c.h);
        const yL = yScale.getPixelForValue(c.l);
        const isUp = c.c >= c.o;
        const color = isUp ? '#3182ce' : '#e53e3e';
        // 심지(wick)
        ctx.beginPath();
        ctx.moveTo(x, yH);
        ctx.lineTo(x, yL);
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(0.8, barW * 0.15);
        ctx.stroke();
        // 몸통(body)
        const bodyTop = Math.min(yO, yC);
        const bodyH = Math.max(1, Math.abs(yO - yC));
        ctx.fillStyle = isUp ? 'rgba(49,130,206,0.85)' : 'rgba(229,62,62,0.85)';
        ctx.fillRect(x - barW/2, bodyTop, barW, bodyH);
      }
      ctx.restore();
    },
    afterDatasetsDraw(chart) {
      // 공시 pulse 그리기
      const { ctx, scales } = chart;
      const ds1 = chart.data.datasets[1];
      if (!ds1) return;
      chart.data.labels.forEach((label, i) => {
        if (!discMap[label]) return;
        // 유형이 선택된 경우, 그 유형을 포함한 공시만 점 표시 (나머지는 숨김)
        const sel = (typeof selectedType !== 'undefined' && selectedType);
        if (sel && !discMap[label].some(d=>d.type===selectedType)) return;
        const x = scales.x.getPixelForValue(i);
        const y = scales.y.getPixelForValue(ds1.data[i]);
        if (!y || isNaN(y)) return;
        const pulse = 0.5 + 0.5 * Math.sin(pulsePhase);
        const radius = 5 + pulse * 3.5; // 5~8.5
        const alpha = 0.08 + pulse * 0.12;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,160,${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,160,0.85)';
        ctx.fill();
        ctx.restore();
      });
    },
    afterDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      const hoveredIdx = chart._hoveredIndex;
      if (hoveredIdx == null) return;
      const label = chart.data.labels[hoveredIdx];
      if (!discMap[label]) return;
      const x = scales.x.getPixelForValue(hoveredIdx);
      ctx.save();
      // 흰색 반투명 세로 바 인디케이터 (초록 원보다 두껍게)
      const barW = 6;
      const grad = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      grad.addColorStop(0, 'rgba(255,255,255,0.02)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.16)');
      grad.addColorStop(1, 'rgba(255,255,255,0.02)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - barW/2, chartArea.top, barW, chartArea.bottom - chartArea.top);
      // 중앙 밝은 코어 라인
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();
    }
  };

  const canvas = document.getElementById('myChart');
  canvas.style.cursor = 'crosshair';

  const total = prices.length;
  _zoomTotal = total;
  _zoomMin = 0;
  _zoomMax = total - 1;

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  let zoomMin = 0, zoomMax = total - 1;

  function setZoom(mn, mx) {
    zoomMin = mn; zoomMax = mx;
    _zoomMin = mn; _zoomMax = mx;
  }

  const ctx = canvas.getContext('2d');
  // OHLC 데이터 준비
  const ohlcArr = prices.map(p => (p.open != null && p.open > 0) ? {o:p.open, h:p.high, l:p.low, c:p.close} : null);
  const useCandle = ohlcArr.some(d => d !== null);
  if (useCandle && datasets[0]) {
    datasets[0].data = prices.map(p => p.close);
    datasets[0].borderColor = 'transparent';
    datasets[0].backgroundColor = 'transparent';
    datasets[0].pointRadius = 0;
    datasets[0].pointHoverRadius = 0;
    datasets[0].fill = false;
  }

  chartInstance = new Chart(ctx, {
    type:'line',
    data:{ labels:prices.map(p=>p.date), datasets },
    options:{
      responsive:true,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{enabled:false, external:ctx=>externalTooltip(ctx,discMap,patternData,prices)}
      },
      scales:{
        x:{
          ticks:{color:'#7a8fa3',font:{family:'Inter',size:12},maxTicksLimit:10,maxRotation:0},
          grid:{color:'rgba(255,255,255,0.05)'},
          border:{color:'rgba(255,255,255,0.07)'}
        },
        y:{
          min: (useCandle && prices.some(p=>p.low)) ? Math.min(...prices.filter(p=>p.low>0).map(p=>p.low)) * 0.99 : undefined,
          max: (useCandle && prices.some(p=>p.high)) ? Math.max(...prices.filter(p=>p.high>0).map(p=>p.high)) * 1.01 : undefined,
          ticks:{color:'#8a9fb3',font:{family:'Inter',size:12},
            callback:v=>v>=10000000?(v/10000000).toFixed(1)+'천만':v>=1000000?(v/10000).toFixed(0)+'만':v>=10000?(v/10000).toFixed(1)+'만':v.toLocaleString()
          },
          grid:{color:'rgba(255,255,255,0.05)'},
          border:{color:'rgba(255,255,255,0.07)'}
        }
      }
    },
    plugins:[discLinePlugin]
  });
  if (useCandle) chartInstance._candleData = ohlcArr;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    if (chartInstance) chartInstance._mouseY = e.clientY - rect.top;
    const pts = chartInstance.getElementsAtEventForMode(e, 'index', {intersect:false}, true);
    chartInstance._hoveredIndex = pts.length ? pts[0].index : null;
    chartInstance.draw();
  });
  canvas.addEventListener('mouseleave', () => {
    if (chartInstance) chartInstance._mouseY = null;
    chartInstance._hoveredIndex = null;
    chartInstance.draw();
  });

  canvas.addEventListener('click', e => {
    const pts = chartInstance.getElementsAtEventForMode(e, 'index', {intersect:false}, true);
    if (!pts.length) return;
    const idx = pts[0].index;
    const clickedDate = prices[idx]?.date;
    if (!clickedDate || !discMap[clickedDate]) return;
    // 테이블 패널로 스크롤
    const tablePanel = document.querySelector('.table-panel');
    if (tablePanel) tablePanel.scrollIntoView({behavior:'smooth', block:'start'});
    // 해당 날짜 행 하이라이트
    setTimeout(() => {
      const rows = document.querySelectorAll('#tableContainer tbody tr');
      rows.forEach(row => {
        const dateCell = row.querySelector('.td-date');
        if (dateCell && dateCell.textContent.trim() === clickedDate) {
          row.classList.remove('disc-highlight');
          void row.offsetWidth; // reflow
          row.classList.add('disc-highlight');
          row.scrollIntoView({behavior:'smooth', block:'center'});
          setTimeout(() => row.classList.remove('disc-highlight'), 4000);
        }
      });
    }, 400);
  });

  // 모바일 핀치줌
  let pinchDist = null;
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      pinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && pinchDist !== null) {
      e.preventDefault();
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = pinchDist / newDist;
      pinchDist = newDist;
      const range = zoomMax - zoomMin;
      const center = Math.round((zoomMin + zoomMax) / 2);
      let newRange = clamp(Math.round(range * scale), 20, total - 1);
      let newMin = Math.round(center - newRange / 2);
      let newMax = newMin + newRange;
      if (newMin < 0) { newMin = 0; newMax = newRange; }
      if (newMax >= total) { newMax = total - 1; newMin = newMax - newRange; }
      setZoom(clamp(newMin,0,total-1), clamp(newMax,0,total-1));
      _applyZoom();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', () => { pinchDist = null; });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const range = zoomMax - zoomMin;
    if (e.ctrlKey || e.metaKey) {
      const rect = canvas.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const center = Math.round(zoomMin + range * ratio);
      const factor = e.deltaY > 0 ? 1.15 : 0.87;
      let newRange = clamp(Math.round(range * factor), 20, total - 1);
      let newMin = Math.round(center - newRange * ratio);
      let newMax = newMin + newRange;
      if (newMin < 0) { newMin = 0; newMax = newRange; }
      if (newMax >= total) { newMax = total - 1; newMin = newMax - newRange; }
      setZoom(clamp(newMin,0,total-1), clamp(newMax,0,total-1));
    } else {
      const step = Math.max(1, Math.round(range * 0.05));
      const dir = e.deltaY > 0 ? step : -step;
      let newMin = zoomMin + dir, newMax = zoomMax + dir;
      if (newMin < 0) { newMin = 0; newMax = range; }
      if (newMax >= total) { newMax = total - 1; newMin = newMax - range; }
      setZoom(newMin, newMax);
    }
    _applyZoom();
  }, { passive: false });

  let dragStart = null, dragZoomMin = null, dragZoomMax = null;
  canvas.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    dragStart = e.clientX; dragZoomMin = zoomMin; dragZoomMax = zoomMax;
    canvas.style.cursor = 'grabbing';
  });
  // ── 뉴스 브리핑 (Claude API + 웹서치) ──
let newsAbortController = null;
let lastNewsStock = null;

async function fetchNewsBriefing(stockName) {
  if (lastNewsStock === stockName) return;
  lastNewsStock = stockName;

  const body = document.getElementById('newsBriefingBody');
  const sub = document.getElementById('newsPanelSub');
  if (!body || !sub) return;
  sub.textContent = stockName + ' — AI 뉴스 분석 중...';
  body.innerHTML = '<div class="news-loading"><div class="news-spinner"></div>관련 뉴스를 수집하고 있습니다...</div>';

  if (newsAbortController) newsAbortController.abort();
  newsAbortController = new AbortController();

  try {
    const today = new Date().toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'});
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: newsAbortController.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: `당신은 한국 주식 뉴스 전문 애널리스트입니다. 오늘(${today}) 기준으로 해당 종목의 최신 뉴스를 검색하여 투자자에게 유용한 핵심 내용만 한국어로 요약해 주세요.
응답은 반드시 아래 JSON 형식만 출력하세요. 마크다운이나 다른 텍스트 없이 JSON만:
{"summary":"2-3문장 핵심 요약 (투자 관점에서 가장 중요한 내용)","items":[{"title":"뉴스 제목","source":"언론사명","sentiment":"up|down|neutral"},{"title":"뉴스 제목2","source":"언론사명","sentiment":"up|down|neutral"},{"title":"뉴스 제목3","source":"언론사명","sentiment":"up|down|neutral"}]}`,
        messages: [{ role: 'user', content: `${stockName} 오늘 최신 뉴스 3건과 핵심 요약을 알려주세요.` }]
      })
    });

    if (!resp.ok) throw new Error('API 오류');
    const data = await resp.json();

    // content 블록에서 text 타입 찾기
    const textBlock = data.content?.find(c => c.type === 'text');
    if (!textBlock) throw new Error('응답 없음');

    let parsed;
    try {
      const clean = textBlock.text.replace(/```json|```/g,'').trim();
      parsed = JSON.parse(clean);
    } catch(e) {
      throw new Error('파싱 실패');
    }

    sub.textContent = stockName + ' — ' + today + ' 기준';

    const sentColor = { up: 'var(--up)', down: 'var(--down)', neutral: 'var(--text3)' };
    const sentLabel = { up: '▲', down: '▼', neutral: '—' };

    let html = '';
    if (parsed.summary) {
      html += `<div class="news-summary">${parsed.summary}</div>`;
    }
    if (parsed.items?.length) {
      html += '<div class="news-items">';
      parsed.items.forEach(item => {
        const sc = sentColor[item.sentiment] || 'var(--text3)';
        const sl = sentLabel[item.sentiment] || '—';
        html += `<div class="news-item">
          <div class="news-item-title">${item.title}</div>
          <div class="news-item-meta">
            <span class="news-item-source">${item.source||'—'}</span>
            <span style="color:${sc};font-weight:600">${sl}</span>
          </div>
        </div>`;
      });
      html += '</div>';
    }
    body.innerHTML = html || '<div class="news-error">뉴스를 불러올 수 없습니다.</div>';

  } catch(e) {
    if (e.name === 'AbortError') return;
    sub.textContent = stockName + ' — 브리핑 불가';
    body.innerHTML = '<div class="news-error">뉴스 로딩 실패. 잠시 후 종목을 다시 선택해주세요.</div>';
  }
}

document.addEventListener('mousemove', e => {
    if (dragStart === null) return;
    const rect = canvas.getBoundingClientRect();
    const range = dragZoomMax - dragZoomMin;
    const pxPerBar = rect.width / (range + 1);
    const delta = Math.round((dragStart - e.clientX) / pxPerBar);
    let newMin = dragZoomMin + delta, newMax = dragZoomMax + delta;
    if (newMin < 0) { newMin = 0; newMax = range; }
    if (newMax >= total) { newMax = total - 1; newMin = newMax - range; }
    setZoom(newMin, newMax);
    _applyZoom();
  });
  document.addEventListener('mouseup', () => {
    if (dragStart !== null) { dragStart = null; canvas.style.cursor = 'crosshair'; }
  });
  canvas.addEventListener('dblclick', () => { setZoom(0, total-1); _applyZoom(); });

  // 미니맵
  let minimapWrap = document.getElementById('minimapWrap');
  if (!minimapWrap) {
    minimapWrap = document.createElement('div');
    minimapWrap.id = 'minimapWrap';
    minimapWrap.style.cssText = 'margin:0 20px 12px;height:28px;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.07);border-radius:4px;position:relative;cursor:pointer;overflow:hidden;';
    const minimapCanvas = document.createElement('canvas');
    minimapCanvas.id = 'minimapCanvas';
    minimapCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    minimapWrap.appendChild(minimapCanvas);
    const minimapRange = document.createElement('div');
    minimapRange.id = 'minimapRange';
    minimapRange.style.cssText = 'position:absolute;top:0;bottom:0;background:rgba(0,229,160,0.1);border-left:2px solid #00e5a0;border-right:2px solid #00e5a0;cursor:grab;box-sizing:border-box;';
    minimapWrap.appendChild(minimapRange);
    document.querySelector('.chart-body').parentNode.insertBefore(minimapWrap, document.querySelector('.chart-body').nextSibling);
  }

  const minimapCanvas = document.getElementById('minimapCanvas');
  const minimapRange = document.getElementById('minimapRange');

  function drawMinimap() {
    const w = minimapWrap.offsetWidth, h = 32;
    minimapCanvas.width = w; minimapCanvas.height = h;
    const mctx = minimapCanvas.getContext('2d');
    mctx.clearRect(0,0,w,h);
    if (!prices.length) return;
    const vals = prices.map(p=>p.price);
    const minV = Math.min(...vals), maxV = Math.max(...vals);
    const scaleX = w/(total-1), scaleY = (h-4)/(maxV-minV||1);
    mctx.beginPath();
    vals.forEach((v,i)=>{
      const x = i*scaleX, y = h-2-(v-minV)*scaleY;
      i===0?mctx.moveTo(x,y):mctx.lineTo(x,y);
    });
    mctx.strokeStyle = 'rgba(0,229,160,0.4)';
    mctx.lineWidth = 1;
    mctx.stroke();
  }

  if (!minimapWrap._eventsAttached) {
    minimapWrap._eventsAttached = true;
    let mmDrag = null;
    minimapRange.addEventListener('mousedown', e => {
      e.stopPropagation();
      mmDrag = {startX:e.clientX, startMin:_zoomMin, startMax:_zoomMax};
      minimapRange.style.cursor = 'grabbing';
    });
    minimapWrap.addEventListener('mousedown', e => {
      if (mmDrag) return;
      const rect = minimapWrap.getBoundingClientRect();
      const ratio = (e.clientX-rect.left)/rect.width;
      const clickIdx = Math.round(ratio*(_zoomTotal-1));
      const range = _zoomMax - _zoomMin;
      let newMin = Math.round(clickIdx-range/2), newMax = newMin+range;
      if (newMin<0){newMin=0;newMax=range;}
      if (newMax>=_zoomTotal){newMax=_zoomTotal-1;newMin=newMax-range;}
      _zoomMin=Math.max(0,newMin); _zoomMax=Math.min(_zoomTotal-1,newMax);
      _applyZoom();
    });

    // 미니맵 터치 이벤트 (모바일)
    minimapRange.addEventListener('touchstart', e => {
      e.stopPropagation();
      const t = e.touches[0];
      mmDrag = {startX:t.clientX, startMin:_zoomMin, startMax:_zoomMax};
      e.preventDefault();
    }, {passive:false});
    minimapWrap.addEventListener('touchstart', e => {
      if (mmDrag) return;
      const t = e.touches[0];
      const rect = minimapWrap.getBoundingClientRect();
      const ratio = (t.clientX-rect.left)/rect.width;
      const clickIdx = Math.round(ratio*(_zoomTotal-1));
      const range = _zoomMax - _zoomMin;
      let newMin = Math.round(clickIdx-range/2), newMax = newMin+range;
      if (newMin<0){newMin=0;newMax=range;}
      if (newMax>=_zoomTotal){newMax=_zoomTotal-1;newMin=newMax-range;}
      _zoomMin=Math.max(0,newMin); _zoomMax=Math.min(_zoomTotal-1,newMax);
      _applyZoom();
      e.preventDefault();
    }, {passive:false});
    document.addEventListener('touchmove', e => {
      if (!mmDrag) return;
      const t = e.touches[0];
      const rect = minimapWrap.getBoundingClientRect();
      const range = mmDrag.startMax - mmDrag.startMin;
      const barPx = rect.width / (_zoomTotal-1);
      const barDelta = Math.round((t.clientX-mmDrag.startX)/barPx);
      let newMin = mmDrag.startMin+barDelta, newMax = mmDrag.startMax+barDelta;
      if (newMin<0){newMin=0;newMax=range;}
      if (newMax>=_zoomTotal){newMax=_zoomTotal-1;newMin=newMax-range;}
      _zoomMin=newMin; _zoomMax=newMax; _applyZoom();
      e.preventDefault();
    }, {passive:false});
    document.addEventListener('touchend', () => { if(mmDrag) mmDrag=null; });
    
document.addEventListener('mousemove', e => {
      if (!mmDrag) return;
      const rect = minimapWrap.getBoundingClientRect();
      const range = mmDrag.startMax-mmDrag.startMin;
      const barPx = rect.width/(_zoomTotal-1);
      const barDelta = Math.round((e.clientX-mmDrag.startX)/barPx);
      let newMin = mmDrag.startMin+barDelta, newMax = mmDrag.startMax+barDelta;
      if (newMin<0){newMin=0;newMax=range;}
      if (newMax>=_zoomTotal){newMax=_zoomTotal-1;newMin=newMax-range;}
      _zoomMin=newMin; _zoomMax=newMax; _applyZoom();
    });
    document.addEventListener('mouseup', ()=>{ if(mmDrag){mmDrag=null;minimapRange.style.cursor='grab';} });
    window.addEventListener('resize', ()=>{ drawMinimap(); _applyZoom(); });

  // 차트 컨테이너 크기 변화 감지 → 차트 재렌더링
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (chartInstance) {
        chartInstance.resize();
        drawMinimap();
        _applyZoom();
      }
    });
    ro.observe(document.querySelector('.chart-body'));
  }
  }

  requestAnimationFrame(()=>{ drawMinimap(); _applyZoom(); });
}

function externalTooltip(context, discMap, patternData, prices) {
  const tooltip = document.getElementById('customTooltip');
  const {chart,tooltip:tt} = context;
  if (tt.opacity===0) { tooltip.style.display='none'; return; }

  const date = tt.dataPoints?.[0]?.label;
  const pricePoint = tt.dataPoints?.find(p => p.datasetIndex === 0);
  const price = pricePoint?.raw ?? tt.dataPoints?.[0]?.raw;
  const priceNum = parseFloat(price);

  document.getElementById('ttDate').textContent = date;
  document.getElementById('ttPrice').textContent = fmtPriceComma(priceNum)+'원';

  // 전날 대비 등락률
  const dayChangeEl = document.getElementById('ttDayChange');
  const pidx = prices.findIndex(p=>p.date===date);
  if (pidx > 0 && !isNaN(priceNum)) {
    const prevPrice = prices[pidx-1].price;
    const dayChg = ((priceNum - prevPrice) / prevPrice * 100);
    const dayChgStr = (dayChg>=0?'▲ +':'▼ ') + Math.abs(dayChg).toFixed(2) + '%';
    dayChangeEl.textContent = dayChgStr;
    dayChangeEl.style.color = dayChg>=0?'#e53e3e':'#3182ce';
  } else {
    dayChangeEl.textContent = '';
  }

  const discDiv = document.getElementById('ttDisclosure');
  if (discMap[date]?.length>0) {
    const d = discMap[date][0];
    let t = d.title.length>38?d.title.slice(0,38)+'…':d.title;
    if (discMap[date].length>1) t+=` 외 ${discMap[date].length-1}건`;
    document.getElementById('ttDiscTitle').textContent = t;
    const raw = String(d.change).replace('%','').trim();
    const chgVal = parseFloat(raw);
    const changeEl = document.getElementById('ttDiscChange');
    if (!isNaN(chgVal)) {
      const pct = Math.abs(chgVal)<1?chgVal*100:chgVal;
      changeEl.textContent = (pct>=0?'▲ +':'▼ ')+Math.abs(pct).toFixed(2)+'%';
      changeEl.style.color = pct>=0?'#e53e3e':'#3182ce';
    } else { changeEl.textContent=d.change||'—'; changeEl.style.color='#3d4f63'; }
    discDiv.style.display='block';
  } else { discDiv.style.display='none'; }

  const ttPattern = document.getElementById('ttPattern');
  if (patternData && prices) {
    const idx = prices.findIndex(p=>p.date===date);
    const patVal = idx>=0 ? patternData[idx] : null;
    if (patVal !== null && patVal > 0 && !isNaN(priceNum)) {
      const diff = ((priceNum - patVal) / patVal * 100).toFixed(2);
      const el = document.getElementById('ttPatternVal');
      el.textContent = `패턴 대비 ${diff>=0?'+':''}${diff}% 괴리`;
      el.style.color = Math.abs(diff)>3?'#f6ad55':diff>=0?'#e53e3e':'#3182ce';
      ttPattern.style.display='block';
    } else { ttPattern.style.display='none'; }
  } else { ttPattern.style.display='none'; }

  tooltip.style.display='block';
}

// ════════════════════════════════════════
// 공용: 개별 공시 1건의 당일/5일/20일 변동률 계산
// 당일 = 공시일 종가 vs 전일 종가, N일 = 공시일 종가 vs N거래일 후 종가
// ════════════════════════════════════════
function changesByHorizon(prices, date) {
  if (!prices || prices.length < 2) return null;
  let base = -1;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i].date >= date) { base = i; break; }
  }
  if (base < 0) return null;
  const baseClose = prices[base].close;
  if (!baseClose) return null;
  const out = { d0: null, d5: null, d20: null };
  // 당일: 전일 대비
  if (base >= 1 && prices[base-1].close) {
    out.d0 = (baseClose - prices[base-1].close) / prices[base-1].close * 100;
  }
  // N거래일 후: 공시일 종가 대비
  [[5,'d5'],[20,'d20']].forEach(function(pair){
    const fut = base + pair[0];
    if (fut < prices.length && prices[fut].close) {
      out[pair[1]] = (prices[fut].close - baseClose) / baseClose * 100;
    }
  });
  return out;
}

// ════════════════════════════════════════
// 탭 전환 (공시×주가 / 기업분석)
// ════════════════════════════════════════
let activeTab = 'chart';
const companyCache = {};

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.ptab').forEach(function(b){
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  document.getElementById('tabChart').style.display   = (tab === 'chart') ? '' : 'none';
  document.getElementById('tabCompany').style.display = (tab === 'company') ? '' : 'none';
  if (tab === 'company') renderCompany(currentStock);
}

async function renderCompany(name) {
  const body = document.getElementById('companyBody');
  if (!body) return;
  body.innerHTML = '<div class="loading">기업 정보를 불러오는 중…</div>';

  let info = companyCache[name];
  if (!info) {
    try {
      const rows = await supabaseFetch('company_info',
        'stock_name=eq.' + encodeURIComponent(name) + '&select=*&limit=1');
      info = (rows && rows.length) ? rows[0] : null;
      companyCache[name] = info;
    } catch (e) { info = null; }
  }
  if (!info) { body.innerHTML = '<div class="company-empty">기업 정보가 아직 준비되지 않았어요.</div>'; return; }

  const prices = (allData.prices[name]||[]);
  const last = prices.length ? prices[prices.length-1] : null;
  const lastClose = last ? (last.length===5 ? last[4] : last[1]) : null;
  const shares = info.shares ? Number(info.shares) : null;
  const mktCap = (lastClose && shares) ? lastClose * shares : null;

  function won(v){
    if (v == null || isNaN(v)) return '—';
    const abs = Math.abs(v);
    if (abs >= 1e12) return (v/1e12).toFixed(1) + '조';
    if (abs >= 1e8)  return Math.round(v/1e8).toLocaleString() + '억';
    return Math.round(v).toLocaleString() + '원';
  }
  function jo(v){ return (v==null||isNaN(v)) ? null : v/1e12; }  // 조 단위 숫자
  function shareFmt(v){ if(!v) return '—'; return (v/1e8).toFixed(2) + '억주'; }
  function estFmt(s){ if(!s||s.length<8) return '—'; return s.slice(0,4)+'.'+s.slice(4,6); }
  const meta = info.industry_code ? '' : '';

  // 3개년 미니차트 (조 단위)
  function miniChart(y0,y1,y2,label){
    const vals = [jo(Number(y2)), jo(Number(y1)), jo(Number(y0))];
    const valid = vals.filter(function(x){ return x!=null && !isNaN(x); });
    if (!valid.length) return '<div class="cmini"><div class="cmini-top"><span>'+label+'</span></div><div class="cmini-na">데이터 없음</div></div>';
    const maxAbs = Math.max.apply(null, valid.map(Math.abs), 0.1);
    // 추세 화살표: 당기 vs 전기
    const trend = (vals[2]!=null && vals[1]!=null) ? (vals[2] >= vals[1] ? '▲' : '▼') : '';
    const trendCls = (vals[2]!=null && vals[1]!=null) ? (vals[2] >= vals[1] ? 'up' : 'down') : '';
    let bars = '';
    vals.forEach(function(v){
      const ht = (v==null||isNaN(v)) ? 2 : Math.max(Math.round(Math.abs(v)/maxAbs*52), 3);
      const isLast = (v === vals[2]);
      const cls = (v==null) ? 'flat' : (v>=0 ? (isLast?'up':'dim') : 'down');
      const lbl = (v==null||isNaN(v)) ? '-' : (v>=0?'':'') + v.toFixed(1);
      const lblCls = (v==null)?'flat':(v>=0?(isLast?'up':'dim'):'down');
      bars += '<div class="cbar-col"><span class="cbar-val '+lblCls+'">'+lbl+'</span>'
        + '<div class="cbar '+cls+'" style="height:'+ht+'px"></div></div>';
    });
    return '<div class="cmini"><div class="cmini-top"><span>'+label+'</span><span class="cmini-tr '+trendCls+'">'+trend+'</span></div>'
      + '<div class="cbars">'+bars+'</div></div>';
  }

  // ===== 풀이형 재무비율 =====
  var rev0=Number(info.revenue_y0)||0, op0=Number(info.op_income_y0)||0, ni0=Number(info.net_income_y0)||0;
  var asset0=Number(info.assets_y0)||0, liab0=Number(info.liab_y0)||0, eq0=Number(info.equity_y0)||0;
  var asset1=Number(info.assets_y1)||0, liab1=Number(info.liab_y1)||0, eq1=Number(info.equity_y1)||0;
  var ni1=Number(info.net_income_y1)||0, rev1=Number(info.revenue_y1)||0, op1=Number(info.op_income_y1)||0;

  // 비율 계산
  var debtRatio = (eq0>0) ? liab0/eq0*100 : null;
  var roe = (eq0>0) ? ni0/eq0*100 : null;
  var opMargin = (rev0>0) ? op0/rev0*100 : null;
  var equityRatio = (asset0>0) ? eq0/asset0*100 : null;
  // 전기 비교용
  var debtRatioPrev = (eq1>0) ? liab1/eq1*100 : null;
  var roePrev = (eq1>0) ? ni1/eq1*100 : null;
  var opMarginPrev = (rev1>0) ? op1/rev1*100 : null;

  // 공시 연결: 자본/부채 변동을 설명할 만한 공시 유형 탐지
  var capEvents = (allData.disclosures||[]).filter(function(d){ return d[1]===name; });
  function hasType(re){ return capEvents.some(function(d){ return re.test(d[3]||''); }); }
  var hadRights = hasType(/유상증자|전환사채|신주인수권/);
  var hadBuyback = hasType(/자기주식|자사주/);

  function pct(v){ return v==null?'—':v.toFixed(1)+'%'; }
  function trendTxt(cur, prev, unit){
    if(cur==null||prev==null) return '';
    var diff = cur-prev;
    if(Math.abs(diff)<0.5) return '작년과 비슷한 수준이에요.';
    return '작년 '+prev.toFixed(1)+unit+'에서 올해 '+cur.toFixed(1)+unit+'로 '+(diff>0?'올랐':'내렸')+'어요.';
  }

  // 지표 카드 빌더: 수치+등급+비유+기준선막대+설명+추세
  function ratioCard(cfg){
    if(cfg.value==null) return '';
    var g = cfg.grade(cfg.value); // {label, cls}
    var barPct = Math.max(2, Math.min(100, cfg.bar(cfg.value)));
    var h = '<div class="rx-card">';
    h += '<div class="rx-top"><span class="rx-name">'+cfg.name+'<span class="rx-en">'+cfg.en+'</span></span>'
       + '<span class="rx-val '+g.cls+'">'+pct(cfg.value)+'</span></div>';
    h += '<div class="rx-badge '+g.cls+'">'+g.label+'</div>';
    h += '<div class="rx-desc">'+cfg.liken+'</div>';
    h += '<div class="rx-bar"><div class="rx-bar-fill '+g.cls+'" style="width:'+barPct+'%"></div></div>';
    h += '<div class="rx-scale">'+cfg.scale+'</div>';
    h += '<div class="rx-note"><b class="'+g.cls+'">기준</b> '+cfg.guide+'</div>';
    var tr = cfg.trend||'';
    if(tr) h += '<div class="rx-trend">'+tr+'</div>';
    return h+'</div>';
  }

  // ===== 카드 조립 시작 =====
  let html = '<div class="comp-card-big">';

  // 헤더: 종목명 + 시가총액
  html += '<div class="comp-head">'
    + '<div class="comp-name">'+name+'</div>'
    + '<div class="comp-cap"><div class="comp-cap-k">시가총액</div>'
    + '<div class="comp-cap-v">'+(mktCap!=null?won(mktCap):'—')+'</div></div>'
    + '</div>';

  // 4분할: 발행주식수 · 대표이사 · 상장(설립) · 결산월
  // 좌우 5:5: 왼쪽=기본정보 4셀, 오른쪽=지분비율
  html += '<div class="comp-info-row">'

  // 왼쪽: 발행주식수/대표이사/설립/결산월
  + '<div class="comp-info-left">'
  + '<div class="comp-grid4">'
  + '<div class="comp-cell"><div class="comp-cell-label">발행주식수</div><div class="comp-cell-val">'+shareFmt(shares)+'</div></div>'
  + '<div class="comp-cell"><div class="comp-cell-label">대표이사</div><div class="comp-cell-val">'+(info.ceo||'—')+'</div></div>'
  + '<div class="comp-cell"><div class="comp-cell-label">설립</div><div class="comp-cell-val">'+estFmt(info.est_date)+'</div></div>'
  + '<div class="comp-cell"><div class="comp-cell-label">결산월</div><div class="comp-cell-val">'+(info.acc_month?info.acc_month+'월':'—')+'</div></div>'
  + '</div>'
  + '</div>'

  // 오른쪽: 지분비율 카드
  + '<div class="comp-info-right">'
  + '<div class="comp-own-card" id="ownCard_' + name.replace(/\s/g,'_') + '">'
  + '<div class="comp-own-title">주주 구성 <span class="comp-own-sub">최근 거래일 기준</span></div>'
  + '<div class="comp-own-loading">불러오는 중…</div>'
  + '</div>'
  + '</div>'

  + '</div>';

  // 지분비율 비동기 로드
  (async function(){
    var ownCard = document.getElementById('ownCard_' + name.replace(/\s/g,'_'));
    if (!ownCard) return;
    // 웹앱 재배포 전까지 준비중 표시
    // TODO: Code.gs 웹앱 재배포 후 아래 return 제거
    ownCard.innerHTML = '<div class="comp-own-title">주주 구성 <span class="comp-own-sub">최근 거래일 기준</span></div><div class="own-na">웹앱 재배포 후 활성화돼요</div>';
    return;
    if (!KIS_PROXY_URL || KIS_PROXY_URL.indexOf('배포후') !== -1) {
      ownCard.innerHTML = '<div class="comp-own-title">주주 구성</div><div class="own-na">준비 중이에요</div>';
      return;
    }
    try {
      var meta2 = STOCK_META[name] || {};
      var code = meta2.ticker || '';
      var controller = new AbortController();
      var timeout = setTimeout(function(){ controller.abort(); }, 5000);
      var url = KIS_PROXY_URL + '?action=investor&code=' + code + '&t=' + Date.now();
      var res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      var json = await res.json();
      var d = json.data;
      if (!d) throw new Error('no data');
      function pctBar(item) {
        return '<div class="own-row">'
          + '<span class="own-label">' + item.label + '</span>'
          + '<div class="own-bar-wrap"><div class="own-bar" style="width:' + Math.min(Math.abs(item.val),100).toFixed(1) + '%;background:' + item.color + '"></div></div>'
          + '<span class="own-val">' + item.val.toFixed(2) + '%</span>'
          + '</div>';
      }
      var rows2 = [
        { label:'외국인', val: d.foreign || 0, color:'#378ADD' },
        { label:'기관',   val: d.institute || 0, color:'#1D9E75' },
        { label:'개인',   val: d.individual || 0, color:'#888780' },
      ];
      var inner = rows2.map(pctBar).join('');
      ownCard.innerHTML = '<div class="comp-own-title">주주 구성 <span class="comp-own-sub">최근 거래일 기준</span></div>' + inner;
    } catch(e) {
      if (ownCard) ownCard.innerHTML = '<div class="comp-own-title">주주 구성</div><div class="own-na">웹앱 재배포 후 이용 가능해요</div>';
    }
  })();

  // 실적 추이: 매출 · 영업이익 · 당기순이익 3개년 (조 단위)
  html += '<div class="comp-sec">실적 추이 <span class="comp-sec-sub">최근 3개년 · 조 단위 · DART 기준</span></div>';
  html += '<div class="cbars-row">'
    + miniChart(info.revenue_y0, info.revenue_y1, info.revenue_y2, '매출')
    + miniChart(info.op_income_y0, info.op_income_y1, info.op_income_y2, '영업이익')
    + miniChart(info.net_income_y0, info.net_income_y1, info.net_income_y2, '순이익')
    + '</div>';

  html += '<div class="comp-sec">재무 건전성 풀이 <span class="comp-sec-sub">숫자 뒤에 숨은 뜻을 풀어드려요 · DART 기준</span></div>';
  html += '<div class="rx-wrap">';

  // 부채비율
  html += ratioCard({
    name:'부채비율', en:'부채÷자본', value:debtRatio,
    grade:function(v){ return v<100?{label:'매우 안정적',cls:'good'}:v<200?{label:'양호한 편',cls:'mid'}:{label:'빚 부담 큼',cls:'bad'}; },
    bar:function(v){ return v/300*100; },
    liken: debtRatio!=null ? (name+'은 자기 돈 100원당 빚이 <b>'+Math.round(debtRatio)+'원</b>이에요.'+(debtRatio<100?' 빚보다 자기 돈이 더 많아 튼튼한 편이에요.':debtRatio<200?' 빚과 자기 돈이 비슷한 수준이에요.':' 자기 돈보다 빚이 많아 주의가 필요해요.')) : '',
    scale:'<span>0% 무차입</span><span>100% 보통</span><span>200%+ 위험</span>',
    guide:'보통 100% 아래면 안정적, 200%를 넘으면 빚 부담이 큰 편으로 봐요. 빚이 적으면 경기가 나빠져도 버티기 쉽고 이자 부담이 적어요.',
    trend: (function(){ var t=trendTxt(debtRatio,debtRatioPrev,'%'); if(hadRights && debtRatio!=null && debtRatioPrev!=null && debtRatio<debtRatioPrev) t+=' 최근 유상증자·전환사채 공시가 있었는데, 자본이 늘어 부채비율이 낮아졌을 수 있어요.'; return t; })()
  });

  // ROE
  html += ratioCard({
    name:'ROE', en:'자기자본이익률', value:roe,
    grade:function(v){ return v>=15?{label:'우량해요',cls:'good'}:v>=10?{label:'좋은 편',cls:'good'}:v>=5?{label:'평범한 편',cls:'mid'}:v>=0?{label:'낮은 편',cls:'bad'}:{label:'적자예요',cls:'bad'}; },
    bar:function(v){ return (v+5)/30*100; },
    liken: roe!=null ? ('주주 돈 <b>100원</b>으로 1년에 <b>'+roe.toFixed(1)+'원</b>을 벌었다는 뜻이에요. 회사가 내 돈을 얼마나 잘 굴리는지 보여줘요.') : '',
    scale:'<span>0%</span><span>10% 양호</span><span>15%+ 우량</span>',
    guide:'보통 10% 이상이면 좋은 회사, 15%를 넘으면 우량하다고 봐요. 너무 높으면 빚을 많이 써서 그런 경우도 있으니 부채비율과 같이 봐야 해요.',
    trend: trendTxt(roe,roePrev,'%')
  });

  // 영업이익률
  html += ratioCard({
    name:'영업이익률', en:'영업이익÷매출', value:opMargin,
    grade:function(v){ return v>=15?{label:'아주 좋아요',cls:'good'}:v>=8?{label:'좋은 편',cls:'good'}:v>=3?{label:'평범한 편',cls:'mid'}:v>=0?{label:'낮은 편',cls:'bad'}:{label:'적자예요',cls:'bad'}; },
    bar:function(v){ return (v)/30*100; },
    liken: opMargin!=null ? ('<b>1만 원</b>어치 팔면 <b>'+Math.round(opMargin*100)+'원</b>이 영업이익으로 남는다는 뜻이에요. 장사를 얼마나 남기며 하는지 보여줘요.') : '',
    scale:'<span>0%</span><span>8% 양호</span><span>15%+ 우수</span>',
    guide:'업종마다 다르지만 보통 10% 안팎이면 무난, 15%를 넘으면 수익성이 좋은 편이에요. 같은 업종끼리 비교하는 게 정확해요.',
    trend: trendTxt(opMargin,opMarginPrev,'%')
  });

  // 자기자본비율
  html += ratioCard({
    name:'자기자본비율', en:'자본÷자산', value:equityRatio,
    grade:function(v){ return v>=50?{label:'튼튼해요',cls:'good'}:v>=30?{label:'양호한 편',cls:'mid'}:{label:'낮은 편',cls:'bad'}; },
    bar:function(v){ return v; },
    liken: equityRatio!=null ? ('전체 재산 중 <b>'+Math.round(equityRatio)+'%</b>가 빚이 아닌 진짜 내 돈이에요. 높을수록 빚 의존이 적어요.') : '',
    scale:'<span>0%</span><span>30% 보통</span><span>50%+ 튼튼</span>',
    guide:'보통 50% 이상이면 빚 의존이 적어 안정적, 30% 아래면 빚 비중이 큰 편이에요. 부채비율과 동전의 양면이에요.',
    trend:''
  });

  html += '</div>';

  // 배당 (별도 줄)
  var dps = info.div_per_share ? Number(info.div_per_share) : null;
  var dyield = info.div_yield ? Number(info.div_yield) : null;
  if(dps || dyield){
    html += '<div class="rx-div">💰 <b>'+name+'</b>은 1주당 <b>'+(dps?Math.round(dps).toLocaleString()+'원':'—')+'</b>'
      + (dyield?', 현재가 기준 배당수익률 <b>'+dyield.toFixed(1)+'%</b>':'') + '를 나눠줬어요. '
      + '주식을 가지고만 있어도 받는 현금이라, 배당을 주는 회사는 주주 환원에 신경 쓴다고 볼 수 있어요.</div>';
  } else {
    html += '<div class="rx-div">💰 '+name+'은 최근 현금배당이 없었어요. 성장에 투자 중이거나 아직 이익을 나눌 단계가 아닐 수 있어요.</div>';
  }

  // 컨센서스 준비중
  html += '<div class="comp-sec">예상 실적 · 투자의견</div>';
  html += '<div class="comp-soon">증권사 컨센서스(예상 매출·목표주가)는 준비 중이에요.</div>';

  html += '<div class="comp-foot">데이터 출처: 금융감독원 전자공시(DART) · 시가총액은 최근 종가×발행주식수로 계산한 참고치예요.</div>';
  html += '</div>';

  body.innerHTML = html;
}

// ════════════════════════════════════════
// Hook — 검색 유입자용 첫인상. 변동성(20일 절댓값) 최대 공시 유형을 질문형으로.
// ════════════════════════════════════════
function renderHook(disclosures) {
  const box = document.getElementById('hookBox');
  if (!box) return;
  const prices = (allData.prices[currentStock]||[]).map(p=>p.length===5?{date:p[0],close:p[4]}:{date:p[0],close:p[1]});
  if (!prices.length || !disclosures || !disclosures.length) { box.style.display='none'; return; }

  // 유형별 20일 변동률 수집
  const byType = {};
  disclosures.forEach(function(d){
    const ch = changesByHorizon(prices, d.date);
    if (!ch || ch.d20 == null) return;
    if (!byType[d.type]) byType[d.type] = [];
    byType[d.type].push(ch.d20);
  });

  // 가장 최근에 발생한 공시의 '유형'을 선택 (표본 3건 이상인 유형 중에서).
  // 최근 공시 유형이 표본 부족이면 그 다음 최근 유형으로 폴백.
  const sorted = disclosures.slice().sort(function(a,b){ return (a.date<b.date?1:a.date>b.date?-1:0); });
  let best = null;
  for (let i = 0; i < sorted.length; i++) {
    const t = sorted[i].type;
    const arr = byType[t];
    if (!arr || arr.length < 3) continue;
    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
    best = { type:t, avg:avg, count:arr.length };
    break;
  }
  // 표본 3건 이상 유형이 전혀 없으면, 가장 최근 유형으로 표본 수 무관 폴백
  if (!best && sorted.length) {
    const t = sorted[0].type;
    const arr = byType[t] || [];
    if (arr.length) {
      const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
      best = { type:t, avg:avg, count:arr.length };
    }
  }

  if (!best) { box.style.display='none'; return; }

  const sign = best.avg >= 0 ? '+' : '';
  const colorVal = best.avg >= 0 ? 'var(--up)' : 'var(--down)';
  document.getElementById('hookQ').innerHTML = '<b>' + best.type + '</b> 공시 후, 주가는?';
  document.getElementById('hookA').innerHTML =
    '과거 <b>' + best.count + '번</b> 중 20일 뒤 평균 <b style="color:' + colorVal + '">' + sign + best.avg.toFixed(1) + '%</b>';
  window._hookType = best.type;
  const linkEl = document.getElementById('hookLink');
  if (linkEl) {
    linkEl.textContent = '↓ 아래 차트의 초록 점을 누르면 해당 공시로 이동해요';
  }
  box.style.display = 'block';
}

function shareHook() {
  // 현재 종목의 6자리 코드 찾기 (CODE_TO_NAME 역참조). 없으면 종목명 쿼리로 폴백.
  var code = null;
  if (typeof CODE_TO_NAME === 'object') {
    for (var c in CODE_TO_NAME) { if (CODE_TO_NAME[c] === currentStock) { code = c; break; } }
  }
  var url = code
    ? 'https://factchart.co.kr/stock/' + code + '.html'
    : 'https://factchart.co.kr/?stock=' + encodeURIComponent(currentStock);

  // 공유 카피: 종목명 + 공시유형(있으면) + 담백한 안내 문구
  var hookType = window._hookType || '';
  var headline = hookType
    ? '📊 ' + currentStock + " '" + hookType + "' 떴네요."
    : '📊 ' + currentStock + ' 공시 분석';
  var text = headline + ' DART 공식 데이터 기반 주가 변동을 확인해보세요 👇';

  if (navigator.share) {
    navigator.share({ text: text, url: url }).catch(function(){});
  } else {
    var full = text + '\n' + url;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(full).then(function(){
        var btn = document.getElementById('hookShare');
        if (btn) { var o = btn.innerHTML; btn.innerHTML = '복사됨 ✓'; setTimeout(function(){ btn.innerHTML = o; }, 1500); }
      }).catch(function(){ prompt('복사하세요:', full); });
    } else { prompt('복사하세요:', full); }
  }
}

// ════════════════════════════════════════
// 멘토 해석 레이어 — "잠깐, 이건 알고 가세요"
// 공시 발생 후 N거래일 주가 변동을 계산해 친근한 문장으로 번역
// ════════════════════════════════════════
function computeMentorInsight(prices, disclosures, focusType) {
  if (!prices || prices.length < 6 || !disclosures || disclosures.length === 0) return null;

  // 날짜 → prices 인덱스 맵 (거래일 기준 N일 후 탐색용)
  const idxByDate = {};
  prices.forEach(function(p, i) { idxByDate[p.date] = i; });

  // 공시일의 거래일 인덱스 찾기 (정확히 없으면 그 이후 첫 거래일)
  function tradingIndexOnOrAfter(date) {
    if (idxByDate[date] != null) return idxByDate[date];
    for (let i = 0; i < prices.length; i++) {
      if (prices[i].date >= date) return i;
    }
    return -1;
  }

  // focusType 공시들만 분석 (없으면 전체)
  const targets = disclosures.filter(function(d) {
    return !focusType || d.type === focusType;
  });
  if (targets.length === 0) return null;

  const horizons = [5, 20]; // 단기 5거래일, 중기 20거래일
  const results = {};
  horizons.forEach(function(h) { results[h] = []; });

  targets.forEach(function(d) {
    const base = tradingIndexOnOrAfter(d.date);
    if (base < 0) return;
    const baseClose = prices[base].close;
    if (!baseClose) return;
    horizons.forEach(function(h) {
      const fut = base + h;
      if (fut < prices.length && prices[fut].close) {
        const chg = (prices[fut].close - baseClose) / baseClose * 100;
        results[h].push(chg);
      }
    });
  });

  return { type: focusType || '공시', samples: targets.length, horizons: results };
}

function renderMentorCard(prices, disclosures, focusType) {
  const card = document.getElementById('mentorCard');
  if (!card) return;
  const insight = computeMentorInsight(prices, disclosures, focusType);
  if (!insight) { card.style.display = 'none'; return; }

  const typeLabel = insight.type;
  const stock = currentStock;

  // 5거래일 표본 기준으로 신뢰도 판단
  const arr5 = insight.horizons[5] || [];
  const arr20 = insight.horizons[20] || [];
  const n = arr5.length;

  function stat(arr) {
    if (arr.length === 0) return null;
    const up = arr.filter(function(c){return c > 0;}).length;
    const avg = arr.reduce(function(a,b){return a+b;},0) / arr.length;
    return { n: arr.length, up: up, pct: Math.round(up/arr.length*100), avg: avg };
  }
  const s5 = stat(arr5), s20 = stat(arr20);

  let bodyHtml = '';

  if (n < 3) {
    // 안전장치: 표본 부족 → 확률 단언 금지
    bodyHtml = '<b>"' + stock + '"</b>의 <b>' + typeLabel + '</b> 공시는 최근 사례가 '
      + insight.samples + '건뿐이라, 아직 패턴을 말하기엔 일러요. '
      + '숫자보다 회사가 왜 이 공시를 냈는지부터 살펴보는 게 좋아요.';
  } else {
    const dir5 = s5.avg >= 0 ? '<span class="up">+' + s5.avg.toFixed(1) + '%</span>'
                             : '<span class="down">' + s5.avg.toFixed(1) + '%</span>';
    bodyHtml = '<b>"' + stock + '"</b>는 최근 <b>' + typeLabel + '</b> 공시가 <b>' + n + '번</b> 있었어요. '
      + '공시 직후 <b>5거래일</b> 동안 평균 ' + dir5 + ' 움직였고, '
      + n + '번 중 ' + s5.up + '번 올랐습니다 <b>(' + s5.pct + '%)</b>.';
    if (s20 && s20.n >= 3) {
      const dir20 = s20.avg >= 0 ? '<span class="up">+' + s20.avg.toFixed(1) + '%</span>'
                                 : '<span class="down">' + s20.avg.toFixed(1) + '%</span>';
      bodyHtml += ' <b>20거래일</b> 뒤엔 평균 ' + dir20 + '이었어요.';
    }
    // 멘토의 한마디: 당일 추격의 함정 일깨우기 (사실 기반, 조언 아님)
    if (Math.abs(s5.avg) < 1 && s5.pct >= 40 && s5.pct <= 60) {
      bodyHtml += ' 보시다시피 방향이 거의 반반이라, "공시 떴으니 오르겠지"라고 단정하긴 어려운 종목이에요.';
    }
  }

  card.innerHTML =
    '<button class="mentor-close" onclick="closeMentor()" aria-label="닫기">&times;</button>'
    + '<div class="mentor-head">💡 잠깐, 이건 알고 가세요</div>'
    + '<div class="mentor-body">' + bodyHtml + '</div>'
    + '<div class="mentor-note">※ 과거 데이터일 뿐 미래 수익을 보장하지 않아요. 매수·매도 권유가 아니라, 스스로 점검해보시라는 참고 자료예요.</div>';
  // 표시는 전구가 제어 — 새 종목 선택 시 카드는 닫고 전구 pulse를 다시 켬
  card.style.display = 'none';
  const bulb = document.getElementById('mentorBulb');
  const halo = document.getElementById('bulbHalo');
  if (bulb && halo) {
    bulb.classList.remove('seen');
    halo.classList.add('on');
  }
}

function toggleMentor(e) {
  if (e) e.stopPropagation();
  const card = document.getElementById('mentorCard');
  const bulb = document.getElementById('mentorBulb');
  const halo = document.getElementById('bulbHalo');
  if (!card) return;
  const open = card.style.display !== 'none';
  card.style.display = open ? 'none' : 'block';
  if (!open) {
    if (halo) halo.classList.remove('on');
    if (bulb) bulb.classList.add('seen');
    // 바깥 클릭 시 닫기
    setTimeout(function(){
      document.addEventListener('click', closeMentorOutside);
    }, 0);
  }
}

function closeMentorOutside(e) {
  const card = document.getElementById('mentorCard');
  const wrap = document.querySelector('.bulb-wrap');
  if (card && wrap && !wrap.contains(e.target)) {
    card.style.display = 'none';
    document.removeEventListener('click', closeMentorOutside);
  }
}

function closeMentor() {
  document.getElementById('mentorCard').style.display = 'none';
  document.removeEventListener('click', closeMentorOutside);
}

// ════════════════════════════════════════
// 공시 이상징후 온도계 + 타임라인
// ════════════════════════════════════════
// 6유형 → 호악재 신호 (악재성 데이터는 분류기 확장 후 자동 보강)
var SIGNAL_WEIGHT = {
  '자사주': 20, '배당': 15, '대규모계약': 18, '실적발표': 10, '투자결정': 8, '풍문해명': -12
};
var SIG_COLOR = { teal:'#1D9E75', amber:'#f6ad55', red:'#e53e3e' };

// 공시 1건의 신호 가중치 (방향 포함). 주의공시는 title로 세부 판정.
function signalWeightOf(d) {
  if (d.type === '주의공시') {
    const t = String(d.title || '').replace(/\s/g, '');
    if (/관리종목|상장적격성/.test(t) || (/상장폐지/.test(t) && !/해외증권시장/.test(t))) return -50;
    if (/횡령|배임/.test(t)) return -45;
    if (/영업정지|영업중단/.test(t)) return -40;
    if (/유상증자결정/.test(t)) return (/종속회사|자회사/.test(t)) ? -10 : -25;
    if (/감자결정/.test(t)) return -25;
    if (/전환사채권발행|전환사채발행/.test(t)) return -20;
    if (/신주인수권부사채권발행/.test(t)) return -20;
    if (/교환사채권발행/.test(t)) return -15;
    if (/소송등의제기|소송제기/.test(t)) return -12;
    return -15; // 기타 주의공시 기본값
  }
  return SIGNAL_WEIGHT[d.type] || 0;
}

function renderThermometer(disclosures) {
  const card = document.getElementById('thermoCard');
  if (!card) return;
  if (!disclosures || disclosures.length === 0) { card.style.display = 'none'; return; }

  // 최근순 정렬
  const sorted = disclosures.slice().sort(function(a,b){ return a.date < b.date ? 1 : -1; });
  const recent10 = sorted.slice(0, 10);

  let score = 0, good = 0, warn = 0;
  recent10.forEach(function(d){
    const w = signalWeightOf(d);
    score += w;
    if (w > 0) good++; else if (w < 0) warn++;
  });

  // 구간 판정
  let sig, label, sub;
  if (score <= -30) {
    sig = SIG_COLOR.red; label = '주의 구간';
    sub = '최근 공시 ' + recent10.length + '건 중 <b style="color:'+SIG_COLOR.red+'">주의성 ' + warn + '건</b>. 주주가치에 영향을 줄 수 있는 공시가 보이는 구간이에요.';
  } else if (score < 30) {
    sig = SIG_COLOR.amber; label = '관찰 구간';
    sub = '최근 공시 ' + recent10.length + '건 중 호재성 ' + good + '건, 주의성 ' + warn + '건. 특별히 한쪽으로 치우치지 않은 구간이에요.';
  } else {
    sig = SIG_COLOR.teal; label = '주주환원 활발';
    sub = '최근 공시 ' + recent10.length + '건 중 <b style="color:#3182ce">호재성 ' + good + '건</b>, 주의성 ' + warn + '건. 주주가치를 높이는 공시가 자주 보이는 구간이에요.';
  }

  // 온도계 높이 (지수 -60~+60 → 8~92%)
  const pct = Math.max(8, Math.min(92, (score + 60) / 120 * 100));

  card.style.setProperty('--sig', sig);
  document.getElementById('thermoFill').style.height = pct + '%';
  document.getElementById('thermoBall').style.bottom = pct + '%';
  document.getElementById('thermoLabel').textContent = label;
  document.getElementById('thermoSub').innerHTML = sub;

  // 타임라인 도트 (최근 90일)
  const tl = document.getElementById('thermoTimeline');
  const cnt = document.getElementById('thermoTlCount');
  tl.innerHTML = '';
  const today = new Date();
  const start = new Date(today.getTime() - 90*24*60*60*1000);
  const within = sorted.filter(function(d){
    const dt = new Date(d.date);
    return dt >= start && dt <= today;
  });
  cnt.textContent = '총 ' + within.length + '건';
  within.forEach(function(d){
    const dt = new Date(d.date);
    const posPct = (dt - start) / (today - start) * 100;
    const w = signalWeightOf(d);
    const dot = document.createElement('div');
    dot.className = 'tl-dot';
    dot.style.left = Math.max(1, Math.min(99, posPct)) + '%';
    dot.style.background = w >= 0 ? '#3182ce' : '#e53e3e';
    const labelTxt = (d.type === '주의공시' && d.title) ? d.title : d.type;
    dot.title = d.date.slice(5) + ' ' + labelTxt;
    tl.appendChild(dot);
  });

  card.style.display = 'block';
}

function renderStatsPanel(disclosures) {
  const body = document.getElementById('statsPanelBody');
  const sub = document.getElementById('statsPanelSub');

  if (!disclosures || disclosures.length === 0) {
    body.innerHTML = '<div class="stats-empty">공시 데이터 없음</div>';
    return;
  }

  sub.textContent = currentStock + ' — ' + disclosures.length + '건 분석';

  // prices 기반 당일/5일/20일 변동률 계산
  const prices = (allData.prices[currentStock]||[]).map(p=>p.length===5?{date:p[0],close:p[4]}:{date:p[0],close:p[1]});
  const acc = { d0:[], d5:[], d20:[] };
  const typeStats = {};
  disclosures.forEach(function(d) {
    const ch = changesByHorizon(prices, d.date);
    if (!ch) return;
    if (ch.d0 != null) acc.d0.push(ch.d0);
    if (ch.d5 != null) acc.d5.push(ch.d5);
    if (ch.d20 != null) acc.d20.push(ch.d20);
    // 유형별은 5일 기준(공시 영향이 드러나는 대표 기간)
    if (!typeStats[d.type]) typeStats[d.type] = { sum:0, count:0, up:0 };
    if (ch.d5 != null) {
      typeStats[d.type].sum += ch.d5;
      typeStats[d.type].count++;
      if (ch.d5 >= 0) typeStats[d.type].up++;
    }
  });
  function avg(arr){ return arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : null; }
  const a0 = avg(acc.d0), a5 = avg(acc.d5), a20 = avg(acc.d20);

  // 요약 카드용 (5일 기준 대표값)
  const totalAvg = a5 != null ? a5 : 0;
  const upRate = acc.d5.length ? Math.round(acc.d5.filter(v=>v>=0).length/acc.d5.length*100) : 0;
  const maxVal = acc.d5.length ? Math.max(...acc.d5) : 0;

  const types = Object.keys(typeStats).sort((a,b)=>{
    const avgA = typeStats[a].count ? typeStats[a].sum/typeStats[a].count : 0;
    const avgB = typeStats[b].count ? typeStats[b].sum/typeStats[b].count : 0;
    return avgB - avgA;
  });
  const maxAbs = Math.max(...types.map(t=>typeStats[t].count?Math.abs(typeStats[t].sum/typeStats[t].count):0), 1);

  // ── S1: 공시 후 평균 주가 변화 (당일→5일→20일 3구간 막대) ──
  const periods = [{k:'당일',v:a0},{k:'5일',v:a5},{k:'20일',v:a20}];
  const maxMag = Math.max(...periods.map(p=>p.v!=null?Math.abs(p.v):0), 1);
  let html = '<div class="s1-section"><div class="s1-title">공시 후 평균 주가 변화</div><div class="s1-bars">';
  periods.forEach(function(p){
    const h = p.v!=null ? Math.max(Math.round(Math.abs(p.v)/maxMag*100), 3) : 3;
    const cls = p.v==null ? 'flat' : (p.v>=0?'up':'down');
    const valTxt = p.v!=null ? (p.v>=0?'+':'')+p.v.toFixed(1)+'%' : '—';
    html += `<div class="s1-col">
      <span class="s1-val ${cls}">${valTxt}</span>
      <div class="s1-bar-track"><div class="s1-bar ${cls}" style="height:${h}%"></div></div>
      <span class="s1-lbl">${p.k}</span>
    </div>`;
  });
  html += '</div><div class="s1-note">공시 당일은 잔잔해도, 시간이 지나며 영향이 드러나요</div></div>';

  html += '<div class="summary-grid">';
  html += `<div class="summary-card"><div class="summary-val neutral">${disclosures.length}</div><div class="summary-lbl">총 공시</div></div>`;
  html += `<div class="summary-card"><div class="summary-val ${totalAvg>=0?'up':'down'}">${totalAvg>=0?'+':''}${totalAvg.toFixed(2)}%</div><div class="summary-lbl">5일 평균</div></div>`;
  html += `<div class="summary-card"><div class="summary-val neutral">${upRate}%</div><div class="summary-lbl">5일 상승확률</div></div>`;
  html += `<div class="summary-card"><div class="summary-val up">+${maxVal.toFixed(2)}%</div><div class="summary-lbl">최고 반응</div></div>`;
  html += '</div>';

  html += '<div class="type-stat-section"><div class="type-stat-label">유형별 평균 수익률 <span style="color:var(--text3);font-weight:400;font-size:10px">(공시 후 5일)</span></div>';
  types.forEach(t => {
    const s = typeStats[t];
    if (!s.count) return;
    const av = s.sum/s.count;
    const width = Math.max(Math.round(Math.abs(av)/maxAbs*100), 20);
    const cls = av>=0?'up':'down';
    html += `<div class="type-stat-row">
      <div class="type-stat-name">${t}</div>
      <div class="type-stat-track"><div class="type-stat-fill ${cls}" style="width:${width}%">${av>=0?'+':''}${av.toFixed(2)}%</div></div>
      <div class="type-stat-count">${s.count}건</div>
    </div>`;
  });
  html += '</div>';

  html += '<div class="dist-section"><div class="type-stat-label" style="margin-top:8px">상승 / 하락 분포 <span style="color:var(--text3);font-weight:400;font-size:10px">(공시 후 5일)</span></div>';
  types.forEach(t => {
    const s = typeStats[t];
    if (!s.count) return;
    const upPct = Math.round(s.up/s.count*100);
    html += `<div class="dist-row">
      <div class="dist-name">${t}</div>
      <div class="dist-bar">
        <div class="dist-up" style="width:${upPct}%">${upPct}%</div>
        <div class="dist-down" style="width:${100-upPct}%">${100-upPct}%</div>
      </div>
    </div>`;
  });
  html += '</div>';

  body.innerHTML = html;
}

function renderTypeFilter(disclosures) {
  const types = ['전체', ...new Set(disclosures.map(d=>d.type).filter(Boolean))];
  document.getElementById('typeFilterWrap').innerHTML = types.map(t=>
    `<button class="filter-btn ${t===activeTypeFilter?'active':''}" onclick="filterByType('${t}')">${t}</button>`
  ).join('');
}

function filterByType(type) {
  activeTypeFilter = type;
  renderTypeFilter(allData.disclosures.filter(d=>d.name===currentStock));
  const disclosures = allData.disclosures.filter(d=>d.name===currentStock && (type==='전체'||d.type===type));
  renderTableRows(disclosures);
  document.getElementById('disclosureCount').textContent = `총 ${disclosures.length}건`;
}

function renderTable(disclosures) {
  renderTypeFilter(disclosures);
  renderTableRows(disclosures);
  document.getElementById('disclosureCount').textContent = `총 ${disclosures.length}건`;
}

function renderTableRows(disclosures) {
  const c = document.getElementById('tableContainer');
  if (!disclosures.length) { c.innerHTML='<div class="loading">공시 데이터 없음</div>'; return; }
  // 현재 종목 prices (당일/5일/20일 계산용)
  const prices = (allData.prices[currentStock]||[]).map(p=>p.length===5?{date:p[0],close:p[4]}:{date:p[0],close:p[1]});
  const sorted = [...disclosures].sort((a,b)=>b.date.localeCompare(a.date));
  function cell(v){
    if (v == null || isNaN(v)) return '<span class="hcell-na">—</span>';
    const cls = v>=0?'up':'down';
    const txt = (v>=0?'+':'')+v.toFixed(1)+'%';
    return `<span class="hcell ${cls}">${txt}</span>`;
  }
  const rows = sorted.map(d=>{
    const ch = changesByHorizon(prices, d.date) || {d0:null,d5:null,d20:null};
    const color = TYPE_COLORS[d.type]||'#334155';
    const typeBadge = `<span class="td-type" style="background:${color}18;color:${color};border:1px solid ${color}35">${d.type||'기타'}</span>`;
    const dartUrl = d.rcpNo && d.rcpNo !== '' && d.rcpNo !== 'undefined'
      ? `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${d.rcpNo}` : null;
    const titleCell = dartUrl
      ? `<a class="dart-link" href="${dartUrl}" target="_blank" rel="noopener">${d.title}<span class="dart-icon">↗</span></a>`
      : d.title;
    return `<tr>
      <td class="td-date">${d.date}</td>
      <td>${typeBadge}</td>
      <td>${titleCell}</td>
      <td class="td-3chg">
        <span class="chg-block">
          <span class="chg-grp"><span class="chg-lbl">당일</span>${cell(ch.d0)}</span>
          <span class="chg-grp"><span class="chg-lbl">5일</span>${cell(ch.d5)}</span>
          <span class="chg-grp"><span class="chg-lbl">20일</span>${cell(ch.d20)}</span>
        </span>
      </td>
    </tr>`;
  }).join('');
  c.innerHTML=`<table>
    <thead><tr><th>날짜</th><th>유형</th><th>공시 제목</th><th class="th-3chg"><span>공시 후 변동률</span></th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}


document.addEventListener('mousemove', e => {
  const tooltip = document.getElementById('customTooltip');
  if (tooltip.style.display === 'block') {
    const tw = tooltip.offsetWidth||240, th = tooltip.offsetHeight||100;
    let left = e.clientX+16, top = e.clientY+12;
    if (left+tw > window.innerWidth-8) left = e.clientX-tw-16;
    if (top+th > window.innerHeight-8) top = e.clientY-th-12;
    if (top<8) top=8;
    tooltip.style.left = left+'px';
    tooltip.style.top = top+'px';
  }
});

// 모바일: 터치 후 툴팁 자동 숨김
let tooltipHideTimer = null;
document.addEventListener('touchstart', e => {
  const tooltip = document.getElementById('customTooltip');
  if (!e.target.closest('canvas')) {
    tooltip.style.display = 'none';
    return;
  }
  // canvas 터치 시 툴팁 위치 계산
  if (e.touches.length === 1) {
    const t = e.touches[0];
    const tw = tooltip.offsetWidth||200, th = tooltip.offsetHeight||80;
    let left = t.clientX + 16, top = t.clientY - th - 12;
    if (left + tw > window.innerWidth - 8) left = t.clientX - tw - 16;
    if (top < 8) top = t.clientY + 12;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    clearTimeout(tooltipHideTimer);
    tooltipHideTimer = setTimeout(() => { tooltip.style.display = 'none'; }, 2500);
  }
}, {passive: true});

renderButtons();
fetch(DATA_URL)
  .then(r=>r.json())
  .then(data=>{
    allData = data;
    document.querySelector('#hstatDisc .hstat-val').textContent = data.disclosures.length;
    // 종목 결정 우선순위: ?stock= 파라미터 → /stock/<코드>.html 경로 → 기본 삼성전자
    var params = new URLSearchParams(window.location.search);
    var reqStock = params.get('stock');
    // SEO 정적 페이지(/stock/<6자리코드>.html)로 진입한 경우 경로에서 코드 추출
    if (!reqStock) {
      var m = window.location.pathname.match(/\/stock\/([^\/]+?)\.html?$/i);
      if (m && m[1]) {
        try { reqStock = decodeURIComponent(m[1]); } catch(e) { reqStock = m[1]; }
      }
    }
    // reqStock이 6자리 종목코드면 종목명으로 변환 (코드/종목명 모두 허용)
    if (reqStock && CODE_TO_NAME[reqStock]) reqStock = CODE_TO_NAME[reqStock];
    var validStock = reqStock && allData.prices && allData.prices[reqStock] ? reqStock : '삼성전자';
    selectStock(validStock);
  })
  .then(() => {
    initMarketStatus();
    initTicker();
    buildTodayDisc();
  })
  .catch(e=>{
    document.getElementById('chartContainer').innerHTML=`<div class="error">⚠ ${e.message}</div>`;
  });

function initMarketStatus() {
  // 모바일에서 통계패널을 공시이력 위로 이동
  function repositionStatPanel() {
    const rightCol = document.querySelector('.right-col');
    const leftCol = document.querySelector('.left-col');
    const tickerBar = document.getElementById('tickerBar');
    if (!rightCol || !leftCol || !tickerBar) return;
    if (window.innerWidth <= 768) {
      // tickerBar 앞에 삽입 (차트 아래, 공시이력 위)
      if (rightCol.parentElement !== leftCol) {
        leftCol.insertBefore(rightCol, tickerBar);
        rightCol.style.marginBottom = '10px';
      }
    } else {
      // 데스크톱: main-layout 안으로 복원
      const mainLayout = document.querySelector('.main-layout');
      if (rightCol.parentElement !== mainLayout) {
        mainLayout.appendChild(rightCol);
        rightCol.style.marginBottom = '';
      }
    }
  }
  repositionStatPanel();
  window.addEventListener('resize', repositionStatPanel);

  // 모바일: stock-info-left에 종목명+뱃지 flex row로 묶기
  function positionMarketBadge() {
    // 새 레이아웃: market-status가 price-block 안에 HTML로 고정됨.
    // 가격 블록 전체가 왼쪽 컬럼에 세로 배치되므로 JS 재배치 불필요.
  }
  positionMarketBadge();
  window.addEventListener('resize', positionMarketBadge);

  // 한국 공휴일 + 임시 휴장일 (YYYYMMDD)
  const KR_HOLIDAYS = new Set([
    // 2025
    '20250101','20250127','20250128','20250129','20250130','20250131',
    '20250301','20250505','20250506','20250506','20250602','20250606',
    '20250815','20251003','20251009','20251225',
    // 2026
    '20260101','20260216','20260217','20260218','20260219','20260220',
    '20260301','20260505','20260606','20260603', // 20260603 = 오늘 선거일
    '20260815','20260924','20260925','20260926','20261003','20261009','20261225',
    // 임시휴장
    '20261231', // 연말 임시휴장
  ]);

  function isHoliday(kst) {
    const y = kst.getFullYear();
    const m = String(kst.getMonth()+1).padStart(2,'0');
    const d = String(kst.getDate()).padStart(2,'0');
    return KR_HOLIDAYS.has('' + y + m + d);
  }

  // 한국 시간 기준 장 운영: 평일 09:00~15:30 (공휴일 제외)
  function checkMarket() {
    const now = new Date();
    const kst = new Date(now.toLocaleString('en-US', {timeZone:'Asia/Seoul'}));
    const day = kst.getDay(); // 0=일, 6=토
    const h = kst.getHours(), m = kst.getMinutes();
    const timeVal = h * 60 + m;
    const isWeekday = day >= 1 && day <= 5;
    const isOpen = isWeekday && !isHoliday(kst) && timeVal >= 9*60 && timeVal < 15*60+30;
    const dot = document.getElementById('marketDot');
    const label = document.getElementById('marketLabel');
    const wrap = document.getElementById('marketStatus');
    if (dot && label) {
      dot.className = 'market-dot ' + (isOpen ? 'open' : 'closed');
      label.textContent = isOpen ? '국내 정규장' : '장 마감';
      if (wrap) wrap.classList.toggle('open', isOpen);
    }
  }
  checkMarket();
  setInterval(checkMarket, 30000);
}

const TICKER_NAMES = ['삼성전자','SK하이닉스','현대차','카카오','NAVER','LG에너지솔루션','한화에어로스페이스','KB금융','HD현대','두산에너빌리티'];

// SEO 정적 페이지(/stock/<6자리코드>.html) 라우팅용 코드→종목명 매핑
const CODE_TO_NAME = {
  '005930':'삼성전자',  '000660':'SK하이닉스',  '402340':'SK스퀘어',  '009150':'삼성전기',  '005380':'현대차',
  '373220':'LG에너지솔루션',  '032830':'삼성생명',  '028260':'삼성물산',  '000270':'기아',  '329180':'HD현대중공업',
  '207940':'삼성바이오로직스',  '034020':'두산에너빌리티',  '105560':'KB금융',  '012330':'현대모비스',  '012450':'한화에어로스페이스',
  '055550':'신한지주',  '034730':'SK',  '006400':'삼성SDI',  '066570':'LG전자',  '035420':'NAVER',
  '068270':'셀트리온',  '267260':'HD현대일렉트릭',  '010120':'LS ELECTRIC',  '086790':'하나금융지주',  '298040':'효성중공업',
  '042660':'한화오션',  '000810':'삼성화재',  '005490':'POSCO홀딩스',  '006800':'미래에셋증권',  '011070':'LG이노텍',
  '042700':'한미반도체',  '000150':'두산',  '010130':'고려아연',  '009540':'HD한국조선해양',  '017670':'SK텔레콤',
  '051910':'LG화학',  '015760':'한국전력',  '010140':'삼성중공업',  '316140':'우리금융지주',  '064350':'현대로템',
  '267250':'HD현대',  '033780':'KT&G',  '018260':'삼성에스디에스',  '307950':'현대오토에버',  '138040':'메리츠금융지주',
  '011200':'HMM',  '096770':'SK이노베이션',  '003550':'LG',  '035720':'카카오',  '003670':'포스코퓨처엠',
  '024110':'기업은행',  '272210':'한화시스템',  '079550':'LIG디펜스앤에어로스페이스',  '278470':'에이피알',  '086280':'현대글로비스',
  '030200':'KT',  '000720':'현대건설',  '071050':'한국금융지주',  '047810':'한국항공우주',  '010950':'S-Oil',
  '006260':'LS',  '323410':'카카오뱅크',  '005940':'NH투자증권',  '259960':'크래프톤',  '016360':'삼성증권',
  '047050':'포스코인터내셔널',  '064400':'LG씨엔에스',  '161390':'한국타이어앤테크놀로지',  '443060':'HD현대마린솔루션',  '039490':'키움증권',
  '005830':'DB손해보험',  '028050':'삼성E&A',  '003490':'대한항공',  '047040':'대우건설',  '007660':'이수페타시스',
  '352820':'하이브',  '003230':'삼양식품',  '000880':'한화',  '180640':'한진칼',  '001440':'대한전선',
  '454910':'두산로보틱스',  '326030':'SK바이오팜',  '062040':'산일전기',  '078930':'GS',  '034220':'LG디스플레이',
  '011790':'SKC',  '021240':'코웨이',  '090430':'아모레퍼시픽',  '241560':'두산밥캣',  '377300':'카카오페이',
  '032640':'LG유플러스',  '004170':'신세계',  '009830':'한화솔루션',  '000100':'유한양행',  '128940':'한미약품',
  '036570':'NC',  '138930':'BNK금융지주',  '066970':'엘앤에프',  '175330':'JB금융지주',  '271560':'오리온',
  '029780':'삼성카드',  '010060':'OCI홀딩스',  '023530':'롯데쇼핑',  '001040':'CJ',  '052690':'한전기술',
  '082740':'한화엔진',  '088350':'한화생명',  '022100':'포스코DX',  '004020':'현대제철',  '018880':'한온시스템',
  '002380':'KCC',  '051900':'LG생활건강',  '450080':'에코프로머티',  '111770':'영원무역',  '069960':'현대백화점',
  '097950':'CJ제일제당',  '251270':'넷마블',  '302440':'SK바이오사이언스',  '383220':'F&F',  '001450':'현대해상',
  '036460':'한국가스공사',  '011170':'롯데케미칼',  '011780':'금호석유화학',  '014680':'한솔케미칼',  '017800':'현대엘리베이터',
  '035250':'강원랜드',  '005850':'에스엘',  '000240':'한국앤컴퍼니',  '004370':'농심',  '004990':'롯데지주',
  '006360':'GS건설',  '007340':'DN오토모티브',  '009420':'한올바이오파마',  '009970':'영원무역홀딩스',  '012750':'에스원',
  '026960':'동서',  '028670':'팬오션',  '139130':'iM금융지주',  '139480':'이마트',  '204320':'HL만도',
  '282330':'BGF리테일',  '375500':'DL이앤씨',  '457190':'이수스페셜티케미컬',  '000120':'CJ대한통운',  '192820':'코스맥스',
  '161890':'한국콜마',  '120110':'코오롱인더',  '112610':'씨에스윈드',  '103140':'풍산',  '081660':'미스토홀딩스',
  '071970':'HD현대마린엔진',  '051600':'한전KPS',  '030000':'제일기획',  '017960':'한국카본',  '011210':'현대위아',
  '008930':'한미사이언스',  '008770':'호텔신라',  '007070':'GS리테일',  '002790':'아모레퍼시픽홀딩스',  '001800':'오리온홀딩스',
  '001430':'세아베스틸지주',  '006040':'동원산업',  '000080':'하이트진로',  '006280':'녹십자',  '361610':'SK아이이테크놀로지',
  '000210':'DL',  '093370':'후성',  '280360':'롯데웰푸드',  '003090':'대웅',  '003240':'태광산업',
  '004000':'롯데정밀화학',  '005300':'롯데칠성',  '073240':'금호타이어',  '300720':'한일시멘트',  '069620':'대웅제약',
  '192080':'더블유게임즈',  '034230':'파라다이스',  '185750':'종근당',  '298020':'효성티앤씨',  '007310':'오뚜기',
  '002840':'미원상사',  '006650':'대한유화',  '003030':'세아제강지주',  '071320':'지역난방공사',  '001680':'대상',
  '069260':'TKG휴켐스',  '000670':'영풍',  '002030':'아세아',  '004490':'세방전지',  '298050':'HS효성첨단소재',
  '014820':'동원시스템즈',  '137310':'에스디바이오센서',  '009240':'한샘',  '005250':'녹십자홀딩스',  '114090':'GKL',
  '008730':'율촌화학',  '268280':'미원에스씨',  '285130':'SK케미칼',  '005420':'코스모화학',  '196170':'알테오젠',
  '247540':'에코프로비엠',  '086520':'에코프로',  '277810':'레인보우로보틱스',  '036930':'주성엔지니어링',  '058470':'리노공업',
  '028300':'HLB',  '240810':'원익IPS',  '087010':'펩트론',  '000250':'삼천당제약',  '039030':'이오테크닉스',
  '298380':'에이비엘바이오',  '141080':'리가켐바이오',  '403870':'HPSP',  '178320':'서진시스템',  '222800':'심텍',
  '108490':'로보티즈',  '214370':'케어젠',  '319660':'피에스케이',  '347850':'디앤디파마텍',  '095340':'ISC',
  '310210':'보로노이',  '080220':'제주반도체',  '084370':'유진테크',  '095610':'테스',  '145020':'휴젤',
  '214450':'파마리서치',  '067310':'하나마이크론',  '064760':'티씨케이',  '214150':'클래시스',  '005290':'동진쎄미켐',
  '031980':'피에스케이홀딩스',  '226950':'올릭스',  '357780':'솔브레인',  '263750':'펄어비스',  '237690':'에스티팜',
  '098460':'고영',  '131970':'두산테스나',  '131290':'티에스이',  '032820':'우리기술',  '089030':'테크윙',
  '257720':'실리콘투',  '058610':'에스피지',  '290650':'엘앤씨바이오',  '218410':'RFHIC',  '007390':'네이처셀',
  '083650':'비에이치아이',  '068760':'셀트리온제약',  '035900':'JYP Ent.',  '078600':'대주전자재료',  '140860':'파크시스템스',
  '041510':'에스엠',  '323280':'태성',  '039200':'오스코텍',  '096530':'씨젠',  '060370':'LS마린솔루션',
  '101490':'에스앤에스텍',  '445680':'큐리옥스바이오시스템즈',  '032500':'케이엠더블유',  '166090':'하나머티리얼즈',  '232140':'와이씨',
  '003380':'하림지주',  '195940':'HK이노엔',  '036540':'SFA반도체',  '417200':'LS머트리얼즈',  '328130':'루닛',
  '189300':'인텔리안테크',  '085660':'차바이오텍',  '065350':'신성델타테크',  '183300':'코미코',  '388720':'유일로보틱스',
  '281740':'레이크머티리얼즈',  '204270':'제이앤티씨',  '161580':'필옵틱스',  '466100':'클로봇',  '137400':'피엔티',
  '074600':'원익QnC',  '036830':'솔브레인홀딩스',  '056190':'에스에프에이',  '048410':'현대바이오',  '213420':'덕산네오룩스',
  '033100':'제룡전기',  '035760':'CJ ENM',  '222080':'씨아이에스',  '086450':'동국제약',  '050890':'쏠리드',
  '046890':'서울반도체',  '293490':'카카오게임즈',  '122870':'와이지엔터테인먼트',  '014620':'성광벤드',  '052400':'코나아이',
  '358570':'지아이이노베이션',  '241710':'코스메카코리아',  '171090':'선익시스템',  '006730':'서부T&D',  '253450':'스튜디오드래곤',
  '056080':'유진로봇',  '032190':'다우데이타',  '121600':'나노신소재',  '365340':'성일하이텍',  '348370':'엔켐',
  '036810':'에프에스티',  '336570':'원텍',  '059090':'미코',  '053800':'안랩',  '225570':'넥슨게임즈',
  '060250':'NHN KCP',  '009520':'포스코엠텍',  '082270':'젬백스',  '383310':'에코프로에이치엔',  '348210':'넥스틴',
  '112040':'위메이드',  '086900':'메디톡스',  '399720':'가온칩스',  '253590':'네오셈',  '015750':'성우하이텍',
  '033500':'동성화인텍',  '376300':'디어유',  '272290':'이녹스첨단소재',  '067160':'SOOP',  '042000':'카페24',
  '211050':'인카금융서비스',  '460930':'현대힘스',  '278280':'천보',  '214430':'아이쓰리시스템',  '018290':'브이티',
  '025980':'아난티',  '041190':'우리기술투자',  '036620':'감성코퍼레이션',  '030520':'한글과컴퓨터',  '025320':'시노펙스',
  '060280':'큐렉소',  '251970':'펌텍코리아',  '215200':'메가스터디교육',  '095660':'네오위즈',  '025900':'동화기업',
  '079370':'제우스',  '069080':'웹젠',  '101730':'위메이드맥스',  '078340':'컴투스',  '053030':'바이넥스',
  '058970':'엠로',  '352480':'씨앤씨인터내셔널',  '215000':'골프존',  '200130':'콜마비앤에이치',  '108860':'셀바스AI',
  '304100':'솔트룩스',  '101360':'에코앤드림',  '194480':'데브시스터즈',
};

// 어떤 입력(숫자/'1,234'/'1.234'/'1234.0')이 와도 천단위 쉼표 정수 문자열로 정규화
function fmtPriceComma(v) {
  if (v == null) return '—';
  let n;
  if (typeof v === 'number') {
    n = v;
  } else {
    // 문자열이면 숫자 외 문자 제거 후 정수화 (마침표/쉼표 모두 천단위 구분자로 간주)
    const digits = String(v).replace(/[^\d]/g, '');
    n = digits ? parseInt(digits, 10) : NaN;
  }
  if (!isFinite(n)) return '—';
  return Math.round(n).toLocaleString('en-US'); // en-US: 천단위 쉼표 보장
}

function initTicker() {
  if (!allData) return;
  const names = TICKER_NAMES;
  names.forEach((name, i) => {
    const prices = allData.prices[name] || [];
    if (prices.length < 2) return;
    const last = prices[prices.length-1];
    const prev = prices[prices.length-2];
    const price = (Array.isArray(last) && last.length===5) ? last[4] : last[1]; // OHLC면 종가(4)
    const prevPrice = (Array.isArray(prev) && prev.length===5) ? prev[4] : prev[1];
    const chg = ((Number(price) - Number(prevPrice)) / Number(prevPrice) * 100);
    const priceStr = fmtPriceComma(price);
    const chgStr = (chg>=0?'▲ +':'▼ ') + Math.abs(chg).toFixed(2)+'%';
    const cls = Math.abs(chg)<0.01?'flat':chg>0?'up':'down';
    ['', 'b'].forEach(suffix => {
      const pe = document.getElementById('tk-'+i+suffix);
      const ce = document.getElementById('tkc-'+i+suffix);
      if (pe) pe.textContent = priceStr;
      if (ce) { ce.textContent = chgStr; ce.className = 'ticker-chg '+cls; }
    });
  });
}

function openModal(name) {
  document.getElementById('modal-' + name).style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // 문의 폼 초기화
  if (name === 'contact') {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('contactDone').style.display = 'none';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMsg').value = '';
    document.getElementById('contactCount').textContent = '(0/2000)';
    const btn = document.getElementById('contactSendBtn');
    if(btn){btn.disabled=false;btn.style.opacity='1';btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> 보내기';}
  }
}

function closeModal(name) {
  document.getElementById('modal-' + name).style.display = 'none';
  document.body.style.overflow = '';
}


function sendContactForm() {
  // EmailJS 초기화 (매번 확인)
  try { emailjs.init('ab10m2BKGfZFSyt3b'); } catch(e) {}

  const emailEl = document.getElementById('contactEmail');
  const msgEl = document.getElementById('contactMsg');
  const btnEl = document.getElementById('contactSendBtn');
  const email = emailEl.value.trim();
  const msg = msgEl.value.trim();

  // 10자 미만 검증
  if (msg.length < 10) {
    msgEl.style.borderColor = 'rgba(229,62,62,0.6)';
    msgEl.placeholder = '최소 10자 이상 작성해주세요.';
    msgEl.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
      msgEl.style.borderColor = 'rgba(255,255,255,0.09)';
      msgEl.style.animation = '';
      msgEl.placeholder = '문의 내용을 자유롭게 적어주세요. (최소 10자)';
    }, 2000);
    return;
  }

  btnEl.disabled = true;
  btnEl.style.opacity = '0.6';
  btnEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 전송 중...';

  // EmailJS로 전송 시도
  const serviceId = 'service_wgtx0lg';
  const templateId = 'template_pboqi36';
  const params = {
    name: email || '(이메일 미입력)',
    message: msg,
    time: new Date().toLocaleString('ko-KR')
  };

  function showDone() {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('contactDone').style.display = 'block';
  }

  try {
    emailjs.send(serviceId, templateId, params)
      .then(showDone)
      .catch(err => { console.error('EmailJS 오류:', err); showDone(); });
  } catch(e) {
    console.error('EmailJS 초기화 실패:', e);
    showDone();
  }
}


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['terms','privacy','disclaimer','contact'].forEach(closeModal);
  }
});

// ════════════════════════════════════════
// 실시간 시세 (한국투자증권 KIS → Apps Script 웹앱 on-demand)
// ════════════════════════════════════════
// ▼▼ 배포 후 여기에 Apps Script 웹앱 URL을 넣으세요 ▼▼
const KIS_PROXY_URL = 'https://script.google.com/macros/s/AKfycbzz6fr6yCeli_TzriLE3IkAB1m7-9p1qDGz0MfKhO4KBAjLmfDI6M7VpL1J0yK2xI8/exec';
// ▲▲ (Apps Script → 배포 → 새 배포 → 웹앱 → URL 복사) ▲▲

let realtimePrice = null;

// 현재 보고 있는 종목 1개만 실시간 조회 (on-demand)
async function fetchRealtime() {
  if (!currentStock) return;
  if (!KIS_PROXY_URL || KIS_PROXY_URL.indexOf('배포후') !== -1) return; // 미설정 시 건너뜀
  try {
    const url = KIS_PROXY_URL + '?action=price&stock=' + encodeURIComponent(currentStock) + '&t=' + Date.now();
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.prices && data.prices[currentStock]) {
      realtimePrice = data.prices[currentStock];
      applyRealtimePrice();
    }
  } catch(e) {}
}

// 숫자 굴림 애니메이션: el 안에 자릿수별 컬럼을 만들고, 바뀐 자리만 방향에 맞춰 굴린다.
// dir > 0(상승): 아래에서 위로, dir < 0(하락): 위에서 아래로. 색 변화는 없음.
function flipNumber(el, text, dir) {
  if (!el) return;
  const h = el.dataset.flipH || (el.dataset.flipH = String(parseFloat(getComputedStyle(el).fontSize) * 1.0 || 34) + 'px');
  // 자릿수 개수가 바뀌면(예: 99,000→100,000) 컬럼 재생성
  if (!el.classList.contains('flip') || el._len !== text.length) {
    el.classList.add('flip');
    el.innerHTML = '';
    el._cols = [];
    for (let i = 0; i < text.length; i++) {
      const col = document.createElement('span');
      col.className = 'flip-col';
      col.style.height = h;
      const inner = document.createElement('span');
      inner.className = 'flip-inner';
      const a = document.createElement('span'); a.style.height = h; a.textContent = text[i];
      const b = document.createElement('span'); b.style.height = h; b.textContent = text[i];
      inner.appendChild(a); inner.appendChild(b);
      col.appendChild(inner);
      col._inner = inner; col._a = a; col._b = b; col._val = text[i];
      el.appendChild(col);
      el._cols.push(col);
    }
    el._len = text.length;
    return;
  }
  // 바뀐 자리만 굴림
  for (let i = 0; i < text.length; i++) {
    const col = el._cols[i];
    const c = text[i];
    if (!col || col._val === c) continue;
    if (dir >= 0) {
      col._a.textContent = c; col._b.textContent = col._val;
      col._inner.style.transition = 'none';
      col._inner.style.transform = 'translateY(-' + col.offsetHeight + 'px)';
      col.offsetHeight; // reflow
      col._inner.style.transition = '';
      col._inner.style.transform = 'translateY(0)';
    } else {
      col._a.textContent = col._val; col._b.textContent = c;
      col._inner.style.transition = 'none';
      col._inner.style.transform = 'translateY(0)';
      col.offsetHeight;
      col._inner.style.transition = '';
      col._inner.style.transform = 'translateY(-' + col.offsetHeight + 'px)';
    }
    col._val = c;
  }
}

function applyRealtimePrice() {
  if (!realtimePrice || !currentStock) return;
  const p = realtimePrice;
  const priceEl  = document.getElementById('currentPrice');
  const changeEl = document.getElementById('currentChange');
  const numEl  = document.getElementById('latestPriceNum');
  const wonEl  = document.getElementById('latestPriceWon');
  const latestEl = document.getElementById('latestPrice');
  const priceStr = fmtPriceComma(p.price);
  // 방향: 직전 표시가 대비 상승/하락
  const dir = (window._lastShownPrice == null) ? 0 : (p.price - window._lastShownPrice);
  if (priceEl)  priceEl.textContent  = priceStr + '원';
  if (numEl) flipNumber(numEl, priceStr, dir);
  if (wonEl) wonEl.textContent = '원';
  if (latestEl) latestEl.style.opacity = '1';
  window._lastShownPrice = p.price;
  // priceChange(과거 종가 기준)도 실시간 등락률로 갱신
  const pcEl = document.getElementById('priceChange');
  if (pcEl && typeof p.change === 'number') {
    const sign = p.change >= 0 ? '▲ +' : '▼ ';
    pcEl.textContent = sign + Math.abs(p.change).toFixed(2) + '%';
    pcEl.className = 'price-change ' + (p.change >= 0 ? 'up' : 'down');
    pcEl.style.opacity = '1';
  }
  if (changeEl) {
    const sign = p.change >= 0 ? '▲' : '▼';
    changeEl.textContent = sign + ' ' + Math.abs(p.change).toFixed(2) + '%';
    changeEl.className = 'price-change ' + (p.change >= 0 ? 'up' : 'down');
  }
  // 티커바: 현재 종목이 고정 10종목에 있으면 그 항목(원본+복제 'b')도 갱신
  const tIdx = TICKER_NAMES.indexOf(currentStock);
  if (tIdx !== -1) {
    const chgStr = (p.change>=0?'▲ +':'▼ ') + Math.abs(p.change).toFixed(2)+'%';
    const cls = 'ticker-chg ' + (Math.abs(p.change)<0.01?'flat':p.change>0?'up':'down');
    ['', 'b'].forEach(function(sfx){
      const pe = document.getElementById('tk-'+tIdx+sfx);
      const ce = document.getElementById('tkc-'+tIdx+sfx);
      if (pe) flipNumber(pe, priceStr, dir);
      if (ce) { ce.textContent = chgStr; ce.className = cls; }
    });
  }
  // ── 차트에 오늘 캔들 추가/갱신 ──
  updateTodayCandle(p);
}

// 장중 실시간가로 차트 끝에 '오늘 캔들'을 추가하거나 갱신
// 차트를 통째로 다시 그리지 않고, 마지막 포인트만 in-place 갱신하여
// 사용자의 줌/스크롤 위치를 유지하고 깜빡임을 없앤다.
function updateTodayCandle(p) {
  if (!chartPrices || !chartPrices.length || !p || !p.price) return;
  // 오늘 날짜(KST) YYYY-MM-DD
  const kst = new Date(new Date().toLocaleString('en-US', {timeZone:'Asia/Seoul'}));
  const today = kst.getFullYear() + '-'
    + String(kst.getMonth()+1).padStart(2,'0') + '-'
    + String(kst.getDate()).padStart(2,'0');
  const last = chartPrices[chartPrices.length-1];
  const candle = {
    date: today,
    open:  p.open || p.price,
    high:  p.high || p.price,
    low:   p.low  || p.price,
    close: p.price,
    price: p.price
  };

  const hadToday = last && last.date === today;
  if (hadToday) {
    chartPrices[chartPrices.length-1] = candle;       // 값만 갱신
  } else if (!last || last.date < today) {
    chartPrices.push(candle);                          // 오늘 캔들 신규 추가
    todayCandleAdded = true;
  } else {
    return; // 오늘보다 미래 데이터가 있는 비정상 상황 — 무시
  }

  // 차트 인스턴스가 없으면(아직 렌더 전) 다음 정식 렌더에 반영되므로 종료
  if (!chartInstance || !chartInstance.data) return;

  const ds = chartInstance.data.datasets;
  const labels = chartInstance.data.labels;
  if (!labels || !ds || !ds.length) return;

  if (hadToday) {
    // 마지막 포인트 in-place 갱신
    const i = labels.length - 1;
    if (ds[0] && ds[0].data) ds[0].data[i] = candle.price;            // 종가 라인
    if (chartInstance._candleData) {
      chartInstance._candleData[i] = { o:candle.open, h:candle.high, l:candle.low, c:candle.close };
    }
  } else {
    // 새 라벨/포인트 추가
    labels.push(today);
    if (ds[0] && ds[0].data) ds[0].data.push(candle.price);
    if (ds[1] && ds[1].data) ds[1].data.push(null);                  // 공시 마커 없음
    // 패턴평균 등 추가 데이터셋이 있으면 null로 자리 맞춤
    for (let k = 2; k < ds.length; k++) {
      if (ds[k] && Array.isArray(ds[k].data)) ds[k].data.push(null);
    }
    if (chartInstance._candleData) {
      chartInstance._candleData.push({ o:candle.open, h:candle.high, l:candle.low, c:candle.close });
    }
  }
  // 애니메이션 없이 즉시 갱신 → 깜빡임·위치 리셋 없음
  chartInstance.update('none');
}

function isMarketOpen() {
  const now = new Date();
  const kst = new Date(now.toLocaleString('en-US', {timeZone:'Asia/Seoul'}));
  const day = kst.getDay();
  const t = kst.getHours() * 60 + kst.getMinutes();
  return (day >= 1 && day <= 5 && t >= 9*60 && t < 15*60+36);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 오늘의 공시 모달 (당일 최초 방문 1회) ──
function closeTodayDisc() {
  var o = document.getElementById('todayDiscOverlay');
  if (o) o.style.display = 'none';
}
function buildTodayDisc() {
  if (!allData || !allData.disclosures) return;
  // 오늘(KST) YYYY-MM-DD
  var kst = new Date(new Date().toLocaleString('en-US', {timeZone:'Asia/Seoul'}));
  var today = kst.getFullYear() + '-' + String(kst.getMonth()+1).padStart(2,'0') + '-' + String(kst.getDate()).padStart(2,'0');

  // 하루 1회: 오늘 이미 봤으면 표시 안 함
  try {
    if (localStorage.getItem('fc_today_disc_seen') === today) return;
  } catch(e) {}

  // 코드 역매핑
  var nameToCode = {};
  for (var c in CODE_TO_NAME) nameToCode[CODE_TO_NAME[c]] = c;

  // 오늘 공시 추출 → 없으면 최근 공시 폴백
  var all = allData.disclosures.slice();
  var todays = all.filter(function(d){ return d.date === today; });
  var isFallback = false;
  var list;
  if (todays.length) {
    list = todays;
  } else {
    isFallback = true;
    // 최근 날짜순 정렬 후 상위
    list = all.slice().sort(function(a,b){ return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  }

  // 영향도(가중치 절댓값) 순 정렬 후 상위 3 (폴백이면 최근순 유지하며 상위 3)
  var scored = list.map(function(d){ return { d:d, w: signalWeightOf(d) }; });
  if (!isFallback) scored.sort(function(a,b){ return Math.abs(b.w) - Math.abs(a.w); });
  var top = scored.slice(0, 3);
  if (!top.length) return;

  // 제목/날짜
  document.getElementById('todayDiscTitle').innerHTML = isFallback ? '🔥 최근 공시' : '🔥 오늘의 공시';

  // 목록 렌더
  var html = '';
  top.forEach(function(it, i){
    var d = it.d;
    var code = nameToCode[d.name] || '';
    var href = code ? ('/stock/' + code + '.html') : ('/?stock=' + encodeURIComponent(d.name));
    var isWarn = it.w < 0;
    var badgeColor = isWarn ? '#ff5b6e' : '#00d084';
    var badgeBg = isWarn ? 'rgba(255,91,110,0.12)' : 'rgba(0,208,132,0.12)';
    var badgeText = isWarn ? '주의 공시' : d.type;
    html += '<div onclick="goTodayDisc(\'' + encodeURIComponent(d.name) + '\')" style="display:flex;align-items:center;gap:11px;padding:12px 13px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;cursor:pointer;">'
      + '<div style="font-size:12px;font-weight:700;color:var(--text3);">' + (i+1) + '</div>'
      + '<div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:600;color:var(--text);">' + d.name + '</div>'
      + '<div style="font-size:12px;color:var(--text2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (d.title || d.type) + '</div></div>'
      + '<div style="font-size:10.5px;color:' + badgeColor + ';background:' + badgeBg + ';padding:2px 7px;border-radius:6px;font-weight:600;white-space:nowrap;">' + badgeText + '</div>'
      + '</div>';
  });
  document.getElementById('todayDiscList').innerHTML = html;

  // 표시 + 오늘 본 것으로 기록
  document.getElementById('todayDiscOverlay').style.display = 'flex';
  try { localStorage.setItem('fc_today_disc_seen', today); } catch(e) {}
}
function goTodayDisc(encName) {
  var name = decodeURIComponent(encName);
  closeTodayDisc();
  if (typeof selectStock === 'function') selectStock(name);
}
// 페이지 1/3 이상 스크롤 시 '맨 위로' 버튼 표시
function updateToTopBtn() {
  const btn = document.getElementById('toTopBtn');
  if (!btn) return;
  const threshold = (document.documentElement.scrollHeight - window.innerHeight) / 3;
  if (window.scrollY > threshold && threshold > 40) btn.classList.add('show');
  else btn.classList.remove('show');
}
window.addEventListener('scroll', updateToTopBtn, { passive: true });
window.addEventListener('resize', updateToTopBtn, { passive: true });
document.addEventListener('DOMContentLoaded', updateToTopBtn);

function startRealtimePolling() {
  fetchRealtime();
  setInterval(function() {
    if (isMarketOpen()) fetchRealtime();
  }, 10000);
}

document.addEventListener('DOMContentLoaded', startRealtimePolling);
