# Judol Detector

Aplikasi web untuk mendeteksi, mengelola, dan menganalisis komentar "judol" (Judi Online) pada video YouTube menggunakan berbagai algoritma string matching dan regular expression.

## **Deskripsi Aplikasi**

- **Mendeteksi** komentar judol pada video YouTube menggunakan 4 algoritma berbeda (Regex, KMP, BM, dan RK)
- **Menambahkan** komentar ke video YouTube (untuk akun sendiri)  
- **Menghapus** komentar dari video YouTube (untuk akun sendiri)
- **Menganalisis** pola komentar judol dengan highlighting

Aplikasi ini dibangun dengan **Next.js** (Frontend) dan **Express.js** (Backend) serta mengintegrasikan YouTube Data API v3 untuk operasi komentar.

## **Algoritma yang Digunakan**

### **1. Regular Expression (Regex)**

**Langkah-langkah implementasi:**
1. **Pattern Definition**: Menggunakan pattern `/\b\w+\d{2,3}\b/gi` untuk mendeteksi kata yang diakhiri 2-3 digit angka
2. **Text Processing**: Melakukan normalisasi Unicode terlebih dahulu untuk mengatasi stylistic font
3. **Pattern Matching**: Menggunakan method `test()` untuk mencocokkan pattern dengan teks komentar
4. **Result**: Mengembalikan `true` jika pattern ditemukan, `false` jika tidak

### **2. Knuth-Morris-Pratt (KMP)**

**Langkah-langkah implementasi:**
1. **Preprocessing Phase**: 
   - Membuat LPS (Longest Proper Prefix Suffix) atau Border Function array dari pattern
   - LPS ini membantu menentukan posisi skip saat terjadi mismatch

2. **Matching Phase**:
   - Menggunakan dua pointer: `i` untuk text, `j` untuk pattern  
   - Saat karakter match, kedua pointer bergerak maju
   - Saat mismatch, gunakan LPS array untuk menentukan posisi `j` berikutnya
   - Tidak pernah mundur pada pointer `i`

3. **Pattern Detection**:
   - Iterasi melalui semua pattern dalam file yang diupload
   - Setiap pattern dicocokkan dengan teks komentar
   - Return `true` jika minimal satu pattern ditemukan

### **3. Boyer-Moore (BM)**

**Langkah-langkah implementasi:**
1. **Preprocessing Phase**:
   - Membuat Bad Character Table yang memetakan setiap karakter ke posisi terakhirnya dalam pattern
   - Tabel ini digunakan untuk menentukan seberapa jauh pattern bisa di-skip

2. **Matching Phase**:
   - Mulai matching dari karakter paling kanan pattern
   - Saat terjadi mismatch, gunakan Bad Character Table yang sudah didapatkan
   - Hitung skip distance: `max(1, j - badCharPosition)`
   - Geser pattern sejauh skip distance dan ulangi

3. **Skip Optimization**:
   - Jika karakter mismatch tidak ada dalam pattern, skip seluruh panjang pattern
   - Jika karakter ada dalam pattern, skip ke posisi yang tepat

### **4. Rabin-Karp (RK)**

**Langkah-langkah implementasi:**
1. **Hash Function Setup**:
   - Menggunakan polynomial rolling hash dengan basis `d = 256`
   - Prime modulus `q = 10**9 + 7` untuk menghindari collision
   - Menghitung hash value untuk pattern dan window pertama text

2. **Preprocessing**:
   - Hitung hash value pattern: `patternHash = (d * patternHash + char) % q`
   - Hitung hash value window pertama text dengan cara yang sama
   - Hitung `h = d^(m-1) % q` untuk rolling hash calculation

3. **Rolling Hash**:
   - Slide window sepanjang text dengan update hash secara incremental
   - Formula rolling hash: `newHash = (d * (oldHash - firstChar * h) + newChar) % q`
   - Handle negative modulo dengan `(hash + q) % q`

4. **Hash Collision Handling**:
   - Saat hash values match, lakukan character-by-character verification
   - Return `true` hanya setelah exact character match confirmation

## **Text Normalization**

**Langkah-langkah normalisasi:**
1. **Fullwidth Characters**: Konversi karakter fullwidth ke ASCII normal
2. **Mathematical Symbols**: Mapping Mathematical Alphanumeric Symbols ke huruf/angka biasa
3. **Special Characters**: Handle Circled, Squared, dan stylistic characters menggunakan lookup table
4. **Unicode Normalization**: Menggunakan NFD (Canonical Decomposition) untuk handle diacriticals
5. **Case Normalization**: Konversi ke lowercase (biar konsisten ketika diproses oleh setiap algoritma)

## **Fitur Aplikasi**

### **Mode Deteksi**
### **Mode Insert Komentar**
### **Mode Delete Komentar**

## **Cara Menjalankan Aplikasi**

### **Requirements**
- Node.js 18+ dan npm
- YouTube Data API v3 Key dari Google Cloud Console
- Google OAuth 2.0 credentials (untuk insert/delete)

### **1. Clone Repository**
```bash
git clone <repository-url>
cd Judol-Detector
```

### **2. Setup Backend**
```bash
cd backend
npm install

touch .env
```

**Isi file .env:**
```env
YOUTUBE_API_KEY=your_youtube_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

**Jalankan backend:**
```bash
npm run dev
```
Backend akan berjalan di `http://localhost:5000`

### **3. Setup Frontend**
```bash
cd frontend
npm install

**Jalankan frontend:**
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`

### **4. Setup Google API Credentials**

**YouTube Data API:**
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Create project baru atau pilih existing project
3. Enable YouTube Data API v3
4. Create credentials : API Key
5. Copy API key ke file .env backend

**OAuth 2.0 (untuk Insert/Delete):**
1. Di Google Cloud Console : Credentials
2. Create OAuth 2.0 Client ID
3. Application type: Web application
4. Authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Copy Client ID dan Client Secret ke file .env backend

### **5. Mendapatkan Access Token**
1. Buka [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Settings : Use your own OAuth credentials
3. Input Client ID & Client Secret
4. Scope: `https://www.googleapis.com/auth/youtube.force-ssl`
5. Authorize APIs : Login dengan akun Google
6. Exchange authorization code for tokens
7. Copy Access token untuk insert/delete komentar

## **Referensi**

1. https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2024-2025/23-Pencocokan-string-(2025).pdf
2. https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2024-2025/24-String-Matching-dengan-Regex-(2025).pdf
3. https://developers.google.com/youtube/v3
4. https://www.unicode.org/charts/PDF/U1D400.pdf
5. https://www.textconverter.net/

## Author: Hasri Fayadh Muqaffa