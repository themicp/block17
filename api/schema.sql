create table if not exists `parties` (
    `name` varchar(191) not null,
    `iban` varchar(191) not null,
    `avatar` varchar(191) not null,

    primary key(`iban`)
);

create table if not exists `transactions` (
    `id` int not null auto_increment,
    `timestamp` timestamp default current_timestamp,
    `counterparty` varchar(191) not null,
    `description` text,
    `amount` int not null,

    primary key(`id`),
    foreign key (`counterparty`)
        references parties(`iban`)
);

create table if not exists `banks` (
    `name` varchar(191) not null,
    `btcaddr` varchar(191),
    `endpoint` varchar(191),

    primary key(`name`)
);
