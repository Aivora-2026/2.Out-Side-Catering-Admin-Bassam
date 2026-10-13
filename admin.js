(function () {
  var cfg = window.SUPABASE_CONFIG;
  var code = null, rows = [], idleTimer = null, lang = 'en';
  var IDLE_MS = 15 * 60 * 1000;
  var STATUSES = ['new', 'confirmed', 'completed', 'cancelled'];

  // English text for the page is read from admin.html; the rest of the English text is here.
  var EN = {
    title: document.title, langBtn: 'العربية', ariaLang: 'Switch language',
    invalid_code: 'Wrong security code.',
    locked: 'Too many wrong attempts. Please wait 15 minutes and try again.',
    too_short: 'The new code must be at least 10 characters.',
    bad_status: 'That status is not allowed.',
    generic: 'Something went wrong. Please try again.',
    noConn: 'Could not connect. Check your internet and try again.',
    noSave: 'Could not save the change. Try again.',
    mismatch: 'The two codes do not match.',
    changed: 'Security code changed. Use the new code next time.',
    checking: 'Checking...',
    lCustomer: 'Customer', lPhone: 'Phone', lId: 'Saudi ID', lLocation: 'Location', lEvent: 'Event', lMenu: 'Menu',
    guests: 'guests', hijriChosen: ' (customer chose Hijri)', received: 'Received ', siteLang: ' · site language: ',
    langAr: 'Arabic', langEn: 'English', show: 'Show', hide: 'Hide', statusOf: 'Status of ',
    empty: 'No bookings match.',
    waBtn: 'Message customer on WhatsApp', waDone: 'Booking confirmed. Send the customer a WhatsApp message?', waOpen: 'Open WhatsApp', waDoneCancel: 'Booking cancelled. Send the customer a WhatsApp message?',
    agBtn: 'Agreement', agBlocked: 'Pop-up blocked. Allow pop-ups for this page and try again.',
    bad_amounts: 'The deposit cannot be more than the total amount.', not_found: 'Booking not found.',
    lAmounts: 'Amounts', sar: 'SAR', pTotal: 'Total', pDeposit: 'Deposit', pRemaining: 'Remaining', pSecurity: 'Security',
    totalsRow: 'Total',
    type_Wedding: 'Wedding', type_Birthday: 'Birthday party', type_Family: 'Family gathering',
    type_Iftar: 'Ramadan iftar', type_Corporate: 'Company event', type_Other: 'Other',
    menu_Rice: 'Kabsa and mandi', menu_Grill: 'Grills and madhbi', menu_Both: 'Kabsa, mandi and grills',
    csvHead: ['Booking number', 'Status', 'Event date', 'Hijri date', 'Time', 'Customer', 'Phone', 'Saudi ID', 'City',
      'District', 'Address', 'Postal code', 'Event type', 'Guests', 'Menu', 'Notes', 'Received', 'Total (SAR)', 'Deposit (SAR)', 'Remaining (SAR)', 'Security deposit (SAR)']
  };
  var AR = {
    title: 'لوحة الحجوزات – مطاعم قلعة الشهباء', langBtn: 'English', ariaLang: 'تغيير اللغة',
    adminName: 'إدارة الحجوزات', lock: 'قفل',
    loginTitle: 'أدخل رمز الأمان', loginSub: 'تعرض هذه الصفحة حجوزات العملاء وهي للموظفين فقط.',
    codeLabel: 'رمز الأمان', unlock: 'فتح',
    sTotal: 'كل الحجوزات', sNew: 'جديد', sConfirmed: 'مؤكد', sWeek: 'خلال 7 أيام',
    searchPh: 'ابحث بالاسم أو الجوال أو رقم الحجز أو المدينة',
    allStatuses: 'كل الحالات', st_new: 'جديد', st_confirmed: 'مؤكد', st_completed: 'مكتمل', st_cancelled: 'ملغي',
    upcoming: 'المناسبات القادمة', allDates: 'كل التواريخ', past: 'المناسبات السابقة',
    refresh: 'تحديث', csv: 'تنزيل CSV',
    changeTitle: 'تغيير رمز الأمان', newCodeL: 'رمز الأمان الجديد (10 أحرف على الأقل)',
    newCode2L: 'أعد كتابة الرمز الجديد', saveCode: 'حفظ الرمز الجديد',
    invalid_code: 'رمز الأمان غير صحيح.',
    locked: 'محاولات خاطئة كثيرة. انتظر 15 دقيقة ثم حاول مرة أخرى.',
    too_short: 'يجب أن يكون الرمز الجديد 10 أحرف على الأقل.',
    bad_status: 'هذه الحالة غير مسموحة.',
    generic: 'حدث خطأ. حاول مرة أخرى.',
    noConn: 'تعذر الاتصال. تحقق من الإنترنت وحاول مرة أخرى.',
    noSave: 'تعذر حفظ التغيير. حاول مرة أخرى.',
    mismatch: 'الرمزان غير متطابقين.',
    changed: 'تم تغيير رمز الأمان. استخدم الرمز الجديد في المرة القادمة.',
    checking: 'جارٍ التحقق...',
    lCustomer: 'العميل', lPhone: 'الجوال', lId: 'الهوية', lLocation: 'الموقع', lEvent: 'المناسبة', lMenu: 'القائمة',
    guests: 'ضيف', hijriChosen: ' (اختار العميل التقويم الهجري)', received: 'وصل الطلب: ', siteLang: ' · لغة الموقع: ',
    langAr: 'العربية', langEn: 'الإنجليزية', show: 'إظهار', hide: 'إخفاء', statusOf: 'حالة الحجز ',
    empty: 'لا توجد حجوزات مطابقة.',
    waBtn: 'مراسلة العميل عبر واتساب', waDone: 'تم تأكيد الحجز. هل تريد إرسال رسالة واتساب للعميل؟', waOpen: 'فتح واتساب', waDoneCancel: 'تم إلغاء الحجز. هل تريد إرسال رسالة واتساب للعميل؟',
    agTitle: 'المبالغ والعقد', agSub: 'أدخل المبالغ. يتم حفظها لقسم الحسابات. اترك الحقل فارغاً إذا أردت كتابته بخط اليد في العقد.',
    agTotal: 'إجمالي المبلغ (ريال)', agDeposit: 'العربون المدفوع (ريال)', agInsurance: 'مبلغ التأمين (ريال)',
    agRemaining: 'المتبقي', agCreate: 'إنشاء العقد', agSave: 'حفظ فقط', agSkip: 'إغلاق', agBtn: 'العقد',
    tabBookings: 'الحجوزات', tabAccounts: 'الحسابات',
    acTotalL: 'إجمالي العقود (ريال)', acPaidL: 'العربون المستلم (ريال)', acRemainL: 'المتبقي للتحصيل (ريال)', acSecL: 'التأمين المحجوز (ريال)',
    thRef: 'رقم الحجز', thCustomer: 'العميل', thDate: 'تاريخ المناسبة', thStatus: 'الحالة', thTotal: 'الإجمالي (ريال)',
    thDeposit: 'العربون (ريال)', thRemaining: 'المتبقي (ريال)', thSecurity: 'التأمين (ريال)', thEdit: 'تعديل',
    bad_amounts: 'العربون لا يمكن أن يكون أكبر من إجمالي المبلغ.', not_found: 'الحجز غير موجود.',
    lAmounts: 'المبالغ', sar: 'ريال', pTotal: 'الإجمالي', pDeposit: 'العربون', pRemaining: 'المتبقي', pSecurity: 'التأمين',
    totalsRow: 'المجموع',
    agBlocked: 'تم حظر النافذة المنبثقة. اسمح بالنوافذ المنبثقة لهذه الصفحة ثم حاول مرة أخرى.',
    type_Wedding: 'زواج', type_Birthday: 'عيد ميلاد', type_Family: 'لقاء عائلي',
    type_Iftar: 'إفطار رمضان', type_Corporate: 'فعالية شركة', type_Other: 'أخرى',
    menu_Rice: 'كبسة ومندي', menu_Grill: 'مشويات ومضبي', menu_Both: 'كبسة ومندي ومشويات',
    csvHead: ['رقم الحجز', 'الحالة', 'تاريخ المناسبة', 'التاريخ الهجري', 'الوقت', 'العميل', 'الجوال', 'الهوية', 'المدينة',
      'الحي', 'العنوان', 'الرمز البريدي', 'نوع المناسبة', 'الضيوف', 'القائمة', 'الملاحظات', 'تاريخ الاستلام', 'الإجمالي (ريال)', 'العربون (ريال)', 'المتبقي (ريال)', 'التأمين (ريال)']
  };

  function $(id) { return document.getElementById(id); }
  function t(k) { return (lang === 'ar' ? AR : EN)[k]; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;   // textContent only: customer text is never treated as HTML
    return e;
  }
  function show(node, on) { node.hidden = !on; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function appVisible() { return !$('app').hidden; }

  // ---------- language ----------
  var textNodes = document.querySelectorAll('[data-i18n]');
  var phNodes = document.querySelectorAll('[data-i18n-ph]');
  textNodes.forEach(function (n) { EN[n.dataset.i18n] = EN[n.dataset.i18n] || n.textContent; });
  phNodes.forEach(function (n) { EN[n.dataset.i18nPh] = n.getAttribute('placeholder'); });

  function setLang(l) {
    lang = l;
    var h = document.documentElement;
    h.lang = l; h.dir = l === 'ar' ? 'rtl' : 'ltr';
    textNodes.forEach(function (n) { n.textContent = t(n.dataset.i18n); });
    phNodes.forEach(function (n) { n.setAttribute('placeholder', t(n.dataset.i18nPh)); });
    document.title = t('title');
    $('lang').textContent = t('langBtn'); $('lang').setAttribute('aria-label', t('ariaLang'));
    show($('loginErr'), false); show($('changeMsg'), false); show($('appErr'), false); show($('notice'), false);
    if (appVisible()) render();
    try { localStorage.setItem('adminLang', l); } catch (e) {}
  }
  $('lang').addEventListener('click', function () { setLang(lang === 'ar' ? 'en' : 'ar'); });

  function locale(cal) { return (lang === 'ar' ? 'ar-SA' : 'en-GB') + (cal ? '-u-ca-' + cal + '-nu-latn' : '-u-nu-latn'); }

  // ---------- server calls ----------
  function rpc(name, args) {
    return fetch(cfg.url + '/rest/v1/rpc/' + name, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: cfg.key },
      body: JSON.stringify(args)
    }).then(function (r) {
      return r.json().then(function (j) { if (!r.ok) throw new Error('http ' + r.status); return j; });
    });
  }
  function errText(res) { return t(res && res.error) || t('generic'); }

  // ---------- lock / unlock ----------
  function remember(c) { try { sessionStorage.setItem('adm', c); } catch (e) {} }
  function forget() { try { sessionStorage.removeItem('adm'); } catch (e) {} }
  function bumpIdle() { clearTimeout(idleTimer); if (code) idleTimer = setTimeout(lock, IDLE_MS); }
  function lock() {
    code = null; rows = []; forget(); clearTimeout(idleTimer);
    $('list').innerHTML = ''; $('code').value = '';
    if ($('agDialog').open) $('agDialog').close();
    show($('app'), false); show($('logout'), false); show($('notice'), false); show($('login'), true);
    $('code').focus();
  }
  function load(c, fromLogin) {
    return rpc('catering_admin_list', { p_code: c }).then(function (res) {
      if (!res.ok) {
        code = null; forget();
        if (fromLogin) { $('loginErr').textContent = errText(res); show($('loginErr'), true); }
        return;
      }
      code = c; remember(c); rows = res.data || [];
      show($('login'), false); show($('app'), true); show($('logout'), true);
      show($('appErr'), false); render(); bumpIdle();
    }).catch(function () {
      var box = fromLogin ? $('loginErr') : $('appErr');
      box.textContent = t('noConn'); show(box, true);
    });
  }

  $('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    show($('loginErr'), false);
    var b = $('loginBtn'); b.disabled = true; b.textContent = t('checking');
    load($('code').value.trim(), true).then(function () { b.disabled = false; b.textContent = t('unlock'); $('code').value = ''; });
  });
  $('logout').addEventListener('click', lock);
  $('refresh').addEventListener('click', function () { if (code) load(code, false); });
  ['click', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, bumpIdle, { passive: true }); });

  // ---------- formatting ----------
  function gDate(s) { return new Date(s + 'T12:00:00'); }
  function fmtG(s) { return gDate(s).toLocaleDateString(locale('gregory'), { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); }
  function fmtH(s) { return new Intl.DateTimeFormat(locale('islamic-umalqura'), { day: 'numeric', month: 'long', year: 'numeric' }).format(gDate(s)); }
  function fmtT(tm) { return new Date('2000-01-01T' + tm).toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' }); }
  function maskId(id) { return id.charAt(0) + '••••••' + id.slice(-3); }

  // ---------- list ----------
  function filtered() {
    var q = $('q').value.trim().toLowerCase(), st = $('fStatus').value, wh = $('fWhen').value, today = todayStr();
    var out = rows.filter(function (r) {
      if (st && r.status !== st) return false;
      if (wh === 'upcoming' && r.event_date < today) return false;
      if (wh === 'past' && r.event_date >= today) return false;
      if (q) {
        var hay = [r.full_name, r.phone, r.reference, r.city, r.district].join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    var asc = wh === 'upcoming';
    out.sort(function (a, b) {
      var ka = a.event_date + a.event_time, kb = b.event_date + b.event_time;
      return asc ? (ka < kb ? -1 : 1) : (ka < kb ? 1 : -1);
    });
    return out;
  }

  // ---------- WhatsApp confirmation message (written in the customer's own language) ----------
  function toIntl(phone) {
    var d = String(phone).replace(/\D/g, '');
    if (d.indexOf('00966') === 0) return d.slice(2);
    if (d.indexOf('966') === 0) return d;
    if (d.charAt(0) === '0') return '966' + d.slice(1);
    return '966' + d;
  }
  function waMessage(r) {
    var ar = r.language === 'ar', loc = ar ? 'ar-SA' : 'en-GB', dt = gDate(r.event_date);
    var opt = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    var g = new Intl.DateTimeFormat(loc + '-u-ca-gregory-nu-latn', opt).format(dt);
    var h = new Intl.DateTimeFormat(loc + '-u-ca-islamic-umalqura-nu-latn', opt).format(dt);
    var tm = new Date('2000-01-01T' + r.event_time).toLocaleTimeString(loc + '-u-nu-latn', { hour: 'numeric', minute: '2-digit' });
    var place = [r.address, r.district, r.city].filter(Boolean).join(ar ? '، ' : ', ');
    if (r.status === 'cancelled') {
      if (ar) {
        return 'مرحباً ' + r.full_name + '،\nنأسف لإبلاغكم بأنه تم إلغاء حجزكم رقم ' + r.reference + ' لدى مطاعم قلعة الشهباء بتاريخ ' + g + ' (' + h + ').' +
          '\nإذا رغبتم بإعادة الحجز أو لديكم أي استفسار، تواصلوا معنا على هذا الرقم.';
      }
      return 'Hello ' + r.full_name + ',\nWe are sorry to let you know that your booking ' + r.reference + ' with Qalat Al-Shahba Restaurants for ' + g + ' (' + h + ') has been cancelled.' +
        '\nIf you would like to rebook or have any question, please message us on this number.';
    }
    if (ar) {
      return 'مرحباً ' + r.full_name + '،\nتم تأكيد حجزك رقم ' + r.reference + ' لدى مطاعم قلعة الشهباء.\n' +
        'التاريخ: ' + g + ' (' + h + ')\nالوقت: ' + tm + '\nالموقع: ' + place + '\nعدد الضيوف: ' + r.guests +
        '\nشكراً لاختياركم لنا. للتعديل أو الاستفسار تواصلوا معنا على هذا الرقم.';
    }
    return 'Hello ' + r.full_name + ',\nYour booking ' + r.reference + ' with Qalat Al-Shahba Restaurants is confirmed.\n' +
      'Date: ' + g + ' (' + h + ')\nTime: ' + tm + '\nLocation: ' + place + '\nGuests: ' + r.guests +
      '\nThank you for choosing us. Message us on this number for any change or question.';
  }
  function isAgStatus(s) { return s === 'confirmed' || s === 'completed'; }
  function isWaStatus(s) { return s === 'confirmed' || s === 'cancelled'; }
  function waLink(r) { return 'https://wa.me/' + toIntl(r.phone) + '?text=' + encodeURIComponent(waMessage(r)); }
  function showNotice(r) {
    $('noticeText').textContent = t(r.status === 'cancelled' ? 'waDoneCancel' : 'waDone');
    var a = $('noticeLink'); a.textContent = t('waOpen'); a.href = waLink(r);
    show($('notice'), true);
  }

  // ---------- Agreement (Arabic "عقد بوفيه خارجي"), filled from the booking ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var BLANK = '..........';
  function money(v) {
    var n = parseFloat(v);
    return isFinite(n) && n >= 0 ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : BLANK;
  }
  var MENU_AR = { Rice: 'كبسة ومندي', Grill: 'مشويات ومضبي', Both: 'كبسة ومندي ومشويات' };

  function agreementHtml(r, amt) {
    var dt = gDate(r.event_date), opt = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    var g = new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-latn', opt).format(dt);
    var h = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', opt).format(dt);
    var tm = new Date('2000-01-01T' + r.event_time).toLocaleTimeString('ar-SA-u-nu-latn', { hour: 'numeric', minute: '2-digit' });
    var now = new Date();
    var todayAr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    var todayEn = new Intl.DateTimeFormat('en-GB-u-ca-gregory-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    var total = parseFloat(amt.total), dep = parseFloat(amt.deposit);
    var remain = isFinite(total) && isFinite(dep) ? Math.max(0, total - dep) : null;
    var place = [r.address, r.district, r.city].filter(Boolean).join('، ');
    var row = function (k, v) { return '<div class="r"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'; };
    var ltr = function (v) { return '<bdi dir="ltr">' + esc(v) + '</bdi>'; };

    return '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>عقد بوفيه خارجي – ' + esc(r.reference) + '</title>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap">' +
      '<style>' +
      '@page{size:A4;margin:14mm}' +
      '*{box-sizing:border-box}body{margin:0;background:#e9ede9;color:#111;font:400 15px/1.9 "Tajawal","Segoe UI",Tahoma,sans-serif}' +
      '.bar{position:sticky;top:0;background:#1E4D39;padding:10px;text-align:center}' +
      '.bar button{font:700 15px "Tajawal",sans-serif;padding:8px 22px;border:0;border-radius:999px;background:#F5BE2E;color:#16261E;cursor:pointer}' +
      '.page{width:210mm;max-width:100%;margin:16px auto;background:#fff;padding:16mm 16mm 12mm;box-shadow:0 2px 12px rgba(0,0,0,.15)}' +
      '.top{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:3px solid #1E4D39;padding-bottom:10px;margin-bottom:14px}' +
      '.top img{height:64px}.top h1{margin:0;font-size:26px;font-weight:800;color:#1E4D39}' +
      '.ref{font-size:13px;color:#555;text-align:left}' +
      '.dates{display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:700;margin-bottom:4px}.dates .en{text-align:left}' +
      'h2{font-size:17px;font-weight:800;margin:14px 0 6px}' +
      '.r{display:flex;gap:8px;padding:3px 0;border-bottom:1px dotted #999}.k{font-weight:700;min-width:8.5em}.v{flex:1}' +
      '.cl{width:100%;border-collapse:collapse;margin-top:4px}.cl td{vertical-align:top;padding:4px 0;text-align:right}.cl .n{width:2.4em;font-weight:700;white-space:nowrap}' +
      '.sig{display:flex;justify-content:space-between;gap:30px;margin-top:36px}.sig div{flex:1}' +
      '.sig .line{border-bottom:1px solid #111;height:48px;margin-top:6px}.sig b{font-weight:800}' +
      '@media print{body{background:#fff}.bar{display:none}.page{box-shadow:none;margin:0;padding:0;width:auto}}' +
      '</style></head><body>' +
      '<div class="bar"><button onclick="window.print()">طباعة / حفظ PDF</button></div>' +
      '<div class="page">' +
      '<div class="top"><img src="logo.png" alt="" onerror="this.remove()"><h1>عقد بوفيه خارجي</h1><div class="ref">رقم الحجز: ' + ltr(r.reference) + '</div></div>' +
      '<div class="dates"><span>التاريخ: ' + esc(todayAr) + '</span><span class="en" dir="ltr">Date: ' + esc(todayEn) + '</span></div>' +
      '<h2>تم الاتفاق بين كل من:</h2>' +
      row('الطرف الأول:', 'مطاعم حلب الشهباء لتقديم الوجبات') +
      row('الطرف الثاني:', esc(r.full_name)) +
      row('رقم الجوال:', ltr(r.phone)) +
      row('رقم السجل المدني:', ltr(r.national_id)) +
      row('تاريخ البوفيه:', esc(h) + ' الموافق ' + esc(g)) +
      '<h2>بيانات الحجز</h2>' +
      row('وقت التقديم:', esc(tm)) +
      row('موقع البوفيه:', '<bdi>' + esc(place) + '</bdi>') +
      row('عدد الأشخاص:', esc(r.guests)) +
      row('نوع القائمة:', esc(MENU_AR[r.menu] || r.menu)) +
      '<h2>وقد تم الاتفاق على ما يلي:</h2><table class="cl">' +
      '<tr><td class="n">1.</td><td>وذلك على أن يقوم الطرف الأول بتجهيز بوفيه مفتوح خارجي في المكان الذي يرغب به الطرف الثاني، حسب الاتفاق.</td></tr>' +
      '<tr><td class="n">2.</td><td>يتم تجهيز البوفيه بعدد الأشخاص المتفق عليه، مع تحديد الأصناف حسب الاتفاق.</td></tr>' +
      '<tr><td class="n">3.</td><td>إجمالي المبلغ المتفق عليه لإعداد البوفيه هو <b>' + money(amt.total) + '</b> ريال، دُفع منه مبلغ <b>' + money(amt.deposit) + '</b> ريال عربون، والمتبقي منه <b>' + (remain == null ? BLANK : money(remain)) + '</b> ريال.</td></tr>' +
      '<tr><td class="n">4.</td><td>يتم دفع مبلغ تأمين <b>' + money(amt.insurance) + '</b> ريال، ويُسترد بعد إقامة البوفيه في حال سلامة جميع معدات البوفيه.</td></tr>' +
      '<tr><td class="n">5.</td><td>يتم سداد كامل المبلغ قبل موعد البوفيه بخمسة أيام، وفي حال لم يتم ذلك يعتبر العقد لاغياً.</td></tr>' +
      '<tr><td class="n">6.</td><td>العربون لا يُسترد في حالة الإلغاء قبل موعد البوفيه بأقل من 15 يومًا، وفي حال تم الإلغاء قبل 15 يومًا من موعد البوفيه يتم خصم 50% من قيمة العربون.</td></tr>' +
      '<tr><td class="n">7.</td><td>البوفيه خدمة ذاتية، ويتم تسليمها للطرف الثاني عند انتهاء التجهيز. وفي حال رغبة العميل في طلب عمال لخدمة البوفيه، يتحمل رسومًا إضافية.</td></tr>' +
      '<tr><td class="n">8.</td><td>يتم اختيار قائمة الأصناف من المنيو اليومي حسب تحديد الشيف.</td></tr>' +
      '<tr><td class="n">9.</td><td>يتم احتساب رسوم إضافية في حال رغبة العميل في شراء وطبخ طليان، غير رسوم البوفيه.</td></tr>' +
      '</table>' +
      '<div class="sig"><div><b>الطرف الأول:</b><div class="line"></div></div><div><b>الطرف الثاني:</b> ' + esc(r.full_name) + '<div class="line"></div></div></div>' +
      '</div></body></html>';
  }

  function numOrNull(v) { v = String(v).trim(); if (v === '') return null; var n = parseFloat(v); return isFinite(n) ? n : null; }
  function fmtMoney(v) { return v == null ? '—' : Number(v).toLocaleString('en-US', { maximumFractionDigits: 2 }); }
  function amtFromRow(r) { return { total: r.total_amount, deposit: r.deposit_paid, insurance: r.security_deposit }; }

  // Saves the amounts in Supabase so the Accounts team can see them.
  function saveAmounts(r, tot, dep, sec) {
    return rpc('catering_admin_set_amounts', { p_code: code, p_id: r.id, p_total: tot, p_deposit: dep, p_security: sec }).then(function (res) {
      if (res.ok) {
        r.total_amount = tot; r.deposit_paid = dep; r.security_deposit = sec;
        r.remaining_amount = tot != null && dep != null ? Math.max(0, tot - dep) : null;
        r.amounts_updated_at = new Date().toISOString();
      }
      return res;
    });
  }

  var agR = null;
  function readAmounts() { return { tot: numOrNull($('agTotal').value), dep: numOrNull($('agDeposit').value), sec: numOrNull($('agInsurance').value) }; }
  function updRemain() {
    var a = readAmounts();
    $('agRemain').textContent = a.tot != null && a.dep != null ? fmtMoney(Math.max(0, a.tot - a.dep)) : '—';
  }
  function openAgDialog(r) {
    agR = r; $('agForm').reset();
    $('agTotal').value = r.total_amount != null ? r.total_amount : '';
    $('agDeposit').value = r.deposit_paid != null ? r.deposit_paid : '';
    $('agInsurance').value = r.security_deposit != null ? r.security_deposit : '';
    updRemain(); show($('agErr'), false);
    if (!$('agDialog').open) $('agDialog').showModal();
  }
  function agError(msg) { $('agErr').textContent = msg; show($('agErr'), true); }
  function agBusy(on) { ['agCreateBtn', 'agSave', 'agSkip'].forEach(function (id) { $(id).disabled = on; }); }

  // createDoc = true: save, then open the agreement. false: save only.
  function agRun(createDoc) {
    var a = readAmounts(); show($('agErr'), false);
    if (a.tot != null && a.dep != null && a.dep > a.tot) { agError(t('bad_amounts')); return; }
    var w = null;
    if (createDoc) {                               // must open inside the click so the browser allows it
      w = window.open('', '_blank');               // about:blank inherits this page's address, so logo.png loads
      if (!w) { agError(t('agBlocked')); return; }
    }
    agBusy(true);
    saveAmounts(agR, a.tot, a.dep, a.sec).then(function (res) {
      if (!res.ok) {
        if (w) w.close();
        agError(errText(res));
        if (res.error === 'invalid_code' || res.error === 'locked') lock();
        return;
      }
      if (w) { w.document.open(); w.document.write(agreementHtml(agR, amtFromRow(agR))); w.document.close(); }
      $('agDialog').close(); render();
    }).catch(function () { if (w) w.close(); agError(t('noSave')); })
      .then(function () { agBusy(false); });
  }
  $('agTotal').addEventListener('input', updRemain);
  $('agDeposit').addEventListener('input', updRemain);
  $('agSkip').addEventListener('click', function () { $('agDialog').close(); });
  $('agSave').addEventListener('click', function () { agRun(false); });
  $('agForm').addEventListener('submit', function (e) { e.preventDefault(); agRun(true); });

  function card(r) {
    var b = el('article', 'b'); b.dataset.status = r.status;

    var head = el('div', 'b-head');
    var ref = el('span', 'ref', r.reference); ref.dir = 'ltr';
    head.appendChild(ref);
    var wa, ag, actions, sel = el('select'); sel.setAttribute('aria-label', t('statusOf') + r.reference);
    STATUSES.forEach(function (s) {
      var o = el('option', null, t('st_' + s)); o.value = s; if (s === r.status) o.selected = true; sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      var prev = r.status, next = sel.value; sel.disabled = true;
      rpc('catering_admin_set_status', { p_code: code, p_id: r.id, p_status: next }).then(function (res) {
        if (!res.ok) {
          sel.value = prev; $('appErr').textContent = errText(res); show($('appErr'), true);
          if (res.error === 'invalid_code' || res.error === 'locked') lock();
          return;
        }
        r.status = next; b.dataset.status = next; show($('appErr'), false); stats();
        wa.hidden = !isWaStatus(next); wa.href = waLink(r); ag.hidden = !isAgStatus(next);
        actions.hidden = wa.hidden && ag.hidden;
        if (next === 'completed') openAgDialog(r);
        if (isWaStatus(next)) showNotice(r); else show($('notice'), false);
      }).catch(function () { sel.value = prev; $('appErr').textContent = t('noSave'); show($('appErr'), true); })
        .then(function () { sel.disabled = false; });
    });
    head.appendChild(sel); b.appendChild(head);

    var when = el('div', 'when', fmtG(r.event_date) + ' · ' + fmtT(r.event_time));
    when.appendChild(el('small', null, fmtH(r.event_date) + (r.calendar_type === 'hijri' ? t('hijriChosen') : '')));
    b.appendChild(when);

    var dl = el('dl');
    function row(k, v) {
      dl.appendChild(el('dt', null, k));
      var dd = el('dd'); if (typeof v === 'string') dd.textContent = v; else dd.appendChild(v);
      dl.appendChild(dd); return dd;
    }
    row(t('lCustomer'), r.full_name);
    var tel = el('a', null, r.phone); tel.href = 'tel:' + r.phone.replace(/[^+0-9]/g, ''); tel.dir = 'ltr';
    row(t('lPhone'), tel);
    var idDd = row(t('lId'), '');
    var idVal = el('bdi', null, maskId(r.national_id)); idVal.dir = 'ltr';
    var tg = el('button', 'mini', t('show')); tg.type = 'button';
    tg.addEventListener('click', function () {
      var on = tg.dataset.on === '1';
      idVal.textContent = on ? maskId(r.national_id) : r.national_id;
      tg.dataset.on = on ? '0' : '1'; tg.textContent = on ? t('show') : t('hide');
    });
    idDd.appendChild(idVal); idDd.appendChild(tg);
    var place = [r.address, r.district, r.city, r.postal_code].filter(Boolean).join(lang === 'ar' ? '، ' : ', ');
    var map = el('a', null, place);
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([r.address, r.district, r.city, 'Saudi Arabia'].join(' '));
    map.target = '_blank'; map.rel = 'noopener noreferrer';
    row(t('lLocation'), map);
    row(t('lEvent'), (t('type_' + r.event_type) || r.event_type) + ' · ' + r.guests + ' ' + t('guests'));
    row(t('lMenu'), t('menu_' + r.menu) || r.menu);
    var parts = [];
    if (r.total_amount != null) parts.push(t('pTotal') + ' ' + fmtMoney(r.total_amount));
    if (r.deposit_paid != null) parts.push(t('pDeposit') + ' ' + fmtMoney(r.deposit_paid));
    if (r.remaining_amount != null) parts.push(t('pRemaining') + ' ' + fmtMoney(r.remaining_amount));
    if (r.security_deposit != null) parts.push(t('pSecurity') + ' ' + fmtMoney(r.security_deposit));
    if (parts.length) row(t('lAmounts'), parts.join(' · ') + ' ' + t('sar'));
    b.appendChild(dl);

    actions = el('div', 'actions');
    wa = el('a', 'wa', t('waBtn'));
    wa.href = waLink(r); wa.target = '_blank'; wa.rel = 'noopener noreferrer';
    wa.hidden = !isWaStatus(r.status);
    actions.appendChild(wa);

    ag = el('button', 'wa ag', t('agBtn')); ag.type = 'button';
    ag.hidden = !isAgStatus(r.status);
    ag.addEventListener('click', function () { openAgDialog(r); });
    actions.appendChild(ag);
    actions.hidden = wa.hidden && ag.hidden;
    b.appendChild(actions);

    if (r.notes) b.appendChild(el('div', 'note', r.notes));
    b.appendChild(el('div', 'meta', t('received') +
      new Date(r.created_at).toLocaleString(locale('gregory'), { dateStyle: 'medium', timeStyle: 'short' }) +
      t('siteLang') + (r.language === 'ar' ? t('langAr') : t('langEn'))));
    return b;
  }

  function stats() {
    var today = todayStr(), wk = new Date(); wk.setDate(wk.getDate() + 7);
    var w = wk.getFullYear() + '-' + pad(wk.getMonth() + 1) + '-' + pad(wk.getDate());
    $('sTotal').textContent = rows.length;
    $('sNew').textContent = rows.filter(function (r) { return r.status === 'new'; }).length;
    $('sConfirmed').textContent = rows.filter(function (r) { return r.status === 'confirmed'; }).length;
    $('sWeek').textContent = rows.filter(function (r) { return r.status !== 'cancelled' && r.event_date >= today && r.event_date <= w; }).length;
  }

  var view = 'bookings';
  function setView(v) {
    view = v;
    $('tabB').classList.toggle('on', v === 'bookings'); $('tabB').setAttribute('aria-selected', v === 'bookings');
    $('tabA').classList.toggle('on', v === 'accounts'); $('tabA').setAttribute('aria-selected', v === 'accounts');
    render();
  }
  $('tabB').addEventListener('click', function () { setView('bookings'); });
  $('tabA').addEventListener('click', function () { setView('accounts'); });

  function renderAccounts(data) {
    var body = $('acBody'), foot = $('acFoot'), sum = { t: 0, d: 0, r: 0, s: 0 };
    body.innerHTML = ''; foot.innerHTML = '';
    function td(text, cls) { var c = el('td', cls || null, text); return c; }
    data.forEach(function (r) {
      var tr = el('tr');
      var ref = td(r.reference); ref.dir = 'ltr'; ref.style.textAlign = 'start'; tr.appendChild(ref);
      tr.appendChild(td(r.full_name));
      tr.appendChild(td(fmtG(r.event_date)));
      var st = el('td'); var badge = el('span', 'st', t('st_' + r.status)); badge.dataset.status = r.status; st.appendChild(badge); tr.appendChild(st);
      [r.total_amount, r.deposit_paid, r.remaining_amount, r.security_deposit].forEach(function (v) { tr.appendChild(td(fmtMoney(v), 'num')); });
      sum.t += +r.total_amount || 0; sum.d += +r.deposit_paid || 0; sum.r += +r.remaining_amount || 0; sum.s += +r.security_deposit || 0;
      var ed = el('td'); var bt = el('button', 'mini', t('thEdit')); bt.type = 'button';
      bt.addEventListener('click', function () { openAgDialog(r); });
      ed.appendChild(bt); tr.appendChild(ed);
      body.appendChild(tr);
    });
    if (!data.length) {
      var er = el('tr'), ec = el('td', null, t('empty')); ec.colSpan = 9; ec.style.textAlign = 'center'; er.appendChild(ec); body.appendChild(er);
    } else {
      var fr = el('tr'), lab = el('td', null, t('totalsRow')); lab.colSpan = 4; fr.appendChild(lab);
      [sum.t, sum.d, sum.r, sum.s].forEach(function (v) { fr.appendChild(el('td', 'num', fmtMoney(v))); });
      fr.appendChild(el('td')); foot.appendChild(fr);
    }
    $('acTotal').textContent = fmtMoney(sum.t); $('acPaid').textContent = fmtMoney(sum.d);
    $('acRemain').textContent = fmtMoney(sum.r); $('acSec').textContent = fmtMoney(sum.s);
  }

  function render() {
    var list = $('list'), data = filtered(), acc = view === 'accounts';
    stats();
    show($('bkStats'), !acc); show($('acStats'), acc); show(list, !acc); show($('acWrap'), acc);
    $('count').textContent = lang === 'ar'
      ? 'الحجوزات المعروضة: ' + data.length
      : data.length + (data.length === 1 ? ' booking shown' : ' bookings shown');
    if (acc) { renderAccounts(data); return; }
    list.innerHTML = '';
    if (!data.length) { list.appendChild(el('p', 'empty', t('empty'))); return; }
    data.forEach(function (r) { list.appendChild(card(r)); });
  }
  ['input', 'change'].forEach(function (ev) { ['q', 'fStatus', 'fWhen'].forEach(function (id) { $(id).addEventListener(ev, render); }); });

  // ---------- CSV ----------
  function cell(v) {
    v = v == null ? '' : String(v);
    if (/^[=+\-@\t\r]/.test(v)) v = "'" + v;           // stop spreadsheet formulas typed by customers
    return '"' + v.replace(/"/g, '""') + '"';
  }
  $('csv').addEventListener('click', function () {
    var keys = ['reference', 'status', 'event_date', 'hijri_date', 'event_time', 'full_name', 'phone', 'national_id', 'city',
      'district', 'address', 'postal_code', 'event_type', 'guests', 'menu', 'notes', 'created_at', 'total_amount', 'deposit_paid', 'remaining_amount', 'security_deposit'];
    var lines = [t('csvHead').map(cell).join(',')];
    filtered().forEach(function (r) {
      lines.push(keys.map(function (k) {
        var v = r[k];
        if (k === 'status') v = t('st_' + v);
        if (k === 'event_type') v = t('type_' + v) || v;
        if (k === 'menu') v = t('menu_' + v) || v;
        return cell(v);
      }).join(','));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'bookings-' + todayStr() + '.csv';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  // ---------- change code ----------
  $('changeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var m = $('changeMsg'), n1 = $('newCode').value, n2 = $('newCode2').value;
    m.className = 'err'; show(m, true);
    if (n1 !== n2) { m.textContent = t('mismatch'); return; }
    rpc('catering_admin_change_code', { p_code: code, p_new: n1 }).then(function (res) {
      if (!res.ok) { m.textContent = errText(res); return; }
      code = n1; remember(n1);
      m.className = 'err ok'; m.textContent = t('changed');
      $('newCode').value = ''; $('newCode2').value = '';
    }).catch(function () { m.textContent = t('noConn'); });
  });

  // ---------- start ----------
  var savedLang = null;
  try { savedLang = localStorage.getItem('adminLang'); } catch (e) {}
  setLang(savedLang || ((navigator.language || '').slice(0, 2) === 'ar' ? 'ar' : 'en'));
  var saved = null;
  try { saved = sessionStorage.getItem('adm'); } catch (e) {}
  if (saved) load(saved, false).then(function () { if (!code) $('code').focus(); }); else $('code').focus();
})();
