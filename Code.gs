/**
 * Nhận xác nhận tham dự từ trang thiệp mời và ghi vào Google Sheet.
 * Dán toàn bộ file này vào Apps Script của Sheet, rồi Deploy làm Web app.
 */

// Đổi thành email của bạn nếu muốn nhận thư báo mỗi lượt xác nhận.
// Để trống "" thì chỉ ghi vào Sheet, không gửi mail.
const NOTIFY_EMAIL = "";

const SHEET_NAME = "RSVP";


function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = getSheet();

    sheet.appendRow([
      new Date(),
      data.id || "",
      data.name || "",
      data.relationship || "",
      data.answer === "yes" ? "Sẽ tới" : "Không tới được"
    ]);

    if (NOTIFY_EMAIL) {
      const verdict = data.answer === "yes" ? "sẽ tới" : "không tới được";

      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "[Thiệp mời] " + (data.name || "Khách") + " " + verdict,
        (data.name || "Một khách") + " vừa xác nhận: " + verdict + ".\n\n"
          + "Quan hệ: " + (data.relationship || "-") + "\n"
          + "Thời gian: " + new Date()
      );
    }

    return json({ ok: true });

  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}


function doGet() {
  return json({ ok: true, message: "Endpoint dang hoat dong" });
}


function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Thời gian", "ID", "Tên khách", "Quan hệ", "Trả lời"]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}


function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
