/*
  Warnings:

  - You are about to drop the `recent_readings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `recent_readings` DROP FOREIGN KEY `recent_readings_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `recent_readings` DROP FOREIGN KEY `recent_readings_user_id_fkey`;

-- DropTable
DROP TABLE `recent_readings`;

-- CreateTable
CREATE TABLE `readings` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `book_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `readings` ADD CONSTRAINT `readings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `readings` ADD CONSTRAINT `readings_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
