const video = document.getElementById("camera");
const startCameraBtn = document.getElementById("start-camera");
const takePhotoBtn = document.getElementById("take-photo");
const emergencyBtn = document.getElementById("emergency");
const snapshotCanvas = document.getElementById("snapshot");
const painScaleDisplay = document.getElementById("pain-scale");
const logList = document.getElementById("log");

let stream;

// Tambah log
function addLog(message) {
  const li = document.createElement("li");
  li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logList.prepend(li);
}

// Mulai kamera
startCameraBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    addLog("Kamera diaktifkan");
    simulatePainScale();
  } catch (err) {
    alert("Gagal mengakses kamera: " + err.message);
    addLog("Gagal mengakses kamera");
  }
});

// Ambil foto
takePhotoBtn.addEventListener("click", () => {
  if (!stream) {
    alert("Kamera belum aktif!");
    return;
  }
  const ctx = snapshotCanvas.getContext("2d");
  snapshotCanvas.width = video.videoWidth;
  snapshotCanvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
  addLog("Snapshot diambil");
  alert("Snapshot berhasil diambil (disimpan di canvas)");
});

// Tombol darurat
emergencyBtn.addEventListener("click", () => {
  alert("🚨 Bantuan darurat dipanggil!");
  addLog("Sistem darurat diaktifkan oleh pengguna");
});

// Simulasi skala nyeri (acak)
function simulatePainScale() {
  setInterval(() => {
    const scale = Math.floor(Math.random() * 11); // 0-10
    painScaleDisplay.textContent = scale;
    addLog("Skala nyeri terdeteksi: " + scale);

    if (scale >= 7) {
      alert("🚨 Skala nyeri tinggi! Segera panggil bantuan!");
      addLog("PERINGATAN: Skala nyeri tinggi!");
    }
  }, 10000); // update tiap 10 detik
}