(function () {
  // English text is read from index.html itself; only Arabic is listed here.
  var AR = {
    title: 'مطاعم قلعة الشهباء – تقديم الطعام خارج المنزل',
    logo: 'مطاعم قلعة الشهباء',
    h1: 'نطبخ في موقع مناسبتك، ليصل كل طبق ساخناً.',
    lead: 'أعراس ولقاءات عائلية وإفطارات رمضان وفعاليات الشركات. أخبرنا بالمكان والموعد، وسيصل فريقنا بالمطبخ والعمال والطعام.',
    f1t: 'الطبخ في موقعك',
    f1d: 'كبسة ومندي ومشويات تُحضَّر طازجة في مجلسك أو خيمتك أو مزرعتك.',
    f2t: 'من 25 إلى 2,000 ضيف',
    f2d: 'قوائم الطعام وعدد العمال بحسب حجم مناسبتك.',
    f3t: 'نرد عليك خلال 24 ساعة',
    f3d: 'نؤكد معك القائمة والسعر والموعد بالاتصال.',
    bookTitle: 'احجز مناسبتك',
    bookSub: 'عبّئ البيانات أدناه وسنتصل بك للتأكيد.',
    lgYou: 'بياناتك',
    name: 'الاسم الكامل',
    phone: 'رقم الجوال',
    idno: 'رقم الهوية الوطنية أو الإقامة',
    calType: 'نوع التقويم',
    calG: 'ميلادي',
    calH: 'هجري',
    day: 'اليوم',
    month: 'الشهر',
    year: 'السنة',
    lgWhen: 'اليوم والوقت',
    date: 'تاريخ المناسبة',
    time: 'وقت تقديم الطعام',
    lgWhere: 'موقع الحفلة',
    address: 'عنوان المكان',
    addressPh: 'اسم المكان، الشارع، أقرب معلم',
    city: 'المدينة',
    district: 'الحي',
    postal: 'الرمز البريدي (اختياري)',
    lgEvent: 'مناسبتك',
    type: 'نوع المناسبة',
    choose: 'اختر',
    wedding: 'زواج',
    birthday: 'عيد ميلاد',
    family: 'لقاء عائلي',
    iftar: 'إفطار رمضان',
    corporate: 'فعالية شركة',
    other: 'أخرى',
    guests: 'عدد الضيوف',
    food: 'نوع القائمة',
    rice: 'كبسة ومندي',
    grill: 'مشويات ومضبي',
    both: 'الاثنان معاً',
    notes: 'هل هناك شيء آخر نحتاج معرفته؟',
    notesPh: 'أطباق خاصة، حساسية، وقت التجهيز',
    submit: 'أرسل طلب الحجز',
    note: 'هذا ليس دفعاً. نؤكد السعر بعد الاتصال بك.',
    doneTitle: 'تم استلام طلبك',
    doneSub: 'سنتصل بك على الرقم أدناه خلال 24 ساعة.',
    again: 'حجز جديد',
    menusTitle: 'ما نحضره إلى موقعك',
    m1t: 'كبسة ومندي',
    m1d: 'أرز مطبوخ ببطء مع لحم الضأن أو الدجاج أو الإبل، يُقدَّم في صواني كبيرة للجميع.',
    m2t: 'مشويات ومضبي',
    m2d: 'مشاوي مشكلة ومضبي ومطبق تُحضَّر في الموقع على الفحم.',
    m3t: 'قهوة وتمر وحلويات',
    m3d: 'ضيافة قهوة عربية وشاي مع تمر طازج وكنافة ولقيمات لضيوفك.',
    stepsTitle: 'كيف نعمل',
    s1n: 'الخطوة 1', s1t: 'أرسل بياناتك', s1d: 'أرسل التاريخ والوقت والمكان عبر النموذج.',
    s2n: 'الخطوة 2', s2t: 'نتصل بك', s2d: 'نتفق معك على القائمة والسعر، ثم نأخذ دفعة مقدمة صغيرة.',
    s3n: 'الخطوة 3', s3t: 'نصل ونقدّم', s3d: 'يجهّز فريقنا المكان ويطبخ ويقدّم الطعام ثم ينظّف.',
    foot: 'مطاعم قلعة الشهباء لتقديم الطعام خارج المنزل · نعمل يومياً من 9 صباحاً حتى 11 مساءً · الرياض وجدة والدمام وما حولها · hello@qalatalshahba.example',
    sName: 'الاسم', sPhone: 'الجوال', sWhen: 'اليوم والوقت', sWhere: 'الموقع', sEvent: 'المناسبة', sFood: 'القائمة',
    guestsWord: 'ضيف', sRef: 'رقم الحجز', sending: 'جارٍ الإرسال...', errSend: 'تعذّر إرسال الطلب. تحقق من الاتصال وحاول مرة أخرى، أو اتصل بنا.', errConfig: 'لم يتم ربط قاعدة البيانات بعد. أضف مفتاح Supabase في ملف index.html.', sId: 'الهوية / الإقامة', eqH: 'التاريخ الهجري: ', eqG: 'التاريخ الميلادي: ', ariaLang: 'تغيير اللغة', langBtn: 'English'
  };
  var EN = { sName: 'Name', sPhone: 'Mobile', sId: 'Saudi ID / Iqama', sWhen: 'Day and time', sWhere: 'Location',
    sEvent: 'Event', sFood: 'Menu', sRef: 'Booking number', sending: 'Sending...', errSend: 'We could not send your request. Check your connection and try again, or call us.', errConfig: 'The database is not connected yet. Add your Supabase key in index.html.', guestsWord: 'guests', ariaLang: 'Switch language', langBtn: 'العربية',
    eqH: 'Hijri date: ', eqG: 'Gregorian date: ', title: document.title };

  var textNodes = document.querySelectorAll('[data-i18n]');
  var phNodes = document.querySelectorAll('[data-i18n-ph]');
  textNodes.forEach(function (el) { EN[el.dataset.i18n] = EN[el.dataset.i18n] || el.textContent; });
  phNodes.forEach(function (el) { EN[el.dataset.i18nPh] = el.getAttribute('placeholder'); });

  var lang = 'en', HIJRI = 'islamic-umalqura';
  var form = document.getElementById('form'), box = document.getElementById('confirm'),
      sum = document.getElementById('summary'), dateIn = document.getElementById('date'),
      cal = document.getElementById('cal'), gBox = document.getElementById('gBox'),
      hBox = document.getElementById('hBox'), hd = document.getElementById('hd'),
      hm = document.getElementById('hm'), hy = document.getElementById('hy'),
      equiv = document.getElementById('equiv'), btn = document.getElementById('lang');

  function t(k) { return (lang === 'ar' ? AR : EN)[k]; }
  function loc(c) { return (lang === 'ar' ? 'ar-SA' : 'en-GB') + '-u-ca-' + c + '-nu-latn'; }
  function fmt(d, c) {
    return new Intl.DateTimeFormat(loc(c), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }

  // ----- Hijri calendar: the next 750 days with their Hijri day/month/year -----
  var hp = new Intl.DateTimeFormat('en-u-ca-' + HIJRI + '-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' });
  var days = [], now = new Date();
  for (var i = 0; i < 750; i++) {
    var d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 12), o = {};
    hp.formatToParts(d0).forEach(function (p) {
      if (p.type === 'day' || p.type === 'month' || p.type === 'year') o[p.type] = parseInt(p.value, 10);
    });
    days.push({ d: d0, y: o.year, m: o.month, day: o.day });
  }
  function uniq(a) { return a.filter(function (v, k) { return a.indexOf(v) === k; }); }
  function fill(sel, items, val) {
    sel.innerHTML = '';
    items.forEach(function (it) {
      var op = document.createElement('option');
      op.value = it.v; op.textContent = it.t; if (it.v === val) op.selected = true;
      sel.appendChild(op);
    });
  }
  function monthName(y, m) {
    var e = days.filter(function (x) { return x.y === y && x.m === m; })[0];
    return new Intl.DateTimeFormat(loc(HIJRI), { month: 'long' }).format(e.d);
  }
  function renderHijri() {
    var y = +hy.value, m = +hm.value, d = +hd.value;
    var ys = uniq(days.map(function (x) { return x.y; }));
    if (ys.indexOf(y) < 0) y = ys[0];
    fill(hy, ys.map(function (v) { return { v: v, t: String(v) }; }), y);
    var ms = uniq(days.filter(function (x) { return x.y === y; }).map(function (x) { return x.m; }));
    if (ms.indexOf(m) < 0) m = ms[0];
    fill(hm, ms.map(function (v) { return { v: v, t: monthName(y, v) }; }), m);
    var ds = days.filter(function (x) { return x.y === y && x.m === m; }).map(function (x) { return x.day; });
    if (ds.indexOf(d) < 0) d = ds[0];
    fill(hd, ds.map(function (v) { return { v: v, t: String(v) }; }), d);
  }
  function chosenDate() {
    if (cal.value === 'G') return dateIn.value ? new Date(dateIn.value + 'T12:00:00') : null;
    var y = +hy.value, m = +hm.value, d = +hd.value;
    var e = days.filter(function (x) { return x.y === y && x.m === m && x.day === d; })[0];
    return e ? e.d : null;
  }
  function refreshDate() {
    var d = chosenDate();
    equiv.textContent = d ? (cal.value === 'G' ? t('eqH') + fmt(d, HIJRI) : t('eqG') + fmt(d, 'gregory')) : '';
  }
  function setCal() {
    var h = cal.value === 'H';
    gBox.hidden = h; hBox.hidden = !h;
    dateIn.disabled = h; dateIn.required = !h;
    [hd, hm, hy].forEach(function (s) { s.disabled = !h; s.required = h; });
    if (h) renderHijri();
    refreshDate();
  }

  // ----- Language -----
  function setLang(l) {
    lang = l;
    var h = document.documentElement;
    h.lang = l; h.dir = l === 'ar' ? 'rtl' : 'ltr';
    textNodes.forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    phNodes.forEach(function (el) { el.setAttribute('placeholder', t(el.dataset.i18nPh)); });
    document.title = t('title');
    btn.textContent = t('langBtn');
    btn.setAttribute('aria-label', t('ariaLang'));
    if (cal.value === 'H') renderHijri();
    refreshDate();
    try { localStorage.setItem('lang', l); } catch (e) {}
  }

  // Minimum Gregorian date = today
  var todayLocal = new Date(); todayLocal.setMinutes(todayLocal.getMinutes() - todayLocal.getTimezoneOffset());
  dateIn.min = todayLocal.toISOString().slice(0, 10);

  function label(name) { return form.elements[name].selectedOptions[0].textContent; }

  var go = form.querySelector('button.go'), errEl = document.getElementById('err');
  function pad(n) { return String(n).length < 2 ? '0' + n : String(n); }
  function hijriStr(d) {
    var o = {};
    hp.formatToParts(d).forEach(function (p) { if (p.type === 'day' || p.type === 'month' || p.type === 'year') o[p.type] = parseInt(p.value, 10); });
    return o.year + '-' + pad(o.month) + '-' + pad(o.day);
  }
  function showErr(k) { errEl.textContent = t(k); errEl.hidden = false; }

  function showSummary(f, d, ref) {
    var main = cal.value === 'G' ? 'gregory' : HIJRI, other = cal.value === 'G' ? HIJRI : 'gregory';
    var tm = new Date('2000-01-01T' + f.get('time')).toLocaleTimeString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB', { hour: 'numeric', minute: '2-digit' });
    var when = fmt(d, main) + ' (' + fmt(d, other) + ') – ' + tm;
    var id = String(f.get('idno'));
    var place = [f.get('address'), f.get('district'), f.get('city'), f.get('postal')].filter(Boolean).join(lang === 'ar' ? '، ' : ', ');
    var rows = [
      [t('sRef'), ref], [t('sName'), f.get('name')], [t('sPhone'), f.get('phone')],
      [t('sId'), id.charAt(0) + '••••••' + id.slice(-3)],
      [t('sWhen'), when], [t('sWhere'), place],
      [t('sEvent'), label('type') + ' · ' + f.get('guests') + ' ' + t('guestsWord')],
      [t('sFood'), label('food')]
    ];
    sum.innerHTML = '';
    rows.forEach(function (r) {
      var dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = r[0]; dd.textContent = r[1];
      sum.appendChild(dt); sum.appendChild(dd);
    });
    form.style.display = 'none'; box.classList.add('show'); box.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errEl.hidden = true;
    var cfg = window.SUPABASE_CONFIG || {};
    if (!cfg.url || !cfg.key || /YOUR_/.test(cfg.key)) { showErr('errConfig'); return; }
    var f = new FormData(form), d = chosenDate();
    var payload = {
      full_name: f.get('name'), phone: f.get('phone'), national_id: f.get('idno'),
      calendar_type: cal.value === 'G' ? 'gregorian' : 'hijri',
      event_date: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
      hijri_date: hijriStr(d), event_time: f.get('time'),
      address: f.get('address'), district: f.get('district'), city: f.get('city'), postal_code: f.get('postal'),
      event_type: f.get('type'), guests: parseInt(f.get('guests'), 10), menu: f.get('food'),
      notes: f.get('notes'), language: lang
    };
    var headers = { 'Content-Type': 'application/json', apikey: cfg.key };
    if (cfg.key.indexOf('eyJ') === 0) headers.Authorization = 'Bearer ' + cfg.key; // legacy anon (JWT) keys only
    go.disabled = true; go.textContent = t('sending');
    fetch(cfg.url + '/rest/v1/rpc/catering_submit_booking', { method: 'POST', headers: headers, body: JSON.stringify({ p: payload }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (ref) { showSummary(f, d, ref); })
      .catch(function () { showErr('errSend'); })
      .then(function () { go.disabled = false; go.textContent = t('submit'); });
  });

  document.getElementById('again').addEventListener('click', function () {
    form.reset(); setCal(); form.style.display = ''; box.classList.remove('show');
  });

  cal.addEventListener('change', setCal);
  dateIn.addEventListener('change', refreshDate);
  hy.addEventListener('change', function () { renderHijri(); refreshDate(); });
  hm.addEventListener('change', function () { renderHijri(); refreshDate(); });
  hd.addEventListener('change', refreshDate);
  btn.addEventListener('click', function () { setLang(lang === 'ar' ? 'en' : 'ar'); });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setCal();
  setLang(saved || ((navigator.language || '').slice(0, 2) === 'ar' ? 'ar' : 'en'));
})();
