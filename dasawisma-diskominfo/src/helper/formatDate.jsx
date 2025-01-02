export function formatDate(date) {
    date = new Date(date);
    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 dan pad dengan 0 di depan jika perlu
    const tanggal = String(date.getDate()).padStart(2, '0'); // Pad dengan 0 di depan jika perlu
    return `${tahun}-${bulan}-${tanggal}`;
  }