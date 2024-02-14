import { Migration } from '@mikro-orm/migrations';
import { v4 } from 'uuid';

export class Migration2023102701 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' +
        '\n' +
        'create table if not exists delivery\n' +
        '(\n' +
        '    id      uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    type    varchar(255)                    not null,\n' +
        '    address varchar(255)                    not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists payment\n' +
        '(\n' +
        '    id          uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    type        varchar(255)                    not null,\n' +
        '    address     varchar(255)                    not null,\n' +
        '    credit_card varchar(255)                    not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists product\n' +
        '(\n' +
        '    id          uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    title       varchar(255)                    not null\n' +
        '        constraint product_title_unique\n' +
        '            unique,\n' +
        '    description varchar(255)                    not null,\n' +
        '    price       integer                         not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists "user"\n' +
        '(\n' +
        '    id       uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    email    varchar(255)                    not null\n' +
        '        constraint user_email_unique\n' +
        '            unique,\n' +
        '    password varchar(255)                    not null,\n' +
        '    role     varchar(255)                    not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists cart\n' +
        '(\n' +
        '    id          uuid    default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    user_id     uuid                               not null\n' +
        '        constraint cart_user_id_foreign\n' +
        '            references "user"\n' +
        '            on update cascade,\n' +
        '    is_deleted  boolean default false              not null,\n' +
        '    total_price integer default 0                  not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists "order"\n' +
        '(\n' +
        '    id          uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    user_id     uuid                            not null\n' +
        '        constraint order_user_id_foreign\n' +
        '            references "user"\n' +
        '            on update cascade,\n' +
        '    cart_id     uuid                            not null\n' +
        '        constraint order_cart_id_unique\n' +
        '            unique\n' +
        '        constraint order_cart_id_foreign\n' +
        '            references cart\n' +
        '            on update cascade,\n' +
        '    payment_id  uuid                            not null\n' +
        '        constraint order_payment_id_foreign\n' +
        '            references payment\n' +
        '            on update cascade,\n' +
        '    delivery_id uuid                            not null\n' +
        '        constraint order_delivery_id_foreign\n' +
        '            references delivery\n' +
        '            on update cascade,\n' +
        '    comments    varchar(255)                    not null,\n' +
        '    status      integer                         not null,\n' +
        '    total       integer                         not null\n' +
        ');\n' +
        '\n' +
        'create table if not exists cart_item\n' +
        '(\n' +
        '    id         uuid default uuid_generate_v4() not null\n' +
        '        primary key,\n' +
        '    product_id uuid                            not null\n' +
        '        constraint cart_item_product_id_foreign\n' +
        '            references product\n' +
        '            on update cascade,\n' +
        '    count      integer                         not null,\n' +
        '    cart_id    uuid                            not null\n' +
        '        constraint cart_item_cart_id_foreign\n' +
        '            references cart\n' +
        '            on update cascade,\n' +
        '    order_id   uuid\n' +
        '        constraint cart_item_order_id_foreign\n' +
        '            references "order"\n' +
        '            on update cascade on delete set null\n' +
        ');\n' +
        '\n'
    );

    const DB_DATA = {
      paymentId: v4(),
      deliveryId: v4(),
      cartId: v4(),
      userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
    };

    this.addSql(
      `insert into "user" ("id", "email", "password", "role")
       values ('${DB_DATA.userId}', 'test1@gmail.com', '$2b$10$G2Yn.9kNLnwjoErqYPru..OR7geRvffBxJ0nWO/VZMlznxdPPs.SW', 'user'),
              ('d72e4a27-6330-4d10-bc05-9841a948455d', 'test2@gmail.com', '$2b$10$G2Yn.9kNLnwjoErqYPru..OR7geRvffBxJ0nWO/VZMlznxdPPs.SW', 'user');`
    );

    this.addSql(
      `insert into "product" ("id", "title", "description", "price")
       values ('51422fcd-0366-4186-ad5b-c23059b6f64f', 'Book 1', 'A very interesting book', 200);`
    );

    this.addSql(
      `insert into "payment" ("id", "type", "address", "credit_card")
       values ('${DB_DATA.paymentId}', 'paypal', 'Poland, Lodz Kilinskiego 16', '1234-1234-1234-1234');`
    );

    this.addSql(
      `insert into "delivery" ("id", "type", "address")
       values ('${DB_DATA.deliveryId}', 'inpost', 'Poland, Lodz Kilinskiego 16');`
    );

    this.addSql(
      `insert into "cart" ("id", "user_id", "is_deleted")
       values ('${DB_DATA.cartId}', '${DB_DATA.userId}', false);`
    );
  }

  async down(): Promise<void> {
    this.addSql(`
        drop table cart_item;

        drop table product;

        drop table "order";

        drop table delivery;

        drop table payment;

        drop table cart;

        drop table "user";
    `);
  }
}
