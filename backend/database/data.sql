/****배포시 삭제해야합니다. 참고용

//유저테이블

create table `side_project_user`(
    `idx` int(11) not null auto_increment,
    `user_id` varchar(300) not null unique,
    `user_pw` varchar(1024) not null,
    `email` varchar(500) not null,
    `refreshtoken` varchar(1024) not null,
    PRIMARY KEY(`idx`)
);

//프로필 추가

alter table side_project_user add column profile varchar(1024);
alter table side_project_user add column myself varchar(1024);

//글관련 테이블

create table `side_project_board`(
    `idx` int(11) not null auto_increment,
    `user_id` varchar(300) not null,
    `content` varchar(1024) not null,
    `image` varchar(1024),
    `created` datetime not null,
    PRIMARY KEY(`idx`)
)

****/