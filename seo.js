(function () {
  'use strict';

  const ORIGIN = 'https://www.rcvpower.com';
  const OG_IMAGE = ORIGIN + '/assets/images/sda/sda-async-render.png';
  const VALID_PAGES = new Set([
    'home',
    'company',
    'ir',
    'news',
    'technology',
    'ip',
    'product',
    'market',
    'business'
  ]);

  const LANGUAGE_PATHS = {
    ko: '/',
    en: '/en.html',
    ja: '/ja.html'
  };

  const META = {
    ko: {
      locale: 'ko_KR',
      pages: {
        home: {
          title: '리시브파워 | Lambda 소프트웨어 정의 비행체',
          description: '리시브파워는 화물 운송부터 사업화하는 수직이착륙기 Lambda를 개발합니다. 비동기 틸트로터와 결정론적 제어로 지역 항공 물류의 새로운 기준을 만듭니다.'
        },
        company: {
          title: '회사소개 | 리시브파워',
          description: '지능형 로봇과 Physical AI 기술을 바탕으로 Lambda 소프트웨어 정의 비행체를 개발하는 리시브파워를 소개합니다.'
        },
        ir: {
          title: '투자자 관계 | 리시브파워',
          description: 'Lambda의 화물 우선 시장 진입 전략과 플릿, MRO, Flight OS, 지역 회랑으로 확장하는 반복수익 구조를 소개합니다.'
        },
        news: {
          title: '소식·보도 | 리시브파워',
          description: '리시브파워의 특허, 비행체 개발, 사업 협력과 관련된 최신 소식과 언론 보도를 확인하세요.'
        },
        technology: {
          title: '로보틱스 기술 | 리시브파워',
          description: 'Physical AI, 센서융합, 산업제어와 엔지니어링 시스템을 연결해 실제 기계와 비행체를 움직이는 리시브파워의 기술을 소개합니다.'
        },
        ip: {
          title: 'SDA 특허 포트폴리오 | 리시브파워',
          description: '독립 비동기 틸트 추진, 가상조종면, 결정론적 비행관리와 비상비행 기술로 구성된 SDA 특허 아키텍처를 소개합니다.'
        },
        product: {
          title: 'Lambda 화물용 수직이착륙기 | 리시브파워',
          description: '25kg급 실증기부터 890kg급 화물·유인 플랫폼까지 확장하는 Lambda 제품군과 규제 로드맵을 확인하세요.'
        },
        market: {
          title: '지역 항공 물류 시장 | 리시브파워',
          description: '부산–후쿠오카를 포함한 시간 민감 화물 회랑과 Lambda 지역 항공 물류의 시장 진입 전략을 소개합니다.'
        },
        business: {
          title: '사업·협력 | 리시브파워',
          description: '특허 라이선스, 개발·제조·운항 JV, 노선 검토와 물류 파트너십을 포함한 리시브파워의 협력 구조를 소개합니다.'
        }
      }
    },
    en: {
      locale: 'en_US',
      pages: {
        home: {
          title: 'Receivepower | Lambda Software-Defined Aircraft',
          description: 'Receivepower is developing Lambda, a cargo-first VTOL aircraft for regional air logistics. Its asynchronous tiltrotor architecture is designed for simpler manufacturing and predictable control.'
        },
        company: {
          title: 'Company | Receivepower',
          description: 'Meet Receivepower, a Physical AI and robotics company developing the Lambda software-defined aircraft platform.'
        },
        ir: {
          title: 'Investor Relations | Receivepower',
          description: 'Explore Lambda’s cargo-first market strategy and recurring revenue model across fleets, MRO, Flight OS, and regional corridors.'
        },
        news: {
          title: 'News | Receivepower',
          description: 'Read the latest Receivepower news covering patents, aircraft development, partnerships, and business expansion.'
        },
        technology: {
          title: 'Robotics Technology | Receivepower',
          description: 'Explore the Physical AI, sensor fusion, industrial control, and engineering systems behind Receivepower aircraft and machines.'
        },
        ip: {
          title: 'SDA Patent Portfolio | Receivepower',
          description: 'Explore the SDA patent architecture spanning asynchronous tilt propulsion, virtual control surfaces, deterministic flight management, and emergency flight.'
        },
        product: {
          title: 'Lambda Cargo VTOL Aircraft | Receivepower',
          description: 'Explore the Lambda product and certification roadmap from a 25 kg demonstrator to 890 kg cargo and crewed platforms.'
        },
        market: {
          title: 'Regional Air Logistics Market | Receivepower',
          description: 'Explore Lambda’s regional air-logistics strategy for time-sensitive cargo corridors, including the Busan–Fukuoka route.'
        },
        business: {
          title: 'Business and Partnerships | Receivepower',
          description: 'Explore Receivepower partnerships across IP licensing, development, manufacturing, flight operations, and logistics corridors.'
        }
      }
    },
    ja: {
      locale: 'ja_JP',
      pages: {
        home: {
          title: 'リシーブパワー | Lambdaソフトウェア定義航空機',
          description: 'リシーブパワーは、貨物輸送から事業化するVTOL機Lambdaを開発しています。非同期ティルトローターと決定論的制御により、地域航空物流の実用化を目指します。'
        },
        company: {
          title: '会社紹介 | リシーブパワー',
          description: 'Physical AIとロボティクスを基盤に、Lambdaソフトウェア定義航空機を開発するリシーブパワーをご紹介します。'
        },
        ir: {
          title: '投資家情報 | リシーブパワー',
          description: 'Lambdaの貨物優先市場戦略と、フリート、MRO、Flight OS、地域回廊へ展開する継続収益モデルをご紹介します。'
        },
        news: {
          title: 'ニュース | リシーブパワー',
          description: 'リシーブパワーの特許、航空機開発、協業、事業展開に関する最新ニュースと報道をご覧ください。'
        },
        technology: {
          title: 'ロボティクス技術 | リシーブパワー',
          description: '航空機と実機を動かすPhysical AI、センサー融合、産業制御、エンジニアリングシステムをご紹介します。'
        },
        ip: {
          title: 'SDA特許ポートフォリオ | リシーブパワー',
          description: '非同期ティルト推進、仮想操縦翼面、決定論的飛行管理、緊急飛行で構成されるSDA特許アーキテクチャをご紹介します。'
        },
        product: {
          title: '貨物輸送用VTOL機Lambda | リシーブパワー',
          description: '25kg級実証機から890kg級の貨物・有人プラットフォームへ展開するLambda製品と認証ロードマップをご覧ください。'
        },
        market: {
          title: '地域航空物流市場 | リシーブパワー',
          description: '釜山–福岡を含む時間重視の貨物回廊と、Lambda地域航空物流の市場参入戦略をご紹介します。'
        },
        business: {
          title: '事業・パートナーシップ | リシーブパワー',
          description: '特許ライセンス、開発・製造・運航JV、路線検討、物流パートナーシップを含む協力構造をご紹介します。'
        }
      }
    }
  };

  function currentLanguage() {
    const lang = (document.documentElement.lang || 'ko').toLowerCase();
    return lang.startsWith('en') ? 'en' : lang.startsWith('ja') ? 'ja' : 'ko';
  }

  function routeUrl(language, page, section) {
    const url = new URL(LANGUAGE_PATHS[language], ORIGIN);
    if (page !== 'home') {
      url.searchParams.set('page', page);
    }
    if (page === 'business' && section) {
      url.searchParams.set('section', section);
    }
    return url.toString();
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', value);
    }
  }

  function update(page, section) {
    const safePage = VALID_PAGES.has(page) ? page : 'home';
    const language = currentLanguage();
    const languageMeta = META[language];
    const pageMeta = languageMeta.pages[safePage] || languageMeta.pages.home;
    const canonicalUrl = routeUrl(language, safePage, section);

    document.title = pageMeta.title;
    setMeta('meta[name="description"]', pageMeta.description);
    setMeta('meta[property="og:title"]', pageMeta.title);
    setMeta('meta[property="og:description"]', pageMeta.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:locale"]', languageMeta.locale);
    setMeta('meta[property="og:image"]', OG_IMAGE);
    setMeta('meta[name="twitter:title"]', pageMeta.title);
    setMeta('meta[name="twitter:description"]', pageMeta.description);
    setMeta('meta[name="twitter:image"]', OG_IMAGE);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    Object.keys(LANGUAGE_PATHS).forEach(function (alternateLanguage) {
      const alternate = document.querySelector('link[rel="alternate"][hreflang="' + alternateLanguage + '"]');
      if (alternate) {
        alternate.setAttribute('href', routeUrl(alternateLanguage, safePage, section));
      }
    });

    const fallback = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (fallback) {
      fallback.setAttribute('href', routeUrl('ko', safePage, section));
    }
  }

  window.ReceivepowerSEO = { update: update };

  function updateFromLocation() {
    const params = new URLSearchParams(window.location.search);
    update(params.get('page') || 'home', params.get('section'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFromLocation, { once: true });
  } else {
    updateFromLocation();
  }
})();
