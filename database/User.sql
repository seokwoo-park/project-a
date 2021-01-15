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

****/