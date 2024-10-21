# Gunakan image Node.js versi stabil
FROM node:20-alpine

# Set environment variable ke 'staging'
# ENV NODE_ENV=staging

# Direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Salin seluruh kode ke container
COPY . .

# Build aplikasi (jika menggunakan bundler atau transpiler)
# RUN npm run build (opsional, tergantung apakah aplikasi membutuhkan build step)

# Expose port 3001 untuk diakses dari luar
EXPOSE 3001

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
