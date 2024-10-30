/**
 * npx sequelize-cli model:generate --name Kecamatan --attributes KemendagriKec:string,nama:string
 * npx sequelize-cli seed:generate --name seed-Kecamatan
 *
 * npx sequelize-cli model:generate --name Kelurahan --attributes KemendagriKel:string,nama:string,KecamatanCode:string
 * npx sequelize-cli seed:generate --name seed-Kelurahan
 *
 * npx sequelize-cli model:generate --name User --attributes nama:string,email:string,noHp:string,alamat:string,KecamatanCode:string,KelurahanCode:string,rt:string,rw:string,role:string,password:string
 * npx sequelize-cli seed:generate --name seed-User
 *
 * npx sequelize-cli model:generate --name DetailKK --attributes UserId:integer,KecamatanCode:string,KelurahanCode:string,namaLengkap:string,jenisKelamin:string,tempatLahir:string,tanggalLahir:date,kartuKeluarga:string,noKKKTP:string,statusPerkawinan:string,agama:string,rt:string,rw:string,alamat:string,pendidikan:string,pekerjaan:string,penghasilanSebulan:string,dokumenKependudukan:string,wusKeluarga:string,pusKeluarga:string,pusKB:string,ibuHamilKeluarga:string,ibuMenyusuiKeluarga:string,ibuBekerjaKeluarga:string,balitaKeluarga:string,bbBayiNormal:string,asiBayiEkslusif:string,bayiPosyandu:string,bayiImunisasi:string,bbTbBayiNormal:string,riwayatPenyakitBayi:string,anakSekolah:string,anakTidakSekolah:string,anakYatimPiatu:string,lansia:string,keluargaDifabel:string,keluargaCacatMental:string,keluargaTidakMendapatkanPengobatan:string,bantuanPemerintah:string,keluargaMerokok:string,saranaAirBersih:string,jambanKeluarga:string,septicTank:string,pembuanganSampah:string,kriteriaRumah:string,statusRumah:string,aktivitasKeagamaan:string,aktivitasSosial:string,memilikiToga:string,jenisUsaha:string,pengeluaranBulanan:string,keterangan:string
 * npx sequelize-cli seed:generate --name seed-DetailKK
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
