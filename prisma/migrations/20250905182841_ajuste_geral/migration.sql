/*
  Warnings:

  - You are about to drop the column `update_at` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `shops` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `signatures` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("address", "cep", "city", "created_at", "document", "email", "id", "is_active", "name", "neighborhood", "number", "phone", "state", "user_id") SELECT "address", "cep", "city", "created_at", "document", "email", "id", "is_active", "name", "neighborhood", "number", "phone", "state", "user_id" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_document_key" ON "clients"("document");
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sale_price" REAL NOT NULL,
    "service_price" REAL NOT NULL,
    "product_price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "orders_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("client_id", "created_at", "id", "product_price", "sale_price", "service_id", "service_price", "user_id") SELECT "client_id", "created_at", "id", "product_price", "sale_price", "service_id", "service_price", "user_id" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE UNIQUE INDEX "orders_service_id_key" ON "orders"("service_id");
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sales_unit" TEXT NOT NULL,
    "purchase_price" TEXT NOT NULL,
    "sale_price" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_products" ("category", "description", "id", "is_active", "name", "observations", "purchase_price", "sale_price", "sales_unit", "user_id") SELECT "category", "description", "id", "is_active", "name", "observations", "purchase_price", "sale_price", "sales_unit", "user_id" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_service" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_services" ("created_at", "description", "id", "is_active", "name_service", "observations", "price", "user_id") SELECT "created_at", "description", "id", "is_active", "name_service", "observations", "price", "user_id" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
CREATE TABLE "new_shops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "sale_price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" INTEGER NOT NULL,
    "orderId_id" INTEGER NOT NULL,
    CONSTRAINT "shops_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shops_orderId_id_fkey" FOREIGN KEY ("orderId_id") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shops" ("amount", "created_at", "id", "orderId_id", "product_id", "sale_price") SELECT "amount", "created_at", "id", "orderId_id", "product_id", "sale_price" FROM "shops";
DROP TABLE "shops";
ALTER TABLE "new_shops" RENAME TO "shops";
CREATE TABLE "new_signatures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "signatures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_signatures" ("created_at", "id", "is_active", "type", "user_id") SELECT "created_at", "id", "is_active", "type", "user_id" FROM "signatures";
DROP TABLE "signatures";
ALTER TABLE "new_signatures" RENAME TO "signatures";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth" DATETIME NOT NULL,
    "signature" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("birth", "created_at", "document", "email", "id", "is_active", "password", "phone", "signature") SELECT "birth", "created_at", "document", "email", "id", "is_active", "password", "phone", "signature" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
