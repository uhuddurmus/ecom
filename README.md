cd Vk.Data -> dotnet ef migrations add Initial -s ../VkApi/    -- new migration file generator

cd sln -> cd ..   -- apply migrations files to database

cd ..

dotnet ef database update --project  "./Vk.Data" --startup-project "./VkApi"

connection stringi kontrol etmeyi unutmayın existing bi db verip postgresql migration yapabilirsiniz seed data mevcut.

connection string için PgSqlConnection keywordunu kod içinde arayabilirsiniz.

geliştirmeye açık bıraktım jwt auth kurulabilir alt yapısı hazır

![image](https://github.com/uhuddurmus/ecom/assets/74601877/974ac413-8f50-4b91-9d9f-4cd7bde74d5b)


front end için npm i ile gerekli paketleri yükledikten sonra npm run dev ile çalışabilirsiniz 

![image](https://github.com/uhuddurmus/ecom/assets/74601877/a6f182d8-ff0b-463c-be35-cbd290e450e0)


dashboardda en popüler ürünler sıralanmıştır

![image](https://github.com/uhuddurmus/ecom/assets/74601877/179f2922-54ce-4f94-bb01-520fb015ccd0)


filter çalışmaktadır

![image](https://github.com/uhuddurmus/ecom/assets/74601877/445b998d-a458-4b05-85f7-b15a650974de)

new ile istek atıp yeni product oluşturulabilir.

![image](https://github.com/uhuddurmus/ecom/assets/74601877/ab5433d0-e707-40bf-af4a-7918543e919d)


listelenmiş productlardan birine tıkladığımızda açılan modaldan put işlemi gerçekleştirilebilir.

![image](https://github.com/uhuddurmus/ecom/assets/74601877/5f6529e4-aad5-4894-8a24-71c06fb0e8b9)


ayrıyetten delete butonuda ulaşılması zor olması için içeriye yerleştirilmiştir.  Liste edit add ve delete işlermlerinden sonra güncellenilir.
