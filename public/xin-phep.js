// ===== CONFIG =====
const API = 'https://phan-d-default-rtdb.asia-southeast1.firebasedatabase.app/don_xin_phep';

// ===== UPDATE CLOCK =====
function updateClock() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('vi-VN');
  const db = document.getElementById('dateBadge');
  if (db) db.textContent = new Date().toLocaleDateString('vi-VN', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
}
updateClock();
setInterval(updateClock, 1000);

// Auto math phép còn lại
const nh = document.getElementById('np_huong');
const nd = document.getElementById('np_dung');
const nc = document.getElementById('np_con');
if(nh && nd && nc) {
  const calc = () => {
    let c = (parseFloat(nh.value)||0) - (parseFloat(nd.value)||0);
    nc.textContent = c < 0 ? 0 : c;
  };
  nh.addEventListener('input', calc);
  nd.addEventListener('input', calc);
}

// Auto-điền Đến ngày
const nt = document.getElementById('n_tu');
const ndn = document.getElementById('n_den');
if (nt && ndn) {
  nt.addEventListener('change', () => {
    if (!ndn.value || ndn.value < nt.value) {
      ndn.value = nt.value;
    }
  });
}

// ===== BUILD HTML IN THEO SỞ NỘI VỤ =====
const DON_CSS = `
  @page{size:A4;margin:0}
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Times New Roman',Times,serif}
  body{font-size:13pt;line-height:1.35;color:#000;background:#e0e0e0;display:flex;justify-content:center;padding:16px}
  .page{background:#fff;width:210mm;min-height:297mm;padding:18mm 15mm 15mm 30mm;box-shadow:0 5px 15px rgba(0,0,0,0.2);box-sizing:border-box}
  @media print{body{background:#fff;padding:0;display:block;margin:0}.page{width:100%;min-height:0;padding:18mm 15mm 15mm 30mm!important;margin:0;box-shadow:none}}
  table.hdr{width:100%;border-collapse:collapse;margin-bottom:4px}
  table.hdr td{text-align:center;vertical-align:top;font-size:11pt;line-height:1.3}
  .hdr-ul{font-weight:bold;text-decoration:underline}
  .hdr-bold{font-weight:bold}
  .hdate{text-align:right;font-style:italic;font-size:13pt;margin:4px 0 2px}
  .ttl{text-align:center;font-size:14pt;font-weight:bold;margin:6px 0 4px}
  .body-p{font-size:13pt;line-height:1.4;margin-bottom:1px;text-align:justify}
  .body-p.ind{text-indent:10mm}
  .kg{margin:2px 0 2px 10mm;font-size:13pt;line-height:1.4}
  .sig-wrap{width:100%;border-collapse:collapse;margin-top:12px}
  .sig-wrap td{text-align:center;vertical-align:top;font-size:13pt;font-weight:bold;padding-top:70px;padding-bottom:0}
  .sig-name{font-weight:normal;font-size:13pt;display:block;margin-top:0}
  .sig-gd{width:100%;border-collapse:collapse;margin-top:8px}
  .sig-gd td{text-align:center;font-size:13pt;font-weight:bold;padding-top:70px}
  .sig-gd-name{font-weight:normal;font-size:13pt;display:block}
`;

function buildDonHTML(d) {
  return `
    <table class="hdr">
      <tr>
        <td style="width:47%">
          <span class="hdr-bold">TRUNG TÂM QUẢN LÝ ĐIỀU HÀNH GIAO THÔNG ĐÔ THỊ</span><br>
          <span class="hdr-bold hdr-ul">ĐỘI VẬN HÀNH, BẢO TRÌ ĐƯỜNG HẦM</span>
        </td>
        <td style="width:53%">
          <span class="hdr-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span><br>
          <span class="hdr-bold hdr-ul">Độc lập – Tự do – Hạnh phúc</span>
        </td>
      </tr>
    </table>
    <div class="hdate">Thành phố Hồ Chí Minh, ngày ${d.ng} tháng ${d.th} năm ${d.na}.</div>
    <div class="ttl">ĐƠN XIN NGHỈ PHÉP</div>
    <div class="kg">Kính gửi:</div>
    <div class="kg">&nbsp;&nbsp;&nbsp;- Giám đốc Trung tâm.</div>
    <div class="kg">&nbsp;&nbsp;&nbsp;- Trưởng Phòng Tổ chức hành chính.</div>
    <div class="kg">&nbsp;&nbsp;&nbsp;- Đội trưởng Đội Vận hành, bảo trì đường hầm.</div>
    <p class="body-p">Tôi tên là: ${d.nx}.</p>
    <p class="body-p">Chức vụ: ${d.cv}.</p>
    <p class="body-p">Bộ phận công tác: Đội Vận hành, bảo trì đường hầm.</p>
    <p class="body-p">Thời gian làm việc tại Trung tâm: ${d.tglv}.</p>
    <p class="body-p">Số ngày phép được hưởng trong năm ${d.na}: ${d.nphuong} ngày.</p>
    <p class="body-p">Số ngày phép đã sử dụng: ${d.npdung} ngày.</p>
    <p class="body-p">Số ngày xin nghỉ phép: ${d.sn} ngày.</p>
    <p class="body-p ind">Kính đề nghị: Giám đốc Trung tâm, trưởng Phòng Tổ chức hành chính, Đội trưởng Đội Vận hành, bảo trì đường hầm xem xét giải quyết cho tôi được nghỉ phép: ${d.sn} ngày, ${d.dg}.</p>
    <p class="body-p">Lý do nghỉ phép: ${d.ld}.</p>
    <p class="body-p">Nơi nghỉ phép: ${d.nn}.</p>
    <p class="body-p">Kính mong được sự chấp thuận.</p>
    <table class="sig-wrap">
      <tr>
        <td style="width:33%;text-align:center;font-weight:bold;vertical-align:top">TRƯỞNG PHÒNG TCHC<br><br><br><br><br>Trịnh Thị Kim Châu</td>
        <td style="width:34%;text-align:center;font-weight:bold;vertical-align:top">ĐỘI TRƯỞNG<br><br><br><br><br>Nguyễn Văn Trung</td>
        <td style="width:33%;text-align:center;font-weight:bold;vertical-align:top">NGƯỜI LÀM ĐƠN<br><br><br><br><br>${d.nx}</td>
      </tr>
    </table>
    <table class="sig-wrap" style="margin-top:10px">
      <tr>
        <td style="text-align:center;font-weight:bold;vertical-align:top">GIÁM ĐỐC<br><br><br><br><br>Đoàn Văn Tấn</td>
      </tr>
    </table>
  `;
}


// ===== COLLECT ====
function collectFormData() {
  const now = new Date();
  return {
    nx: document.getElementById('nx').value || '............................',
    cv: document.getElementById('cv').value || '............................',
    tglv: document.getElementById('tglv').value,
    nphuong: document.getElementById('np_huong').value || '0',
    npdung: document.getElementById('np_dung').value || '0',
    sn: document.getElementById('sn').value || '0',
    nn: document.getElementById('nn').value || '............................',
    dg: (() => {
      const tu = document.getElementById('n_tu')?.value;
      const den = document.getElementById('n_den')?.value;
      if (tu && den) {
        const ft = tu.split('-').reverse().join('/');
        const fd = den.split('-').reverse().join('/');
        return (tu === den) ? `ngày ${ft}` : `từ ngày ${ft} đến ngày ${fd}`;
      }
      return '...........................................';
    })(),
    ld: document.getElementById('ld').value || '...........................................',
    ng: now.getDate().toString().padStart(2,'0'),
    th: (now.getMonth()+1).toString().padStart(2,'0'),
    na: now.getFullYear()
  };
}

// ===== IN =====
document.getElementById('btnPrint').onclick = () => {
  const d = collectFormData();
  const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Don_Xin_Phep_${d.nx}</title><style>${DON_CSS}</style></head><body><div class="page">${buildDonHTML(d)}</div><script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</script></body></html>`;
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) { alert('Trình duyệt chặn popup!'); return; }
  w.document.write(html);
  w.document.close();
};

document.getElementById('btnPdf').onclick = document.getElementById('btnPrint').onclick;

// ===== LƯU WORD =====
document.getElementById('btnWord').onclick = async () => {
  try {
    const d = collectFormData();
    await expDocxXinPhep(d, 'Don_Xin_Phep_' + (d.nx || 'Moi').replace(/ /g, '_'));
  } catch (err) {
    alert("❌ Lỗi cấu trúc: " + err.message);
  }
};

async function expDocxXinPhep(d, fn) {
  if (typeof JSZip === 'undefined') { alert('JSZip chưa tải!'); return; }
  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function run(t, o) { o = o || {}; return '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>' + (o.bold ? '<w:b/><w:bCs/>' : '') + (o.italic ? '<w:i/><w:iCs/>' : '') + (o.ul ? '<w:u w:val="single"/>' : '') + '<w:sz w:val="' + (o.sz || 28) + '"/><w:szCs w:val="' + (o.sz || 28) + '"/></w:rPr><w:t xml:space="preserve">' + esc(t) + '</w:t></w:r>'; }
  function para(a, o) { o = o || {}; return '<w:p><w:pPr><w:jc w:val="' + (o.jc || 'both') + '"/>' + (o.ind ? '<w:ind w:firstLine="567"/>' : '') + '<w:spacing w:after="0" w:line="360" w:lineRule="auto"/></w:pPr>' + a.map(r => run(r.t, r)).join('') + '</w:p>'; }
  function el() { return '<w:p><w:pPr><w:spacing w:after="0" w:line="180" w:lineRule="exact"/></w:pPr></w:p>'; }
  function cell(c, w) { return '<w:tc><w:tcPr><w:tcW w:w="' + w + '" w:type="dxa"/><w:tcBorders><w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr>' + c + '</w:tc>'; }
  function cp(a) { return para(a, { jc: 'center' }); }

  const W = 3118;

  let body = '<w:tbl><w:tblPr><w:tblW w:w="9354" w:type="dxa"/><w:tblBorders><w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="4677"/><w:gridCol w:w="4677"/></w:tblGrid><w:tr>'
    + cell(cp([{ t: 'TRUNG T\u00c2M QU\u1ea2N L\u00dd \u0110I\u1ec0U H\u00c0NH GIAO TH\u00d4NG \u0110\u00d4 TH\u1eca', bold: true, sz:22 }]) + cp([{ t: '\u0110\u1ed8I V\u1eacN H\u00c0NH, B\u1ea2O TR\u00cc \u0110\u01af\u1edcNG H\u1ea6M', bold: true, ul: true, sz:22 }]), 4677)
    + cell(cp([{ t: 'C\u1ed8NG H\u00d2A X\u00c3 H\u1ed8I CH\u1ee6 NGH\u0128A VI\u1ec6T NAM', bold: true, sz:22 }]) + cp([{ t: '\u0110\u1ed9c l\u1eadp \u2013 T\u1ef1 do \u2013 H\u1ea1nh ph\u00fac', bold: true, ul: true, sz:22 }]), 4677)
    + '</w:tr></w:tbl>'
    + para([{ t: 'Thành phố Hồ Chí Minh, ngày ' + d.ng + ' tháng ' + d.th + ' năm ' + d.na + '.', italic: true }], { jc: 'right' })
    + el() + para([{ t: 'ĐƠN XIN NGHỈ PHÉP', bold: true, sz: 28 }], { jc: 'center' }) + el()
    + para([{ t: 'Kính gửi:' }], {})
    + para([{ t: '- Giám đốc Trung tâm.' }], {})
    + para([{ t: '- Trưởng Phòng Tổ chức hành chính.' }], {})
    + para([{ t: '- Đội trưởng Đội Vận hành, bảo trì đường hầm.' }], {})
    + el()
    + para([{ t: 'Tôi tên là: ' }, { t: d.nx }, { t: '.' }], {})
    + para([{ t: 'Chức vụ: ' }, { t: d.cv }, { t: '.' }], {})
    + para([{ t: 'Bộ phận công tác: Đội Vận hành, bảo trì đường hầm.' }], {})
    + para([{ t: 'Thời gian làm việc tại Trung tâm: ' }, { t: d.tglv }, { t: '.' }], {})
    + para([{ t: 'Số ngày phép được hưởng trong năm ' + d.na + ': ' }, { t: d.nphuong }, { t: ' ngày.' }], {})
    + para([{ t: 'Số ngày phép đã sử dụng: ' }, { t: d.npdung }, { t: ' ngày.' }], {})
    + para([{ t: 'Số ngày xin nghỉ phép: ' }, { t: d.sn }, { t: ' ngày.' }], {})
    + para([{ t: 'Kính đề nghị: Giám đốc Trung tâm, trưởng Phòng Tổ chức hành chính, Đội trưởng Đội Vận hành, bảo trì đường hầm xem xét giải quyết cho tôi được nghỉ phép: ' }, { t: d.sn }, { t: ' ngày, ' }, { t: d.dg }, { t: '.' }], { ind: true })
    + para([{ t: 'Lý do nghỉ phép: ' }, { t: d.ld }, { t: '.' }], {})
    + para([{ t: 'Nơi nghỉ phép: ' }, { t: d.nn }, { t: '.' }], {})
    + para([{ t: 'Kính mong được sự chấp thuận.' }], {})
    + el()
    + '<w:tbl><w:tblPr><w:tblW w:w="9354" w:type="dxa"/><w:tblBorders><w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="3118"/><w:gridCol w:w="3118"/><w:gridCol w:w="3118"/></w:tblGrid>'
    + '<w:tr>' + cell(cp([{ t: 'TR\u01af\u1edeNG PH\u00d2NG TCHC', bold: true }]), W) + cell(cp([{ t: '\u0110\u1ed8I TR\u01af\u1edeNG', bold: true }]), W) + cell(cp([{ t: 'NG\u01af\u1edcI L\u00c0M \u0110\u01a0N', bold: true }]), W) + '</w:tr>'
    + '<w:tr>' + cell(el(), W) + cell(el(), W) + cell(el(), W) + '</w:tr>'
    + '<w:tr>' + cell(el(), W) + cell(el(), W) + cell(el(), W) + '</w:tr>'
    + '<w:tr>' + cell(el(), W) + cell(el(), W) + cell(el(), W) + '</w:tr>'
    + '<w:tr>' + cell(cp([{ t: 'Tr\u1ecbnh Th\u1ecb Kim Ch\u00e2u' }]), W) + cell(cp([{ t: 'Nguy\u1ec5n V\u0103n Trung' }]), W) + cell(cp([{ t: d.nx }]), W) + '</w:tr>'
    + '</w:tbl>'
    + '<w:p><w:pPr><w:spacing w:before="80" w:after="0"/></w:pPr></w:p>'
    + '<w:tbl><w:tblPr><w:tblW w:w="9354" w:type="dxa"/><w:tblBorders><w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/><w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="9354"/></w:tblGrid>'
    + '<w:tr>' + cell(cp([{ t: 'GI\u00c1M \u0110\u1ed0C', bold: true }]), 9354) + '</w:tr>'
    + '<w:tr>' + cell(el(), 9354) + '</w:tr>'
    + '<w:tr>' + cell(el(), 9354) + '</w:tr>'
    + '<w:tr>' + cell(el(), 9354) + '</w:tr>'
    + '<w:tr>' + cell(cp([{ t: '\u0110o\u00e0n V\u0103n T\u1ea5n' }]), 9354) + '</w:tr>'
    + '</w:tbl>'
    + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="851" w:bottom="1134" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>';

  const docX = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + '</w:body></w:document>';
  const ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  const rm = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  const rd = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
  const zip = new JSZip();
  zip.file('[Content_Types].xml', ct); zip.file('_rels/.rels', rm); zip.file('word/document.xml', docX); zip.file('word/_rels/document.xml.rels', rd);
  const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  document.body.appendChild(a); a.style.display = 'none'; a.href = url; a.download = fn + '.docx'; a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 800);
}

// ===== LƯU =====
document.getElementById('frm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const d = collectFormData();
  try {
    const r = await fetch(API + '.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...d, createdAt: new Date().toISOString()})
    });
    if (!r.ok) throw 0;
    this.reset();
    load();
    alert('✅ Đã lưu đơn xin phép thành công!');
  } catch { alert('❌ Lưu thất bại!'); }
});

// ===== LOAD =====
async function load() {
  try {
    const r = await fetch(API + '.json'), dt = await r.json();
    let a = [];
    if (dt && typeof dt === 'object') { for (let k in dt) a.push({ id: k, ...dt[k] }); }
    a.sort((x, y) => new Date(y.createdAt||0) - new Date(x.createdAt||0));
    
    // table
    const tb = document.getElementById('tbody');
    if(!tb) return;
    if (!a.length) { tb.innerHTML = '<tr><td colspan="5" class="empty">Chưa có đơn xin phép nào</td></tr>'; return; }
    tb.innerHTML = '';
    a.forEach(i => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="Ngày tạo">${new Date(i.createdAt).toLocaleDateString('vi-VN')}<br>
          <small style="color:var(--muted)">${new Date(i.createdAt).toLocaleTimeString('vi-VN')}</small></td>
        <td data-label="Người xin phép"><strong>${i.nx}</strong><br><small style="color:var(--muted)">${i.cv}</small></td>
        <td data-label="Số ngày"><strong style="color:var(--gold)">${i.sn} ngày</strong><br><small style="color:var(--muted)">Đã dùng:${i.npdung}</small></td>
        <td data-label="Chi tiết"><div class="ca-box">${i.dg}</div><div class="ca-box">Lý do: ${i.ld}</div></td>
        <td data-label="Thao tác" class="td-act"><button class="bd" onclick="del('${i.id}')">🗑 Xóa</button></td>`;
      tb.appendChild(tr);
    });
  } catch(e) { console.warn(e); }
}
load();

window.del = async (id) => {
  if(!confirm('Xác nhận xóa?')) return;
  try {
    await fetch(API + '/' + id + '.json', { method: 'DELETE' });
    load();
  } catch { alert('Lỗi xóa'); }
};

// AUTO FILL CHỨC VỤ
const roleMap = {};
document.getElementById('nx').addEventListener('change', function() {
  const role = roleMap[this.value];
  if (role) {
    document.getElementById('cv').value = role;
  }
});
