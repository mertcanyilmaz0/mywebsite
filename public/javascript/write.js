  const text = "@MertcanYılmaz";
  const speed = 80; // Harf yazma hızı (ms cinsinden)
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("typeText").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  window.onload = typeWriter; // Sayfa yüklenince başlasın