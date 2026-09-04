const cashProducts = [
  ["1.200 PB Cash","Rp9.150"],
  ["2.400 PB Cash","Rp18.300"],
  ["6.000 PB Cash","Rp45.750"],
  ["12.000 PB Cash","Rp91.500"],
  ["24.000 PB Cash","Rp182.500"],
  ["36.000 PB Cash","Rp273.000"],
  ["60.000 PB Cash","Rp454.000"]
];

const characters = [
  ["MAJOR","QC 10–15 hari + saber 3 hari + kar 2 hari + medkit 3–4 hari + wig 3–6 hari + inventory 167/600","Rp23.000"],
  ["LETCOL","QC 50 hari + t77 6 hari + saber 8 hari + kar 15 hari + medkit 42 hari + idol 34 hari + wig 26 hari + Rappel Tarantula permanent + inventory 539/600","Rp45.000"],
  ["COLONEL GOLD","QC 107–110 hari + t77 2 hari + saber 24–33 hari + kar 2 hari + medkit 48 hari + wig 9–12 hari + inventory 524/600","Rp95.000"],
  ["Bintang 1","QC 107–117 hari + t77 2–6 hari + saber 18–33 hari + kar 2 hari + medkit 44–52 hari + wig 6 hari + inventory 522/600","Rp100.000"],
  ["Bintang 2","QC 191–240 hari + t77 7 hari + saber 39 hari + kar 9 hari + medkit 70 hari + idol 40 hari + inventory 845/600 (harus beli slot inventory dulu agar semua item muncul)","Rp585.000"],
  ["Bintang 3","QC 165–175 hari + T77 Wild Arena + C-5 Wild Arena + Fangblade Permanent + 2 karakter permanent + t77 24 hari + saber 35–44 hari + kar 13 hari + medkit 80–84 hari + idol 32 hari + wig 22 hari + inventory 841/750","Rp1.050.000"]
];

const cashGrid = document.getElementById("cashGrid");
cashProducts.forEach(([name, price]) => {
  cashGrid.innerHTML += `<article class="product-card">
    <span class="badge">PB CASH</span>
    <h3>${name}</h3>
    <div class="price">${price}</div>
    <button class="btn buy-btn order-btn" data-product="${name}" data-price="${price}">BELI SEKARANG</button>
  </article>`;
});

const characterGrid = document.getElementById("characterGrid");
characters.forEach(([name, details, price]) => {
  characterGrid.innerHTML += `<article class="character-card">
    <h3 class="rank">${name}</h3>
    <div class="details">${details}</div>
    <div class="price">${price}</div>
    <button class="btn buy-btn order-btn" data-product="Character ${name}" data-price="${price}">BELI CHARACTER</button>
  </article>`;
});

const modal = document.getElementById("orderModal");
const orderStep = document.getElementById("orderStep");
const paymentStep = document.getElementById("paymentStep");
let selected = {product:"", price:""};

document.addEventListener("click", e => {
  if(e.target.classList.contains("order-btn")){
    selected.product = e.target.dataset.product;
    selected.price = e.target.dataset.price;
    document.getElementById("selectedProduct").textContent = selected.product;
    document.getElementById("selectedPrice").textContent = selected.price;
    modal.classList.add("active");
    orderStep.classList.remove("hidden");
    paymentStep.classList.add("hidden");
  }
});

document.getElementById("closeModal").onclick = () => modal.classList.remove("active");
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("active"); });

document.getElementById("continuePayment").onclick = () => {
  const name = document.getElementById("buyerName").value.trim();
  const wa = document.getElementById("buyerWhatsapp").value.trim();
  if(!name || !wa){ alert("Silakan isi nama dan nomor WhatsApp terlebih dahulu."); return; }

  selected.name = name;
  selected.wa = wa;
  selected.payment = document.querySelector('input[name="payment"]:checked').value;

  document.getElementById("paymentProduct").textContent = selected.product;
  document.getElementById("paymentPrice").textContent = selected.price;

  document.getElementById("danaPayment").classList.toggle("hidden", selected.payment !== "DANA");
  document.getElementById("qrisPayment").classList.toggle("hidden", selected.payment !== "QRIS");

  orderStep.classList.add("hidden");
  paymentStep.classList.remove("hidden");
};

document.getElementById("backOrder").onclick = () => {
  paymentStep.classList.add("hidden");
  orderStep.classList.remove("hidden");
};

document.getElementById("copyDana").onclick = async () => {
  try {
    await navigator.clipboard.writeText("082249246366");
    document.getElementById("copyDana").textContent = "Tersalin!";
    setTimeout(()=>document.getElementById("copyDana").textContent="Salin",1500);
  } catch { alert("Nomor DANA: 082249246366"); }
};

function whatsappLink(){
  const admin = "6282249246366";
  const text = `Halo Admin TOPUP-PB,%0A%0ASaya sudah melakukan pembayaran dan ingin verifikasi pesanan.%0A%0ANama: ${encodeURIComponent(selected.name)}%0AWhatsApp Pembeli: ${encodeURIComponent(selected.wa)}%0AProduk: ${encodeURIComponent(selected.product)}%0ATotal: ${encodeURIComponent(selected.price)}%0AMetode Pembayaran: ${encodeURIComponent(selected.payment)}%0A%0ASaya akan mengirimkan bukti pembayaran setelah pesan ini.%0A%0AMohon pesanan Cash PB atau Character saya diproses. Terima kasih.`;
  return `https://wa.me/${admin}?text=${text}`;
}

document.getElementById("verifyWhatsapp").onclick = () => window.open(whatsappLink(), "_blank");
document.getElementById("floatingWa").onclick = e => {
  e.preventDefault();
  window.open("https://wa.me/6282249246366?text=Halo%20Admin%20TOPUP-PB%2C%20saya%20ingin%20bertanya%20tentang%20produk.", "_blank");
};

document.getElementById("menuBtn").onclick = () => document.getElementById("navMenu").classList.toggle("show");
document.querySelectorAll("nav a").forEach(a => a.onclick = () => document.getElementById("navMenu").classList.remove("show"));
