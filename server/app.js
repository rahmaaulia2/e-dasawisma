/**
 * npx sequelize-cli model:generate --name Kecamatan --attributes name:string
 * npx sequelize-cli seed:generate --name seed-Kecamatan
 *
 * npx sequelize-cli model:generate --name Kelurahan --attributes name:string,KecamatanId:integer
 * npx sequelize-cli seed:generate --name seed-Kelurahan
 *
 * npx sequelize-cli model:generate --name User --attributes name:string,email:string,noHp:string,alamat:string,KecamatanId:integer,KelurahanId:integer,role:string,password:string
 * npx sequelize-cli seed:generate --name seed-User
 */
