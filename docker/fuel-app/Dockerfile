FROM php:7.3-alpine

COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install mysqli pdo pdo_mysql