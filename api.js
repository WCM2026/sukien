// ============================================================================
// api.js — hàm gọi API GAS chung cho mọi trang (register/survey/dashboard/admin)
// ============================================================================
// QUAN TRỌNG: đổi API_URL thành đúng URL Web App .../exec sau khi Deploy GAS.
// Nếu deploy lại GAS (tạo deployment mới) và URL đổi, phải sửa lại đúng dòng
// này ở MỌI file html (register.html, survey.html, dashboard.html, admin.html)
// — hoặc đơn giản hơn, sửa 1 lần ở đây rồi copy dòng này sang các file khác.
var API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';

// Gọi 1 action lên GAS. Luôn dùng Content-Type 'text/plain;charset=utf-8'
// (KHÔNG phải 'application/json') — đây là kỹ thuật bắt buộc để trình duyệt
// coi đây là "simple request" và không gửi preflight OPTIONS trước, vì Apps
// Script Web App không xử lý đúng preflight. Đổi sang application/json sẽ
// làm gãy toàn bộ gọi API (lỗi CORS ngay từ bước preflight).
async function callApi(action, params) {
  params = params || {};
  var body = Object.assign({ action: action }, params);
  try {
    var res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      return { success: false, error: 'Lỗi mạng: HTTP ' + res.status };
    }
    return await res.json();
  } catch (err) {
    return { success: false, error: 'Lỗi kết nối: ' + err.message };
  }
}

// Đọc query string của URL hiện tại, ví dụ index.html?event=yep2026&msnv=NV001
function getQueryParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}
