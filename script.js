 const PIN_BENAR = "060708";
        
const pesan = `Selamat ulang tahun Sayangkuuuu
Terima kasih sudah menjadi bagian terindah dalam hidupku. Semoga di usia yang bertambah ini sayang selalu diberikan kesehatan, kebahagiaan, kesuksesan, dan semua impian sayang bisa tercapai. Aku berharap setiap langkah sayang selalu dipenuhi hal-hal baik.
Terima kasih karena selalu ada, selalu mendukung, dan selalu membuat hari-hariku lebih menarik dan berarti. Semoga kita bisa terus tumbuh bersama, saling menjaga, dan menciptakan lebih banyak kenangan indah.
Aku saaaaayang My Bububbb.
Ini adalah hari yang saaangat spesial bagi sayang. Semoga hari ini menjadi awal dari tahun yang penuh kebahagiaan dan keberkahan. Selamat ulang tahun, cintakuuuuu. `;

        // --- PIN LOGIC ---
        const inputs = document.querySelectorAll('.pin-input');
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value && index < 5) inputs[index + 1].focus();
                verifikasiPin();
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) inputs[index - 1].focus();
            });
        });

        function verifikasiPin() {
            const inputPin = Array.from(inputs).map(i => i.value).join('');
            if (inputPin.length === 6) {
                if (inputPin === PIN_BENAR) {
                    gantiHalaman('section-pin', 'section-message');
                    // Munculkan player audio secara smooth bersamaan dengan mulainya ketikan
                    setTimeout(() => {
                        document.getElementById('audio-box').classList.add('show');
                    }, 300);
                    mulaiKetikan();
                } else {
                    document.getElementById('error-msg').style.display = 'block';
                    inputs.forEach(i => i.value = '');
                    inputs[0].focus();
                }
            }
        }

        function gantiHalaman(idLama, idBaru) {
            document.getElementById(idLama).classList.remove('active');
            document.getElementById(idBaru).classList.add('active');
        }

        // --- TYPING EFFECT ---
        function mulaiKetikan() {
            const box = document.getElementById('typing-box');
            let i = 0;
            function ketik() {
                if (i < pesan.length) {
                    let karakter = pesan.charAt(i);
 
                    if (karakter === '\n') {
                        box.innerHTML += '<br>';
                    } else {
                        box.innerHTML += karakter;
                    }
                    i++;
                    setTimeout(ketik, 35); 
                } else {
                    document.getElementById('btn-album').classList.add('show');
                }
            }
            ketik();
        }

        // --- Vn  ---
        const audio = document.getElementById('my-voicenote');
        const playBtn = document.getElementById('btn-play');
        const audioStatus = document.getElementById('audio-status');

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = "⏸" ;
                    audioStatus.innerHTML = "Memutar pesan suara... 🎧";
                }).catch(err => {
                    audioStatus.innerHTML = "Audio belum diatur / tidak ditemukan";
                });
            } else {
                audio.pause();
                playBtn.innerHTML = "▶";
                audioStatus.innerHTML = "Voice note dijeda";
            }
        });

        audio.addEventListener('ended', () => {
            playBtn.innerHTML = "▶";
            audioStatus.innerHTML = "Voice note selesai didengar ✨";
        });

        // --- Buku album logic ---
        document.getElementById('btn-album').onclick = () => {
            gantiHalaman('section-message', 'section-album');
            initFlipbook();
        };

        function initFlipbook() {
            const container = document.getElementById('flipbook');
            if (container.children.length > 0) return; 
            
            const jumlahHalaman = 10;
            
            for (let i = 1; i <= jumlahHalaman; i++) {
                const page = document.createElement('div');
                page.className = 'book-page';
                page.style.zIndex = jumlahHalaman - i;
                
                page.innerHTML = `
                    <div class="page-front">
                        <img src="images/foto${i}.jpg" class="img-placeholder">
                        <p style="margin-top:10px">Kenangan ${i}</p>
                    </div>
                    <div class="page-back">
                        <p>🫶🏻🩷🫰🏻</p>
                    </div>
                `;

                page.addEventListener('click', function() {
                    this.classList.toggle('flipped');
                    if (this.classList.contains('flipped')) {
                        setTimeout(() => { this.style.zIndex = i; }, 300);
                    } else {
                        setTimeout(() => { this.style.zIndex = jumlahHalaman - i; }, 300);
                    }
                });

                container.appendChild(page);
            }
        }